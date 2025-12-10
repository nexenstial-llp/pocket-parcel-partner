/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Input, Button, Tooltip, message } from "antd";
import { CompassOutlined, EnvironmentOutlined } from "@ant-design/icons";

const defaultCenter = { lat: 12.8538995, lng: 77.6635309 };

const extractAddressComponents = (results) => {
  let pincode = "";
  let city = "";
  let state = "";
  let country = "";
  let district = "";
  let sublocality = "";
  let neighborhood = "";

  if (!results || results.length === 0)
    return { pincode, city, state, country, district };

  // Iterate over all results to find the most granular details
  // Google returns results from most precise to least precise
  // We want to fill gaps in the precise result with data from broader results
  results.forEach((result) => {
    const components = result.address_components;
    components.forEach((component) => {
      const types = component.types;
      if (!pincode && types.includes("postal_code")) {
        pincode = component.long_name;
      }
      if (!city && types.includes("locality")) {
        city = component.long_name;
      }
      if (
        !city &&
        !sublocality &&
        (types.includes("sublocality") || types.includes("sublocality_level_1"))
      ) {
        sublocality = component.long_name;
      }
      if (!city && !neighborhood && types.includes("neighborhood")) {
        neighborhood = component.long_name;
      }
      if (!district && types.includes("administrative_area_level_3")) {
        district = component.long_name;
      }
      if (!state && types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
      if (!country && types.includes("country")) {
        country = component.long_name;
      }
    });
  });

  // Smart Fallback for City
  // If locality is missing, use sublocality, then neighborhood, then district
  if (!city) {
    city = sublocality || neighborhood || district;
  }

  console.log({ pincode, city, state, country, district });
  return { pincode, city, state, country, district };
};

export default function GoogleAddressPicker({
  value,
  onChange,
  onLocationSelect,
  showMap = true,
}) {
  const [position, setPosition] = useState(defaultCenter);
  const [inputValue, setInputValue] = useState(value || "");
  const [loading, setLoading] = useState(false);

  const map = useMap("location-map");
  const places = useMapsLibrary("places");
  const geocoding = useMapsLibrary("geocoding");

  const inputRef = useRef(null);
  const geocoderRef = useRef(null);

  // Initialize Geocoder
  useEffect(() => {
    if (!geocoding) return;
    geocoderRef.current = new geocoding.Geocoder();
  }, [geocoding]);

  // Sync internal input state with external value prop
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const updateLocation = useCallback(
    (newLoc, address, details = {}) => {
      setPosition(newLoc);
      setInputValue(address);

      // Propagate changes
      if (onChange) onChange(address);
      if (onLocationSelect) {
        onLocationSelect({
          lat: newLoc.lat,
          lng: newLoc.lng,
          address: address,
          ...details,
        });
      }
    },
    [onChange, onLocationSelect]
  );

  const handleReverseGeocode = useCallback(
    (latLng) => {
      if (!geocoderRef.current) return;

      setLoading(true);
      geocoderRef.current.geocode({ location: latLng }, (results, status) => {
        setLoading(false);
        if (status === "OK" && results && results.length > 0) {
          const address = results[0].formatted_address;
          // Pass ALL results to extraction logic to find missing fields (pincode, city)
          // that might be present in broader scope results (like result[1] or result[2])
          const googleDetails = extractAddressComponents(results);

          updateLocation(latLng, address, googleDetails);
        } else {
          message.error("Could not determine address for this location.");
        }
      });
    },
    [updateLocation]
  );

  // Initialize Autocomplete
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current.input, {
      fields: ["geometry", "formatted_address", "address_components"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("place", place);
      if (!place.geometry || !place.geometry.location) return;

      const newLoc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      const address = place.formatted_address || "";
      // Autocomplete returns a single place result with detailed components
      // Wrap in array to match the signature of extractAddressComponents which usually takes generic geocode results
      const details = extractAddressComponents([place]);

      // If pincode is missing from Autocomplete result, try fetching via lat/long (Reverse Geocoding)
      if (!details.pincode) {
        handleReverseGeocode(newLoc);
      } else {
        updateLocation(newLoc, address, details);
      }
      map?.panTo(newLoc);
    });
  }, [places, map, updateLocation, handleReverseGeocode]);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      message.error("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Center map and fetch address
        map?.panTo(newLoc);
        handleReverseGeocode(newLoc);
      },
      () => {
        setLoading(false);
        message.error("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          placeholder="Search location..."
          prefix={<EnvironmentOutlined className="text-gray-400" />}
        />
        <Tooltip title="Use Current Location">
          <Button
            icon={<CompassOutlined />}
            onClick={handleCurrentLocation}
            loading={loading}
          />
        </Tooltip>
      </div>

      {showMap && (
        <>
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden border border-gray-200">
            <Map
              id="location-map"
              defaultCenter={defaultCenter}
              center={position}
              defaultZoom={15}
              zoom={15}
              disableDefaultUI
              mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
              onClick={(e) => {
                if (e.detail.latLng) {
                  const newLoc = {
                    lat: e.detail.latLng.lat,
                    lng: e.detail.latLng.lng,
                  };
                  handleReverseGeocode(newLoc);
                }
              }}
            >
              <AdvancedMarker
                position={position}
                draggable={true}
                onDragEnd={(e) => {
                  if (e.latLng) {
                    const newLoc = {
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    };
                    handleReverseGeocode(newLoc);
                  }
                }}
              />
            </Map>
          </div>

          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Drag marker to refine location</span>
            <span>
              {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

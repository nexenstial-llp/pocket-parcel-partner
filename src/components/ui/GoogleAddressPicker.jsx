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

async function fetchPincodeFallback(lat, lng) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    const data = await res.json();
    console.log("data", data);

    return {
      pincode: data.postcode || "",
      city: data.locality || "",
      state: data.principalSubdivision || "",
      country: data.countryName || "",
      // district: data.principalSubdivision || "",
    };
  } catch {
    return {};
  }
}

const extractAddressComponents = (components) => {
  let pincode = "";
  let city = "";
  let state = "";
  let country = "";
  let district = "";

  if (!components) return { pincode, city, state, country };
  components.forEach((component) => {
    const types = component.types;
    if (types.includes("postal_code")) {
      pincode = component.long_name;
    }
    if (types.includes("locality")) {
      city = component.long_name;
    }
    if (types.includes("administrative_area_level_3")) {
      district = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      state = component.long_name;
    }
    if (types.includes("country")) {
      country = component.long_name;
    }
  });
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
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          const googleDetails = extractAddressComponents(
            results[0].address_components
          );
          console.log("googleDetails", googleDetails);

          if (googleDetails.pincode == "") {
            // fallback API for missing postal code
            fetchPincodeFallback(latLng.lat, latLng.lng).then((fallback) => {
              const merged = {
                ...googleDetails,
                ...fallback, // fallback fills missing pincode
              };
              updateLocation(latLng, address, merged);
            });
          } else {
            updateLocation(latLng, address, googleDetails);
          }
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

      if (!place.geometry || !place.geometry.location) return;

      const newLoc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      const address = place.formatted_address || "";
      const details = extractAddressComponents(place.address_components);

      updateLocation(newLoc, address, details);
      map?.panTo(newLoc);
    });
  }, [places, map, updateLocation]);

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

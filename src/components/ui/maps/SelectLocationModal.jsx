/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Button, Modal } from "antd";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const defaultCenter = { lat: 12.8538995, lng: 77.6635309 };
const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const SelectLocationModal = ({ form, longitude, latitude }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  return (
    <APIProvider apiKey={API_KEY}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Select Location
      </Button>

      <Modal
        title="Select Location"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          form.setFieldValue(longitude, selectedLocation.lng);
          form.setFieldValue(latitude, selectedLocation.lat);
          setIsModalOpen(false);
        }}
        width={650}
        afterOpenChange={(open) => {
          if (open) {
            setTimeout(() => {
              const google = window.google;
              const map = window.__gm_location_map;

              if (map && google) {
                google.maps.event.trigger(map, "resize");
                map.setCenter(selectedLocation);
              }
            }, 200);
          }
        }}
      >
        <LocationPicker
          selectedLocation={selectedLocation}
          onChange={setSelectedLocation}
        />

        <div className="mt-2 text-sm text-gray-600">
          Current:{" "}
          <b>
            {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </b>
        </div>
      </Modal>
    </APIProvider>
  );
};

export default SelectLocationModal;

/* -------------------------------
   CHILD COMPONENT (vis.gl logic)
-------------------------------- */
function LocationPicker({ selectedLocation, onChange }) {
  const map = useMap("location-map");
  const placesLib = useMapsLibrary("places");

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Initialize Autocomplete when library is loaded
  if (placesLib && !autocompleteRef.current) {
    autocompleteRef.current = new placesLib.Autocomplete(inputRef.current, {
      fields: ["geometry", "formatted_address", "place_id"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      onChange({ lat, lng });
      map?.setCenter({ lat, lng });
    });
  }

  return (
    <>
      {/* Search Input */}
      <input
        ref={inputRef}
        placeholder="Search place..."
        className="w-full border p-2 rounded mb-3"
      />

      {/* Map */}
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          id="location-map"
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          center={selectedLocation}
          zoom={15}
          disableDefaultUI
          onClick={(e) => {
            const lat = e.detail.latLng.lat;
            const lng = e.detail.latLng.lng;

            console.log("Clicked:", lat, lng);

            onChange({ lat, lng });
          }}
          onLoad={(map) => {
            window.__gm_location_map = map;
          }}
        >
          <AdvancedMarker
            position={selectedLocation}
            draggable={true}
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              onChange({ lat, lng });
            }}
            pinOptions={{
              background: "red",
              borderColor: "white",
              glyphColor: "white",
            }}
          />
        </Map>
      </div>
    </>
  );
}

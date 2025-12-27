/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import {
  Map,
  AdvancedMarker,
  useMapsLibrary,
  APIProvider,
} from "@vis.gl/react-google-maps";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { getAddressFromCoordinates } from "@/utils/map.util";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MapViewerContent = ({ lat, lng }) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const geocoding = useMapsLibrary("geocoding");
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (!geocoding) return;
    geocoderRef.current = new geocoding.Geocoder();
  }, [geocoding]);

  useEffect(() => {
    if (!lat || !lng || !geocoderRef.current) return;

    const fetchAddress = async () => {
      setLoading(true);
      const details = await getAddressFromCoordinates(
        lat,
        lng,
        geocoderRef.current
      );
      if (details && details.address) {
        setAddress(details.address);
      } else {
        setAddress("Address not found");
      }
      setLoading(false);
    };

    fetchAddress();
  }, [lat, lng, geocoding]);

  if (!lat || !lng) return null;

  const position = { lat: parseFloat(lat), lng: parseFloat(lng) };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-200">
        <Map
          defaultCenter={position}
          center={position}
          defaultZoom={15}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          disableDefaultUI
          // Add these props
          minZoom={10} // Prevents zooming out too far
          maxZoom={15} // Prevents zooming in too close
        >
          <AdvancedMarker position={position} />
        </Map>
      </div>
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100 flex items-start gap-2">
        <EnvironmentOutlined className="mt-0.5 text-indigo-500" />
        {loading ? (
          <Spin size="small" />
        ) : (
          <span>{address || "Fetching address..."}</span>
        )}
      </div>
    </div>
  );
};

export default function MapViewer({ lat, lng }) {
  if (!lat || !lng) return null;

  return (
    <APIProvider apiKey={API_KEY}>
      <MapViewerContent lat={lat} lng={lng} />
    </APIProvider>
  );
}

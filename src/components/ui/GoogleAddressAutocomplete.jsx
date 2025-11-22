/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "antd";

import debounce from "lodash.debounce";
import {
  getPlaceDetails,
  getPlaceSuggestions,
} from "@/features/maps/googlePlacesService";

export default function GoogleAddressAutocomplete({
  apiKey,
  value,
  onChange,
  onAddressSelect,
  userLocation,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // ---- Debounced fetch ----
  const fetchSuggestions = debounce(async (inputText) => {
    if (!inputText) {
      setSuggestions([]);
      return;
    }

    const results = await getPlaceSuggestions(inputText, apiKey, userLocation);
    setSuggestions(results);
    setShowDropdown(true);
  }, 400);

  // ---- Input change handler ----
  const handleInputChange = (e) => {
    const text = e.target.value;
    onChange(text);
    fetchSuggestions(text);
  };

  // ---- Select suggestion ----
  const handleSelect = async (s) => {
    setShowDropdown(false);

    const details = await getPlaceDetails(s.place_id, apiKey);

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    const result = {
      address: details.formatted_address,
      lat,
      lng,
    };

    onChange(details.formatted_address);
    onAddressSelect(result);
  };

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={handleInputChange}
        placeholder="Type address..."
        onFocus={() => value && suggestions.length > 0 && setShowDropdown(true)}
      />

      {/* Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-20 left-0 right-0 bg-white shadow-lg rounded-md p-1 max-h-60 overflow-auto border">
          {suggestions.map((s) => (
            <div
              key={s.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelect(s)}
            >
              {s.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

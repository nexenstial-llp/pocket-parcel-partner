/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Input } from "antd";

export default function GoogleAddressInput({
  value,
  onChange,
  onSelectAddress,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place?.geometry) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const formattedAddress = place.formatted_address;

      onSelectAddress({
        address: formattedAddress,
        lat,
        lng,
      });

      onChange?.(formattedAddress);
    });
  }, [onChange, onSelectAddress]);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Search address..."
    />
  );
}

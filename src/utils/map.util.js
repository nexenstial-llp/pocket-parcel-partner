/* eslint-disable no-undef */

/**
 * Extract address components from Google Maps Geocoder result
 * @param {Array} components - address_components from Google Maps API
 * @returns {Object} Structured address details
 */
export const extractAddressComponents = (components) => {
  let pincode = "";
  let city = "";
  let state = "";
  let country = "";
  let district = "";

  if (!components) return { pincode, city, state, country, district };

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

  return { pincode, city, state, country, district };
};

/**
 * Fallback to BigDataCloud API for reverse geocoding
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<Object>}
 */
export const fetchReverseGeocodeFallback = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    const data = await res.json();

    return {
      pincode: data.postcode || "",
      city: data.locality || "",
      state: data.principalSubdivision || "",
      country: data.countryName || "",
      district: data.principalSubdivision || "", // Mapping might vary
      address: data.locality
        ? `${data.locality}, ${data.principalSubdivision}`
        : "",
    };
  } catch (error) {
    console.error("Fallback geocoding error:", error);
    return null;
  }
};

/**
 * Get full address details from coordinates.
 * Uses Google Maps Geocoder if available, otherwise falls back to BigDataCloud.
 *
 * @param {number} lat
 * @param {number} lng
 * @param {object} [geocoderInstance] - Optional Google Maps Geocoder instance. If not provided, tries to instantiate from global `google`.
 * @returns {Promise<Object|null>}
 */
export const getAddressFromCoordinates = async (
  lat,
  lng,
  geocoderInstance = null
) => {
  if (!lat || !lng) return null;

  let geocoder = geocoderInstance;

  // Try to find geocoder from global scope if not passed
  if (
    !geocoder &&
    typeof google !== "undefined" &&
    google.maps &&
    google.maps.Geocoder
  ) {
    geocoder = new google.maps.Geocoder();
  }

  if (geocoder) {
    try {
      // Wrap in Promise for callback-based API support if needed
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode(
          { location: { lat: parseFloat(lat), lng: parseFloat(lng) } },
          (results, status) => {
            if (status === "OK" && results) {
              resolve({ results });
            } else {
              // If it supports Promise natively, this callback might not fire or status might be checked differently?
              // Actually, if we pass a callback, it returns undefined usually.
              // If we don't pass a callback, it returns a Promise (in newer versions).
              // To be safe for mixed versions, we check result handling.
              // But usually, one style is preferred.
              // We'll trust the callback first if provided, but since we are wrapping:
              // Let's rely on standard Callback pattern for broad compatibility or try/catch around Promise usage.
              // The cleanest way in modern generic JS for Google Maps is trying Promise first or callback wrapper.
              // Let's use the callback wrapper pattern which is robust for older v3.
              reject(status);
            }
          }
        );
      });

      if (response && response.results && response.results[0]) {
        const result = response.results[0];
        const formatted_address = result.formatted_address;
        const details = extractAddressComponents(result.address_components);

        // If pincode is missing, try fallback
        if (!details.pincode) {
          const fallback = await fetchReverseGeocodeFallback(lat, lng);
          if (fallback && fallback.pincode) {
            return { ...details, ...fallback, address: formatted_address };
          }
        }

        return { ...details, address: formatted_address };
      }
    } catch (error) {
      console.warn(
        "Google Geocoding failed or not available, trying fallback...",
        error
      );
      // Fall through to fallback
    }
  }

  // Fallback if geocoder unavailable or failed
  const fallback = await fetchReverseGeocodeFallback(lat, lng);
  if (fallback) {
    return {
      ...fallback,
      address: fallback.address || `${fallback.city}, ${fallback.state}`,
    };
  }

  return null;
};

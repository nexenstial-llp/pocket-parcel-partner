import axios from "axios";

const GOOGLE_API = "https://maps.googleapis.com/maps/api";

export async function getPlaceSuggestions(query, apiKey, userLocation) {
  if (!query) return [];
  console.log({ query, apiKey, userLocation });
  const params = {
    input: query,
    key: apiKey,
    components: "country:in",
    types: "address",
  };

  if (userLocation) {
    params.locationbias = `circle:50000@${userLocation.lat},${userLocation.lng}`;
  }

  const response = await axios.get(`${GOOGLE_API}/place/autocomplete/json`, {
    params,
  });

  return response.data.predictions || [];
}

export async function getPlaceDetails(placeId, apiKey) {
  const params = {
    place_id: placeId,
    key: apiKey,
    fields: "formatted_address,geometry",
  };

  const response = await axios.get(`${GOOGLE_API}/place/details/json`, {
    params,
  });

  return response.data.result;
}

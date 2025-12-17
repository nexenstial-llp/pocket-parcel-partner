import axiosInstance from "@/utils/axiosInstance.util";

// Get transit warehouse racks
export const getRacks = async ({ page, limit }) => {
  const response = await axiosInstance.get("v1/transit-warehouse/racks", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// Get rack by id
export const getRackById = async (rackId) => {
  const response = await axiosInstance.get(
    `v1/transit-warehouse/racks/${rackId}`
  );
  return response.data;
};

// Create rack
export const createRack = async (rackData) => {
  const response = await axiosInstance.post(
    "v1/transit-warehouse/racks/create",
    rackData
  );
  return response.data;
};

// Update rack
export const updateRack = async ({ id, data }) => {
  const response = await axiosInstance.patch(
    `v1/transit-warehouse/racks/${id}/update`,
    data
  );
  return response.data;
};

// Delete rack
export const deleteRack = async (rackId) => {
  const response = await axiosInstance.delete("v1/transit-warehouse/racks", {
    data: { id: rackId },
  });
  return response.data;
};

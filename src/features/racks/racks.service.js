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

// Create rack
export const createRack = async (rackData) => {
  const response = await axiosInstance.post(
    "v1/transit-warehouse/racks/create",
    rackData
  );
  return response.data;
};

// Update rack
export const updateRack = async (rackData) => {
  const response = await axiosInstance.put(
    "v1/transit-warehouse/racks",
    rackData
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

import axiosInstance from "../utils/axiosInstance";
export const galleryService = {
  galleries(query = "") {
    return axiosInstance.get(`galleries${query}`);
  },
};

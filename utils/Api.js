import axiosInstance from "./AxiosInstance";

// frontend/src/utils/api.js
export const checkServiceability = async (pincode) => {
  try {
    const response = await axiosInstance.get(
      `/shiprocket/serviceability?pincode=${pincode}`);
      

    const data = await response.data;
    
    if (!response.status || response.status !== 200) {
      if (response.status === 401) {
        // Show user-friendly message
        throw new Error('Session expired. Please try again.');
      }
      throw new Error(data.error || 'Failed to check serviceability');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
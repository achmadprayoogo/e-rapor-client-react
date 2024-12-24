import axios from "axios";

export async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data || error.message,
      status: error.status || 500,
    };
  }
}

export async function postData(url, data) {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

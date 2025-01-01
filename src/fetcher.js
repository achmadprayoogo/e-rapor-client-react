import axios from "axios";

function createAxiosJsonInstance() {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getErrorType(error) {
  let errorType;
  switch (error) {
    case error.response:
      errorType = "response";
      break;
    case error.request:
      errorType = "request";
      break;
    default:
      errorType = "error";
      break;
  }
  return errorType;
}

export async function getData(url) {
  try {
    const axiosJson = createAxiosJsonInstance();
    const response = await axiosJson.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data || error.message,
      type: getErrorType(error),
      status: error.status || 500,
    };
  }
}

export async function postData(url, data) {
  try {
    const axiosJson = createAxiosJsonInstance();
    const response = await axiosJson.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data || error.message,
      type: getErrorType(error),
      status: error.status || 500,
    };
  }
}

export async function patchData(url, data) {
  try {
    const axiosJson = createAxiosJsonInstance();
    const response = await axiosJson.patch(url, data);
    return response;
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data || error.message,
      type: getErrorType(error),
      status: error.status || 500,
    };
  }
}

export async function deleteData(url, data) {
  try {
    const axiosJson = createAxiosJsonInstance();
    const response = await axiosJson.delete(url, data);
    return response;
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data || error.message,
      type: getErrorType(error),
      status: error.status || 500,
    };
  }
}

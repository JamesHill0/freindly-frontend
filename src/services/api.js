import Axios from "axios";

let API_URL = "http://https://friendlyapi.azurewebsites.net";

async function getServices() {
  return await Axios.get(`${API_URL}/apis`);
}

async function getApiProducts(api, keyword) {
  return await Axios.get(`${API_URL}/apis/${api}/products`, {
    params: { keyword },
  });
}

async function saveProducts(api, products) {
  return await Axios.post(`${API_URL}/products`, { api, products });
}

export { getServices, getApiProducts, saveProducts };

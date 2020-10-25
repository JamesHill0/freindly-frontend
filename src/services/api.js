import Axios from "axios";

let API_URL = "localhost:5000/api/v1";

async function getServices() {
  await Axios.get(`${API_URL}/apis`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export { getServices };

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/user";

class Service {
  saveUser(user) {
    return axios.post(API_BASE_URL, user);
  }

  getUser() {
    return axios.get(API_BASE_URL);
  }
}

export default new Service();

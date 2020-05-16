import http from "../http-common";

class AdvertisementDataService {
  getAll() {
    return http.get("backend/advertisments");
  }

  get(id) {
    return http.get(`backend/advertisments/${id}`);
  }

  create(data) {
    return http.post("backend/advertisments/add", data);
  }

  update(id, data) {
    return http.put(`backend/advertisments/${id}`, data);
  }

  delete(id) {
    return http.delete(`backend/advertisments/${id}`);
  }

  deleteAll() {
    return http.delete(`backend/advertisments/add`);
  }

  findByTitle(title) {
    return http.get(`backend/advertisment/${title}`);
  }
}

export default new AdvertisementDataService();
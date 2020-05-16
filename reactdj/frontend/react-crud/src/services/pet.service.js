import http from "../http-common";

class PetDataService {
  getAll() {
    return http.get("backend/pets/");
  }

  get(id) {
    return http.get(`backend/pets/${id}`);
  }

  create(data) {
    return http.post("backend/pets/", data);
  }

  update(id, data) {
    return http.put(`backend/pets/${id}`, data);
  }

  delete(id) {
    return http.delete(`backend/pets/${id}`);
  }

  deleteAll() {
    return http.delete(`backend/pets/`);
  }

}

export default new PetDataService();
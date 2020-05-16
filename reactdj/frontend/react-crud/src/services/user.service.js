import http from "../http-common";
class UserDataService {
    create(data){
        return http.post("rest-auth/registration/", data);
    }

  loginuser(data){
        return http.post("rest-auth/login/",data)
  }

}

export default new UserDataService();
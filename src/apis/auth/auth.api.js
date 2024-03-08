import { getTokenLocal } from "../../utils/localStorage.util";
import ApiRoutes from "../../configs/endpoints.config";
import HttpClient from "../index.api";
const baseURL = import.meta.env.VITE_API_URL;

class Auth extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      config.headers["authkey"] = import.meta.env.VITE_AUTH_KEY;
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (response) => {
        return Promise.resolve(response);
      }
    );
  };

  loginConfig = ApiRoutes.Auth.Login;


  login = async (reqBody) => {
    return this.instance({
      method: this.loginConfig.Method,
      url: this.loginConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

 
  
}

export default Auth;
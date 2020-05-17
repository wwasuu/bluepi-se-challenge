import { AxiosResponse } from "axios";
import { HttpClient } from '../libs'

interface IAuthRequest {
  username: string;
  password: string;
}

// login
function create(data: IAuthRequest): Promise<AxiosResponse> {
  return HttpClient.post("http://localhost:8080/api/auth", data);
}

export default {
  create,
};

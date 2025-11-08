import axios from "axios";

const API = "http://localhost:3000/auth";

export interface RegisterPayload {
  email: string;
  password: string;
}

export function registerUser(data: RegisterPayload) {
  return axios.post(`${API}/register`, data).then((res) => res.data);
}

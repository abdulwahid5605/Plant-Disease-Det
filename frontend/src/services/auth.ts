import axios from "axios";

const API = "http://localhost:3000/auth";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function registerUser(data: RegisterPayload) {
  return axios.post(`${API}/register`, data).then((res) => res.data);
}

export function loginUser(data: LoginPayload) {
  return axios.post(`${API}/login`, data).then((res) => res.data);
}

export function verifyOtp(email: string, otp: string) {
  return axios
    .post(`${API}/verify-otp`, { email, otp })
    .then((res) => res.data);
}
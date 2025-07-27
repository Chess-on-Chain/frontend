import axios from "axios";

// ======================================
// 🔸 Tipe response
// ======================================

// interface ApiErrorResponse {
//   status: "bad";
//   detail: string;
// }

export class ApiError extends Error {
  status: string = "bad";
  detail: string;

  constructor(detail: string) {
    super(detail);
    this.detail = detail;
    this.name = "ApiError";
  }
}

interface ApiSuccess<T> {
  status: "ok";
  data: T;
}

export interface User {
  id: string
  username: string;
  first_name: string;
  last_name: string;
  country: string;
  score: number;
}

export interface RoomData {
  match_id: string;
  playerA: User;
  playerB: User | null;
}

// ======================================
// 🔸 Konfigurasi Axios
// ======================================

const STORAGE_KEY = "token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// ⬇️ Ambil token dari localStorage saat init
const storedToken = localStorage.getItem(STORAGE_KEY);
if (storedToken) {
  api.defaults.headers.common["Authorization"] = storedToken;
}

// ======================================
// 🔸 Token Handling
// ======================================

function setToken(token: string): void {
  api.defaults.headers.common["Authorization"] = token;
  localStorage.setItem(STORAGE_KEY, token);
}

export function clearToken(): void {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem(STORAGE_KEY);
}

// ======================================
// 🔸 Error Handling
// ======================================

function handleError(err: unknown): never {
  if (axios.isAxiosError(err)) {
    const res = err.response;
    if (res?.data?.status === "bad" && res?.data?.detail) {
      throw new ApiError(res.data.detail);
    }
  }

  throw new ApiError("Network or unknown error");
}

// ======================================
// 🔹 AUTH / LOGIN
// ======================================

export interface LoginPayload {
  token: string;
}

export async function apiLogin(payload: LoginPayload): Promise<string> {
  try {
    const res = await api.post<{ token: string }>("/users/login", payload);
    const token = res.data.token;
    setToken(token);
    return token;
  } catch (err) {
    handleError(err);
  }
}

// ======================================
// 🔹 USERS
// ======================================

let _me: User | undefined;

export async function apiGetMe(): Promise<User> {
  if (!_me) {
    try {
      const res = await api.get<ApiSuccess<User>>("/users/me");
      _me = res.data.data;
    } catch (err) {
      handleError(err);
    }
  }

  return _me;
}

export async function apiGetUser(id: string): Promise<User> {
  try {
    const res = await api.get<ApiSuccess<User>>(`/users/${id}`);
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
}

export interface UpdateUserPayload {
  username?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
}

export async function apiUpdateUser(
  id: string,
  data: UpdateUserPayload
): Promise<void> {
  try {
    await api.patch(`/users/${id}`, data);
  } catch (err) {
    handleError(err);
  }
}

// ======================================
// 🔹 ROOMS
// ======================================

export async function apiCreateOrJoinRoom(): Promise<RoomData> {
  try {
    const res = await api.post<ApiSuccess<RoomData>>("/rooms");
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
}

export async function apiGetRoom(id: string): Promise<RoomData> {
  try {
    const res = await api.get<ApiSuccess<RoomData>>(`/rooms/${id}`);
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
}

export async function apiCancelRoom(): Promise<void> {
  try {
    await api.delete("/rooms");
  } catch (err) {
    handleError(err);
  }
}

import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { createActor } from "./canister_factory";

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

export class UserNotFound extends Error {}

export interface User {
  id: string;
  username: string | undefined;
  first_name: string;
  last_name: string | undefined;
  country: string | undefined;
  score: number;
}

export interface RoomData {
  match_id: string;
  playerA: User;
  playerB: User | null;
}

// ======================================
// 🔸 Error Handling
// ======================================

// function handleError(err: unknown): never {
//   // if (axios.isAxiosError(err)) {
//   //   const res = err.response;
//   //   if (res?.data?.status === "bad" && res?.data?.detail) {
//   //     throw new ApiError(res.data.detail);
//   //   }
//   // }

//   throw new ApiError("Network or unknown error");
// }

// ======================================
// 🔹 USERS
// ======================================

const agent = HttpAgent.createSync({
  host: import.meta.env.VITE_ICP_API_HOST as string,
});

let anonymousActor = createActor(
  import.meta.env.VITE_COC_CANISTER_ID as string,
  {
    agent,
  }
);

// export async function apiGetMe(): Promise<User> {
//   if (!_me) {
//       await anonymousActor.get_user()

//     try {
//     } catch (err) {
//       handleError(err);
//     }
//   }

//   return _me;
// }

export async function apiGetUser(id: Principal): Promise<User> {
  // try {
  let result = await anonymousActor.get_user(id);
  if ("ok" in result) {
    const [first_name, last_name] = result.ok.fullname.split(" ", 2);

    const user: User = {
      id: result.ok.id,
      username: result.ok.username[0],
      first_name: first_name,
      last_name: last_name ?? "",
      country: result.ok.country[0],
      score: result.ok.score,
    };
    return user;
  } else {
    throw UserNotFound;
  }
  // } catch (err) {
  //   handleError(err);
  // }
}

export interface UpdateUserPayload {
  username?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
}

// export async function apiUpdateUser(
//   id: string,
//   data: UpdateUserPayload
// ): Promise<void> {
//   try {
//     await api.patch(`/users/${id}`, data);
//   } catch (err) {
//     handleError(err);
//   }
// }

// // ======================================
// // 🔹 ROOMS
// // ======================================

// export async function apiCreateOrJoinRoom(): Promise<RoomData> {
//   try {
//     const res = await api.post<ApiSuccess<RoomData>>("/rooms");
//     return res.data.data;
//   } catch (err) {
//     handleError(err);
//   }
// }

// export async function apiGetRoom(id: string): Promise<RoomData> {
//   try {
//     const res = await api.get<ApiSuccess<RoomData>>(`/rooms/${id}`);
//     return res.data.data;
//   } catch (err) {
//     handleError(err);
//   }
// }

// export async function apiCancelRoom(): Promise<void> {
//   try {
//     await api.delete("/rooms");
//   } catch (err) {
//     handleError(err);
//   }
// }

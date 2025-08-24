import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { createActor } from "./canister_factory";
import { Buffer } from "buffer";
import mime from "mime";

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
  photo_id: string | undefined;
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

export async function apiGetFile(file_id: string): Promise<string> {
  const result = await anonymousActor.get_file(file_id);
  if ("ok" in result) {
    const file = result.ok;

    let image = "data:";
    const mimetype = mime.getType(file.filename);

    if (!mimetype) {
      throw Error;
    }

    image += mimetype + ";base64,";
    image += Buffer.from(file.data).toString("base64");

    return image;
  } else {
    throw Error;
  }
}

export async function apiGetUser(id: Principal): Promise<User> {
  // try {
  let result = await anonymousActor.get_user(id);
  if ("ok" in result) {
    // console.log(anonymousActor.get_file)

    // try {
    //   const keren = await anonymousActor.get_file(
    //     Buffer.from(result.ok.photo[0] as any).toString("hex")
    //   );
    //   console.log(keren)
    // } catch (e) {
    //   console.error(e);
    // }

    const [first_name, last_name] = result.ok.fullname.split(" ", 2);

    let photo_id: string | undefined;

    if (result.ok.photo[0]) {
      photo_id = Buffer.from(result.ok.photo[0]).toString("hex");
    }

    const user: User = {
      id: result.ok.id,
      username: result.ok.username[0],
      first_name: first_name,
      last_name: last_name ?? "",
      country: result.ok.country[0],
      score: result.ok.score,
      photo_id,
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

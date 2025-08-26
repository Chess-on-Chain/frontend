import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useUser() {
  const user = useContext(UserContext);

  return user;
}

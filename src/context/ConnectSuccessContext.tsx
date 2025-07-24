import { createContext } from "react";

export default createContext<[boolean, (isConnect: boolean) => void]>([
  false,
  () => {},
]);

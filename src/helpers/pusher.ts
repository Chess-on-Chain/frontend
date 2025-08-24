import Pusher from "pusher-js";

const PUSHER_APP_KEY = import.meta.env.VITE_PUSHER_APP_KEY as string;
const PUSHER_APP_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER as string;

export default new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_APP_CLUSTER,
});

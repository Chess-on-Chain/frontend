import { Principal } from "@dfinity/principal";
import { useEffect, useRef, useState } from "react";
import { apiGetUser, type User } from "../../../helpers/api";
import { getCacheFile } from "../../../helpers/utils";
import { createPusherClient } from "../../../helpers/pusher";
import useUser from "../../../hooks/useUser";
import { IDL } from "@dfinity/candid";
import * as WebsocketTypes from "./../../../types/WebsocketTypes";
import { useCaller } from "../../../hooks/canister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Notification {
  type: "incoming_friend" | "invite_match";
  principal: Principal;
}

export function PopupLayout() {
  const notifications = useRef<Notification[]>([]);
  const [notification, setNotification] = useState<Notification | null>();
  const [requester, setRequester] = useState<User | null>();
  const [avatar, setAvatar] = useState<string | null>();
  const user = useUser();
  const actor = useCaller();
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications.current.length >= 1) {
      setNotification(notifications.current[0]);
    } else {
      setNotification(null);
    }
  }, [notifications.current]);

  useEffect(() => {
    if (notification) {
      apiGetUser(notification.principal).then((user) => {
        setRequester(user);

        if (user.photo_id) {
          getCacheFile(user.photo_id).then((photo) => {
            setAvatar(photo);
          });
        }
      });
    }
  }, [notification]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const pusher = createPusherClient();
    const channel = pusher.subscribe(user.id);

    channel.bind("invite_match", (data: any) => {
      const body = new Uint8Array(Object.values(data));
      const candid = WebsocketTypes.InviteMatchCandid;

      const value = IDL.decode([candid], body);
      const match: WebsocketTypes.InviteMatch = value[0] as any;

      notifications.current = [
        ...notifications.current,
        {
          principal: match.from,
          type: "invite_match",
        },
      ];
    });

    channel.bind("incoming_friendship", (data: any) => {
      const body = new Uint8Array(Object.values(data));
      const candid = WebsocketTypes.SendFriendshipCandid;

      const value = IDL.decode([candid], body);
      const requester: WebsocketTypes.SendFriendship = value[0] as any;

      notifications.current = [
        ...notifications.current,
        {
          principal: requester.from,
          type: "incoming_friend",
        },
      ];
    });

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  const acceptMatch = async (principal: Principal) => {
    const toastId = toast.info("Loading...", {
      isLoading: true,
      autoClose: false,
    });
    const result = await actor?.accept_match(principal);
    toast.done(toastId);

    if (result) {
      navigate("/gameplay");
    } else {
      toast.error("Errorr...");
    }
  };

  const acceptFriend = async (principal: Principal) => {
    const toastId = toast.info("Loading...", {
      isLoading: true,
      autoClose: false,
    });
    const result = await actor?.accept_friendship(principal);
    toast.done(toastId);

    if (result) {
      // navigate("/gameplay");
      toast.success("😊");
      // TODO: redirect ke friends page
    } else {
      toast.error("Errorr...");
    }
  };

  const popNotification = async () => {
    notifications.current = notifications.current.slice(
      0,
      notifications.current.length - 1
    );
  };

  const displayName =
    requester?.username || requester?.first_name || "Anonymous";

  return (
    notification && (
      <div className="fixed bg-black/70 top-0 left-0 w-full h-screen z-50 flex items-center">
        <div className="w-1/3 min-w-[430px] bg-gray-700 rounded-xl mx-auto p-10">
          {!avatar && (
            <div className="size-44 lg:size-52 bg-gray-200 mx-auto rounded-full" />
          )}
          {avatar && (
            <img
              className="size-44 lg:size-52 mx-auto rounded-full"
              src={avatar}
            />
          )}
          <p className="text-center text-xl text-white my-5">
            {notification.type == "incoming_friend" &&
              `${displayName} wants to be your friend`}
            {notification.type == "invite_match" &&
              `${displayName} wants invite you to match`}
          </p>
          <div className="mx-auto w-max">
            <button
              className="bg-green-500 p-2 text-lg text-white rounded mr-3"
              onClick={() => {
                popNotification();
                if (notification.type == "incoming_friend") {
                  acceptMatch(notification.principal);
                } else if (notification.type == "invite_match") {
                  acceptFriend(notification.principal);
                }
              }}
            >
              Accept
            </button>
            <button
              className="bg-red-500 p-2 text-lg text-white rounded"
              onClick={popNotification}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    )
  );
}

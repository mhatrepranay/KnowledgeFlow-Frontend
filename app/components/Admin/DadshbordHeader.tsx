"use client";
import {
  useGetAllNotificationQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationApi";
import React, { FC, useEffect, useState } from "react";
import { BiSolidMessageRoundedCheck } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DadshbordHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dopyj2nax/video/upload/v1711853622/layout/Notification_pj96kr.mp3"
    )
  );
  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      const handleNewNotification = (data: any) => {
        refetch();
        playerNotificationSound();
      };

      socketId.on("newNotification", handleNewNotification);

      return () => {
        socketId.off("newNotification", handleNewNotification);
      };
    }
  }, [isSuccess]);

  const handlenotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline
          style={{ fontSize: "20px" }}
          className="text-2xl cursor-pointer  text-white ☐"
        />
        <span
          style={{ fontSize: "12px" }}
          className="absolute -top-2 -right-2 bg-[#3ccbae] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white"
        >
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[400px]  h-[300px] p-3  bg-[#111043]   shadow-xl absolute top-16 z-[5] rounded overflow-y-auto">
          <h5
            style={{ fontSize: "20px" }}
            className="text-center text-[20px] font-Poppins text-black dark:text-white p-3"
          >
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <>
                <div className="bg-[#686787]  rounded-lg font-Poppins border-b border-b-[#ffffff47]  ">
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="text-white">{item.title}</p>
                    <div
                      className=" text-white cursor-pointer"
                      onClick={() => handlenotificationStatusChange(item._id)}
                    >
                      <BiSolidMessageRoundedCheck size={35} fill="#56ffb0" />
                    </div>
                  </div>
                  <p className="px-2 text-white">{item.message}</p>
                  <p style={{ fontSize: "14px" }} className="p-2 text-white">
                    {format(item.createdAt)}
                  </p>
                </div>
                <br />
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default DadshbordHeader;

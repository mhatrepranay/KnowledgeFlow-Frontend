"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { styles } from "../../../app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/profile.png";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import "./Profile.css";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loaduser, setLoaduser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loaduser ? true : false });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
        window.location.reload();
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoaduser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile Updated successfully");
      window.location.reload();
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="fade-in11">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <div style={{ position: "relative" }}>
            <Image
              src={
                user.avatar || avatar ? user.avatar.url || avatar : avatarIcon
              }
              alt=""
              className="cursor-pointer"
              style={{
                width: "120px",
                height: "120px",
                border: "5px solid #72f1ea",
                borderRadius: "50%",
              }}
              width={120} // Specify the width of the image
              height={120} // Specify the height of the image
            />

            <input
              type="file"
              name=""
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <label htmlFor="avatar">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#374151",
                  borderRadius: "50%",
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <AiOutlineCamera size={20} className="z-1" />
              </div>
            </label>
          </div>
        </div>
        <br />
        <br />
        <div
          style={{
            width: "100%",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                width: "50%",
                margin: "auto",
                display: "block",
                paddingBottom: "1rem",
              }}
            >
              <div style={{ width: "100%" }}>
                <label style={{ display: "block", paddingBottom: "0.5rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  style={{
                    width: "95%",
                    marginBottom: "0.5rem",
                  }}
                  className={`${styles.input} `}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ width: "100%", paddingTop: "0.5rem" }}>
                <label style={{ display: "block", paddingBottom: "0.5rem" }}>
                  Email Address
                </label>
                <input
                  type="text"
                  readOnly
                  style={{
                    width: "95%",
                    marginBottom: "0.5rem",
                  }}
                  className={`${styles.input}  `}
                  required
                  value={user?.email}
                />
              </div>
              <input
                type="submit"
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  height: "40px",
                  border: "1px solid #37a39a",
                  textAlign: "center",
                  color: "#fff",
                  background: "transparent",
                  borderRadius: "3px",
                  marginTop: "0.8rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                required
                value="Update"
              />
            </div>
          </form>
          <br />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;

"use client";
import { userContext, useUserContext } from "../context";
import User from "@/components/user/user";
const UserProfilePage = () => {
  const user = {
    name: "Hug Luca Tigane",
    username: "HLT",
    email: "hugoluca@tlu.ee",
  };
  return (
    <userContext.Provider value={user}>
      <User />
    </userContext.Provider>
  );
};
export default UserProfilePage;

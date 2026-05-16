import React from "react";
import { useSelector } from "react-redux";  
import Avatar from "./img.png"; // Import your local avatar file as a dynamic fallback source variable

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-b from-pink-950/10 to-transparent p-6 rounded-lg border border-zinc-900">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#ff2a74]/40 shrink-0">
          <img
            src={Avatar}
            alt="pfp"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff2a74]">
            Premium Session Node
          </span>
          <h1 className="text-3xl font-black text-white">
            {user?.username || "Guest Listener"}
          </h1>
          <p className="text-xs text-zinc-500">
            {user?.email || "no-email-provided@session.local"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;

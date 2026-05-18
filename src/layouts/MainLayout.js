import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import defaultAvatar from "../assets/img.png";

const MainLayout = ({ children, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col bg-[#09090b] text-[#ff2a74] overflow-hidden select-none">
      <div className="flex flex-1 h-[calc(100vh-90px)] w-full p-2 gap-2 overflow-hidden">
        
        <aside className="hidden md:flex flex-col w-64 h-full bg-[#121214] rounded-lg p-4 space-y-6 shrink-0">
          <div className="text-xl font-black tracking-tighter px-2">
            SPOTIFY
          </div>

          <nav className="flex flex-col space-y-3 font-semibold text-sm text-zinc-400">
            <Link to="/" className="hover:text-white px-2 py-1.5 rounded transition">🏠 Home</Link>
            <Link to="/search" className="hover:text-white px-2 py-1.5 rounded transition">🔍 Search</Link>
            <Link to="/profile" className="hover:text-white px-2 py-1.5 rounded transition">👤 Profile</Link>
          </nav>

          <div className="pt-4 border-t border-zinc-800">
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              className="w-full text-left text-xs text-red-400 hover:text-red-300 px-2 font-bold"
            >
              🚪 Sign Out Current User
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-[#121214] rounded-lg overflow-y-auto relative h-full">
          <header className="h-14 border-b border-zinc-900/60 px-6 flex items-center justify-between sticky top-0 bg-[#121214]/90 backdrop-blur-md z-30">
            <div className="text-xs text-zinc-400 font-medium">User Connected</div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-300 font-bold">
                {user?.username || "Guest Listener"}
              </span>
              <div className="w-7 h-7 bg-zinc-800 border border-[#ff2a74]/30 rounded-full overflow-hidden">
                <img src={defaultAvatar} alt="pfp" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 pb-24 md:pb-12">{children}</div>
        </main>
      </div>

      <footer className="w-full h-[90px] bg-black border-t border-zinc-900 z-50">
        <AudioPlayer />
      </footer>
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-950 border-t border-zinc-900 z-40 flex items-center justify-around text-xs font-bold text-zinc-400">
        <Link to="/" className="flex flex-col items-center gap-1 hover:text-white"><span>🏠</span>Home</Link>
        <Link to="/search" className="flex flex-col items-center gap-1 hover:text-white"><span>🔍</span>Search</Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 hover:text-white"><span>👤</span>Profile</Link>
      </nav>
    </div>
  );
};

export default MainLayout;
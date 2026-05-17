import React, { useState } from "react";
import defaultAvatar from "../assets/img.png";
import { fallbackUser } from "../data/users";

const Profile = ({ user }) => {
  // Local state to toggle the creator panel visibility
  const [isCreator, setIsCreator] = useState(false);
  
  // Track which active view to display inside the panel ("menu", "add", "delete", "view")
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Profile Info Header Panel */}
      <section 
        className="flex flex-col md:flex-row items-center gap-6 p-6 border shadow-lg"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", borderRadius: "var(--radius-lg)" }}
      >
        <div 
          className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-2" 
          style={{ borderColor: "var(--pink)" }}
        >
          <img src={defaultAvatar} alt="Profile Avatar" className="w-full h-full object-cover" />
        </div>
        
        <div className="text-center md:text-left space-y-2 flex-1">
          <span 
            className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
            style={{ background: "var(--pink-dark)" }}
          >
            {fallbackUser.tier}
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white">
            {user?.username || fallbackUser.username}
          </h1>
          <p className="text-xs font-medium" style={{ color: "var(--text-sec)" }}>
            {user?.email || fallbackUser.email}
          </p>
        </div>

        {/* Action Button Matrix */}
        <div className="shrink-0 mt-4 md:mt-0">
          <button 
            onClick={() => {
              setIsCreator(!isCreator);
              setActiveTab("menu"); // Reset view when toggled
            }} 
            className={isCreator ? "btn-outline" : "btn-pink"}
          >
            {isCreator ? "⚙️ Creator Panel Active" : "✨ Be a Creator"}
          </button>
        </div>
      </section>

      {/* Conditional Creator Sub-Dashboard Workspace */}
      {isCreator && (
        <section 
          className="p-6 border animate-slide-up space-y-4"
          style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)", borderRadius: "var(--radius-lg)" }}
        >
          <div className="border-b pb-2 flex justify-between items-center" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-bold tracking-wider uppercase text-gradient-pink">
              {activeTab === "menu" && "Creator Studio Engine Nodes"}
              {activeTab === "add" && "Add New Track"}
              {activeTab === "delete" && "Remove Music Asset"}
              {activeTab === "view" && "Your Music Repository"}
            </h2>
            {activeTab !== "menu" && (
              <button 
                onClick={() => setActiveTab("menu")} 
                className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white transition"
              >
                ← Back
              </button>
            )}
          </div>

          {/* Core Navigation Grid */}
          {activeTab === "menu" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-medium text-sm">
              {/* Action Item 1: Add Music */}
              <button 
                onClick={() => setActiveTab("add")}
                className="p-4 rounded-md text-left transition card-hover flex items-center justify-between border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span>➕ Add Music</span>
                <span style={{ color: "var(--pink)" }}>→</span>
              </button>

              {/* Action Item 2: Delete Music */}
              <button 
                onClick={() => setActiveTab("delete")}
                className="p-4 rounded-md text-left transition card-hover flex items-center justify-between border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span>🗑️ Delete Music</span>
                <span className="text-red-400">→</span>
              </button>

              {/* Action Item 3: Your Tracks Registry */}
              <button 
                onClick={() => setActiveTab("view")}
                className="p-4 rounded-md text-left transition card-hover flex items-center justify-between border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span>🎵 Your Musics</span>
                <span style={{ color: "var(--pink)" }}>→</span>
              </button>
            </div>
          )}

          {/* Inner Workspaces (Ready for form layouts/lists later) */}
          {activeTab === "add" && (
            <div className="p-4 border border-dashed border-zinc-800 text-center text-xs text-zinc-500 rounded animate-fade-in">
              Add Music form node goes here.
            </div>
          )}

          {activeTab === "delete" && (
            <div className="p-4 border border-dashed border-zinc-800 text-center text-xs text-zinc-500 rounded animate-fade-in">
              Delete Music tracklist registry mapping goes here.
            </div>
          )}

          {activeTab === "view" && (
            <div className="p-4 border border-dashed border-zinc-800 text-center text-xs text-zinc-500 rounded animate-fade-in">
              Your Musics audio engine collection view goes here.
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Profile;
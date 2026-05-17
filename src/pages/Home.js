import React, { useContext } from "react";
import { mockSongs } from "../data/songs";
import { PlayerContext } from "../context/PlayerContext";

const Home = () => {
  // Pull track allocation methods directly from our global music player context tree
  const { selectAndPlayTrack } = useContext(PlayerContext);

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative rounded-xl p-6 overflow-hidden bg-gradient-to-r from-pink-950/20 to-zinc-900/40 border border-pink-500/10">
        <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
          Welcome Back
        </h1>
        <p className="text-zinc-400 text-xs max-w-sm">
          Experience Musics with Pink Shopify.
        </p>
      </section>

      {/* Grid interface displaying available local tracks */}
      <section>
        <h2 className="text-lg font-bold mb-4 tracking-tight border-b border-zinc-800 pb-2 text-zinc-100">
          Trending Feeds
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mockSongs.map((track) => (
            <div
              key={track.id}
              onClick={() => selectAndPlayTrack(track, mockSongs)}
              className="bg-[#18181c] p-4 rounded-lg hover:bg-zinc-800/40 transition duration-300 group cursor-pointer border border-transparent hover:border-pink-500/10 relative"
            >
              <div className="relative mb-3 shadow-md aspect-square rounded-md overflow-hidden">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-11 h-11 bg-[#ff2a74] rounded-full flex items-center justify-center text-black font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition duration-300 hover:scale-105 active:scale-95">
                    ▶
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-sm truncate text-zinc-200">{track.title}</h3>
              <p className="text-xs text-zinc-400 truncate mt-1">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
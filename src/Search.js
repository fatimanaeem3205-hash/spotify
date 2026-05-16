import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mockSongs } from "./MockSongs";
import { setTrack, setQueue } from "./PlayerSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="What track or artist do you want to play?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-6 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white focus:outline-none focus:border-[#ff2a74] transition"
        />
      </div>

      {searchQuery ? (
        <section className="space-y-2">
          <h2 className="text-sm text-zinc-400">Search Results</h2>
          <div className="bg-zinc-900/40 rounded-lg p-2">
            {filteredSongs.map((track) => (
              <div
                key={track.id}
                onClick={() => {
                  dispatch(setTrack(track));
                  dispatch(setQueue(filteredSongs));
                }}
                className="flex items-center justify-between p-3 rounded hover:bg-zinc-800/50 cursor-pointer group transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={track.cover}
                    alt="Cover"
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-[#ff2a74]">
                      {track.title}
                    </p>
                    <p className="text-xs text-zinc-400">{track.artist}</p>
                  </div>
                </div>
                <span className="text-xs text-zinc-500">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-lg font-bold mb-4">Browse Genres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["CyberPunk Electro", "Neon Lo-Fi", "Vaporwave Chill"].map(
              (genre, idx) => (
                <div
                  key={idx}
                  className="h-28 bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-bold relative overflow-hidden cursor-pointer hover:border-pink-500/20 transition"
                >
                  <span>{genre}</span>
                  <div className="w-12 h-12 bg-[#ff2a74]/10 absolute -right-2 -bottom-2 rounded-full blur-lg" />
                </div>
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;

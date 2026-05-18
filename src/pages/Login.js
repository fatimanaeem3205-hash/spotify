import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setClientError("");

    if (!email.includes("@")) {
      setClientError("Invalid email formatting address pattern.");
      return;
    }
    if (password.length < 5) {
      setClientError("Security rules require passwords to contain at least 5 characters.");
      return;
    }

    const fakeUserPayload = { email, username: email.split("@")[0] };
    onLoginSuccess(fakeUserPayload);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#09090b] text-white px-4">
      <div className="w-full max-w-md bg-[#121214] border border-zinc-900 p-8 rounded-xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="text-2xl font-black tracking-tighter text-[#ff2a74]">
            SPOTIFY
          </div>
          <p className="text-xs text-zinc-400">Log in</p>
        </div>

        {clientError && (
          <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-400 text-xs rounded text-center font-medium">
            {clientError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm p-3 rounded focus:outline-none focus:border-[#ff2a74] transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm p-3 rounded focus:outline-none focus:border-[#ff2a74] transition"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-[#ff2a74] hover:bg-pink-700 text-white font-bold text-sm rounded-full tracking-wide shadow-md transform active:scale-95 transition mt-2">
            Log In
          </button>
        </form>

        <div className="border-t border-zinc-800/80 pt-4 text-center">
          <p className="text-xs text-zinc-400">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-[#ff2a74] hover:underline cursor-pointer font-semibold">
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
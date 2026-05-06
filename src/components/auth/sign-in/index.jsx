import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import SocialSignIn from "../SocialSignIn";
import Logo from "../../layout/header/logo";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { closeModal, openRegister } = useAuthModalStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      // Simulated auth — swap with real API call
      await new Promise((res) => setTimeout(res, 800));
      login("demo-jwt-token", { id: "1", name: "User", email });
      closeModal();
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignIn />

      <span className="my-6 flex items-center justify-center text-center">
        <span className="flex-grow border-t border-white/20"></span>
        <span className="mx-4 text-sm text-white/60">OR CONTINUE WITH EMAIL</span>
        <span className="flex-grow border-t border-white/20"></span>
      </span>

      <form onSubmit={handleSubmit}>
        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-center">
            {error}
          </p>
        )}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-primary focus:bg-white/10"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-primary focus:bg-white/10"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <button className="mt-4 text-sm text-white/50 hover:text-primary transition-colors block text-center w-full">
        Forgot Password?
      </button>

      <p className="mt-4 text-white/60 text-sm text-center">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => openRegister("")}
          className="text-primary hover:underline font-semibold"
        >
          Create one free
        </button>
      </p>
    </>
  );
};

export default Signin;
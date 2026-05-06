import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import SocialSignUp from "../SocialSignUp";
import Logo from "../../layout/header/logo";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { closeModal, openLogin } = useAuthModalStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      login("demo-jwt-token", { id: "1", name, email });
      closeModal();
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignUp />

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
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-primary focus:bg-white/10"
          />
        </div>
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
            placeholder="Create password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-primary focus:bg-white/10"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-lg text-white font-semibold bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Start Earning Free"}
        </button>
      </form>

      <p className="mt-4 text-white/40 text-xs text-center">
        By signing up, you agree to our{" "}
        <a href="/#" className="text-primary hover:underline">Privacy Policy</a>
      </p>

      <p className="mt-3 text-white/60 text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={() => openLogin()}
          className="text-primary hover:underline font-semibold"
        >
          Sign in
        </button>
      </p>
    </>
  );
};

export default SignUp;
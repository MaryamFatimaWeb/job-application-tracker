"use client";

import AuthForm from "@/components/AuthForm";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    try {
      const res = await API.post("/auth/login", data);

      login(res.data);
      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} />
  );
}
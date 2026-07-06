"use client";

import AuthForm from "@/components/AuthForm";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const handleRegister = async (data) => {
    try {
      await API.post("/auth/register", data);
      toast.success("Registered Successfully");
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <AuthForm
        title="Register"
        buttonText="Register"
        isRegister
        onSubmit={handleRegister}
      />

      <p style={{ textAlign: "center" }}>
        Already have account? <a href="/">Login</a>
      </p>
    </div>
  );
}
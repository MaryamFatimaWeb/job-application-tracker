"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#2563eb",
        color: "#fff",
      }}
    >
      <h2>Job Tracker</h2>

      {user && (
        <div>
          <span style={{ marginRight: "20px" }}>{user.name}</span>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
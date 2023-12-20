"use client";

import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/router";

export default function Content() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm onLoginComplete={() => {}} />
    </main>
  );
}

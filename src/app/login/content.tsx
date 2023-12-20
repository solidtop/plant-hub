"use client";

import LoginForm from "@/components/login/LoginForm";

export default function Content() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm onLoginComplete={() => {}} />
    </main>
  );
}

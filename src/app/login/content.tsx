"use client";

import LoginForm from "@/components/login/LoginForm";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Content() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // As we're already logged in there's no need to login again
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <main>
      <h1>Login</h1>
      <LoginForm
        onLoginComplete={() => {
          router.push("/");
        }}
      />
    </main>
  );
}

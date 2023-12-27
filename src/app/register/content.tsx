"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/navigation";

export default function Content() {
  const router = useRouter();

  return (
    <main>
      <h1>Register</h1>
      <RegisterForm
        onRegisterComplete={() => {
          router.push("/");
        }}
      />
    </main>
  );
}

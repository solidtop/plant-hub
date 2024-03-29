import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackButton from "@/components/button/BackButton";

export const metadata: Metadata = {
  title: "Log in | Plant Hub",
};

export default async function Login() {
  const jwt = cookies().get("token")?.value;

  if (jwt) {
    // As we're already logged in there's no need to login again
    redirect("/");
  }

  return (
    <main className="p-4">
      <BackButton />
      <LoginForm />
    </main>
  );
}

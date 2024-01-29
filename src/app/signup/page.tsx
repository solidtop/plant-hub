import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackButton from "@/components/button/BackButton";

export const metadata: Metadata = {
  title: "Sign up | Plant Hub",
};

export default async function Signup() {
  const jwt = cookies().get("token")?.value;

  if (jwt) {
    redirect("/");
  }

  return (
    <main className="p-4 h-screen">
      <BackButton />
      <RegisterForm />
    </main>
  );
}

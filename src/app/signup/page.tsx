import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { cookies } from "next/headers";
import { getUser } from "@/utils/api";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup | Plant Hub",
};

export default async function Signup() {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);

  if (user) {
    redirect("/");
  }

  return (
    <main>
      <h1>Register</h1>
      <RegisterForm />
    </main>
  );
}

import BackButton from "@/components/button/BackButton";
import MyPlantList from "@/components/plant/MyPlantList";
import { getUser } from "@/lib/users";
import { cookies } from "next/headers";

export default async function MyPlants() {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);

  return (
    <main className="p-4">
      <BackButton />

      <section>
        <h1 className="my-4">{`${
          user?.firstName ? user.firstName : user?.username
        }'s plants`}</h1>

        <MyPlantList />
      </section>
    </main>
  );
}

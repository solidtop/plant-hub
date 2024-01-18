import BackLink from "@/components/link/BackLink";
import MyPlantList from "@/components/plant/MyPlantList";
import { getUser } from "@/utils/api";
import { cookies } from "next/headers";

export default async function MyPlants() {
  const jwt = cookies().get("token")?.value;
  const user = await getUser(jwt);

  return (
    <main className="p-4">
      <BackLink />

      <section>
        <h1>{`${
          user?.firstName ? user.firstName : user?.username
        }'s plants`}</h1>

        <MyPlantList />
      </section>
    </main>
  );
}
import { ReactElement } from "react";
import { Metadata } from "next";

import Stats from "../components/Stats";
import Teams from "../components/Teams";
import { validateToken } from "../auth/authentication";

export const metadata: Metadata = {
  title: "Helsesjekk | Dine team",
  description: "Oversikt over team du er medlem av i helsesjekk-bot",
};

export default async function Page(): Promise<ReactElement> {
  await validateToken("/");
  return (
    <div>
      <Teams />
      <Stats />
    </div>
  );
}

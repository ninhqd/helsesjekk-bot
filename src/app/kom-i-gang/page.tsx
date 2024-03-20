import React, { ReactElement } from "react";
import { Metadata } from "next";
import Image from "next/image";

import { Heading, BodyLong } from "aksel-server";
import { CopyButton, LinkIcon } from "aksel-client";

import LinkButton from "../../components/core/LinkButton";
import HowToGuide from "../../components/guide/HowToGuide";

import teamsInstruks from "./teams-lag-gruppe.png";

export const metadata: Metadata = {
  title: "Helsesjekk | Kom i gang",
  description: "Kom i gang med helsesjekk-bot",
};

function Page(): ReactElement {
  return (
    <div>
      <Heading size="large">
        Kom i gang med helsesjekk-bot for ditt team
      </Heading>
      <HowToGuide />
      <GroupFinder />
    </div>
  );
}

function GroupFinder(): ReactElement {
  return (
    <div className="mt-8 max-w-prose">
      <Heading
        size="medium"
        level="2"
        id="finn-gruppe"
        className="flex items-center gap-3"
      >
        Finn din gruppe
        <div>
          <CopyButton
            copyText="https://helsesjekk-bot.bks-prod.politiet.no/kom-i-gang#finn-gruppe"
            activeText="Lenken er kopiert"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </div>
      </Heading>
      <BodyLong spacing>
        For å gi teamet ditt tilgang til å kunne se info om sitt team, må du
        finne en felles ad-gruppe for teamet. Din bruker kan være knyttet til
        titalls grupper, men teamet ditt har mest sannsynligvis en gruppe som
        alle er medlem i. Denne gruppen heter typisk noe alà team-navnet ditt.
      </BodyLong>
      <BodyLong spacing>
        Den enkleste måten er å gå til{" "}
        <a href="/kom-i-gang/grupper">Mine grupper</a>. Søk på gruppenavnet
        deres, kopier slack kommandoen og lim den inn i helsesjekk kanalen
        deres.
      </BodyLong>
    </div>
  );
}

function GroupCreator(): ReactElement {
  return (
    <div className="mt-8 max-w-prose">
      <Heading
        size="medium"
        level="2"
        id="opprett-gruppe"
        className="flex items-center gap-3"
      >
        Opprett din egen gruppe
        <div>
          <CopyButton
            copyText="https://helsesjekk-bot.bks-prod.politiet.no/kom-i-gang#opprett-gruppe"
            activeText="Lenken er kopiert"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </div>
      </Heading>
      <BodyLong spacing>
        Dersom gruppen deres ikke har en felles AD-gruppe enda kan dere opprette
        et nytt &quot;team&quot; via Teams appen (Takk til Jørgen Norås for
        tipset!).
      </BodyLong>
      <Image
        className="mb-4 rounded-xl"
        src={teamsInstruks}
        alt={`Skjermbilde av teams, som viser at man trykker på plussknappen for å opprette et nytt team`}
      />
    </div>
  );
}

export default Page;

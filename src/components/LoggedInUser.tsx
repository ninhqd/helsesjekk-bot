import React, { ReactElement } from "react";

import { Skeleton, BodyShort, Detail, Link as AkselLink } from "aksel-server";
import { Tooltip } from "aksel-client";

import { getUser, isUserLoggedIn } from "../auth/authentication";

async function LoggedInUser(): Promise<ReactElement> {
  console.debug("loggedInUser");
  const isLoggedIn = await isUserLoggedIn();
  console.debug(isLoggedIn);
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-end p-4">
        <BodyShort className="w-32 text-right">Ikke logget inn</BodyShort>
        <AkselLink href="/api/auth/signin/azure-ad">Logg inn</AkselLink>
      </div>
    );
  }

  const user = await getUser();

  return (
    <div className="flex gap-4 p-4">
      <div className="hidden sm:block text-right">
        <BodyShort>{user.name}</BodyShort>
        <Detail className="whitespace-nowrap">{user.email}</Detail>
      </div>
      <Tooltip content={`Logget in som ${user.name} (${user.email})`}>
        <div className="w-[48px] h-[48px] bg-gray-400 rounded-full flex items-center justify-center text-2xl">
          {user.name[0]}
        </div>
      </Tooltip>
    </div>
  );
}

export function LoggedInUserSkeleton(): ReactElement {
  return (
    <div className="flex gap-4 p-4">
      <div>
        <Skeleton width={120} />
        <Skeleton width={60} />
      </div>
      <Skeleton width={48} height={48} variant="circle" />
    </div>
  );
}

export default LoggedInUser;

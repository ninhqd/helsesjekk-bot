export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/global-helse", "/admin", "/kom-i-gang/grupper"],
};

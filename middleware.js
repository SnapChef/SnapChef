export { default } from "next-auth/middleware";

//take back to profile page if logged in
export const config = {
  matcher: ["/create"],
};

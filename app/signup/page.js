import SignUpBox from "./components/signUpBox";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home"); //temporarily redirect to profile; thinking to homepage with recipes instead
  return (
    <div className="my-40">
      <SignUpBox />
    </div>
  );
}

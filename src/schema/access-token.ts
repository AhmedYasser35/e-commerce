import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const authToken =
    (await cookies()).get("next-auth.session-token")?.value ||
    (await cookies()).get("__Secure-next-auth.session-token")?.value;

  if (!authToken) return null;

  const decoded = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });


  return typeof decoded?.accessToken === "string" ? decoded.accessToken : null;
}
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken(){
        const authToken = (await cookies()).get(
          //don't forget to change it to __Secure-next-auth.session-token
          "next-auth.session-token",
        )?.value;
        const token = await decode({
          token: authToken,
          secret: process.env.NEXTAUTH_SECRET!,
        });
        return token?.token
}
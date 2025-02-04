// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Ensures account selection
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     scope: "r_liteprofile r_emailaddress",
      //   },
      // },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            "https://api.innosert.az/api/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          console.log(res ,"response login");

          const user = await res.json();
              console.log("Parsed user:", user);

          if (!res.ok || !user?.data?.token) {
            throw new Error(user.message || "Login failed");
          }

          if (typeof setIsSocialLogin === "function") {
            setIsSocialLogin(data.is_social);
          }

        

          // Return the user object with necessary fields
          return {
            id: user.data.user.id,
            name: user.data.user.name,
            email: user.data.user.email,
            token: user.data.token,
          };
        } catch (error) {
          // console.log(res ,"response login");
          throw new Error(error.message || "An error occurred during login");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id; // Adjust based on your user data structure
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id; // Adjust based on your user data structure
      return session;
    },
  },

  // You can add other NextAuth configurations here
});

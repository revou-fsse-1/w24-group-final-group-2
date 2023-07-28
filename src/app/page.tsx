"use client";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const validateUserLogin = () => {
    return session && session.user ? (
      <div className="flex flex-col gap-2 p-5 border-2">
        <p>{session.user.email}</p>
        <p>{session.user.image}</p>
        <p>{session.user.name}</p>

        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    ) : (
      ""
    );
  };

  return (
    <main>
      {validateUserLogin()}
      <h1>Hello World</h1>
    </main>
  );
}

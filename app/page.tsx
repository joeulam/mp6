'use client'
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const login = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_BASEURL}user`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${redirectUri}`;
    router.push(githubAuthUrl)
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div>
      <h1>Login Please :D</h1>
      <Button variant="contained" onClick={login}>Login with github</Button>
      </div>
    </div>
  );
}

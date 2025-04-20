"use client";
import { Box, Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const login = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_BASEURL}user`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${redirectUri}`;
    router.push(githubAuthUrl);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
        elevation={4}
        className="rounded-2xl"
        sx={{
          width: 360,
          textAlign: "center",
          p: 3,
          borderRadius: "16px",
        }}
      >
        <h1>Login Please :D</h1>
        <Button variant="contained" sx={{marginTop:3}} onClick={login}>
          Login with github
        </Button>
      </Card>
    </Box>
  );
}

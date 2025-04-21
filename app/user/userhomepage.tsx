"use client"
import { Github } from "@/dataTypes/Github";
import { Alert, Avatar, Box, Card } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserHomePage() {
  const [userData, setUserData] = useState<Github | null>();
  const [errorTag, setErrorTag] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  useEffect(() => {
    if (!code) return;
    async function getUserData() {
      try {
        const res = await fetch(`/api/auth?code=${code}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data.data);
        } else {
          const errorResponse = await res.json();
          throw new Error(errorResponse.error);
        }
      } catch (error) {
        console.log("SOMETHING WENT WRONG", error);
        setErrorTag((error as Error).message);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }

    getUserData();
  }, []);

  return (

    <div>
      {errorTag && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {`${errorTag} Pushing you back to login page :)`}
        </Alert>
      )}
      {userData ? (
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
              display: "flex",
            }}
          >
            <Avatar
              src={userData.avatar_url}
              alt={userData.login}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                mb: 2,
              }}
            />
            <Box justifyContent="center" alignItems="center" height={"50%"} margin={"auto"}>
              <h1>Welcome, {userData.login}!</h1>
              <p>You have {userData.public_repos} public repos</p>
            </Box>
          </Card>
        </Box>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>

  );
}

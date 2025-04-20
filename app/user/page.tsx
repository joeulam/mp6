'use client'
import { Github } from "@/dataTypes/Github";
import { Alert, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserHomePage() {
  const [userData, setUserData] = useState<Github | null>();
  const [errorTag, setErrorTag] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter()
  useEffect(() => {
    if (!code) return; 
    async function getUserData() {
      try{
        const res = await fetch(`/api/auth?code=${code}`);
        if(res.ok){
          const data = await res.json();
          setUserData(data.data); 
        } 
        else{
          const errorResponse = await res.json()
          throw new Error(errorResponse.error)
        }
      }catch(error){
        console.log("SOMETHING WENT WRONG", error)
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
        <Box sx={{ alignItems: 'center' }}>
          <h1>Welcome, {userData.login}!</h1>
          <p>You have {userData.public_repos} public repos</p>
        </Box>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userToken = searchParams.get("code");
  try{
    const accessTokenRes = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${userToken}`,{
      method: 'POST',
      headers:{
        "Accept": "application/json"
      }
    })
    const accessToken = await accessTokenRes.json()
    console.log(accessToken)
    const userDataRes = await fetch(`https://api.github.com/user`, {
      headers: { Authorization: `Bearer ${accessToken.access_token}` },
    });
    console.log(userDataRes.status)
    if(userDataRes.ok){
      const userData = await userDataRes.json()
      return new Response(
        JSON.stringify({ data: userData}),
        {
          status: 200,
        }
      );
    }
    else if (userDataRes.status == 401 || 403){
      return new Response(
        JSON.stringify({error: "Expired token"}),
        {
          status: 403,
        }
      );
    }
    
  } catch (error){
    console.log(error)
    return new Response(
      JSON.stringify({error: "Internal error :("}),
      {
        status: 500,
      }
    );
  }
  
}

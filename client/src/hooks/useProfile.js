import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

// a custom hook that fetches profile from the API
export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getProfileFromApi() {
      try{
        const data = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const pro = await data.json();
        setProfile(pro);
    }catch{
        const placeHolderProfile={
            id     : 1,
            email  :"serverProblem@gmail.com",
            auth0Id :"auth0|123456",
            name  : "Can't fetch profile",
            order  : []
        };
        setProfile(placeHolderProfile);
      }
    }

    if (accessToken) {
      getProfileFromApi();
    }
  }, [accessToken]);

  return [profile, setProfile];
}

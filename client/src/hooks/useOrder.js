import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

// a custom hook that fetches orders from the API
export default function useOrder() {
  const [order, setOrder] = useState(null);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getOrderFromApi() {
      try{
        const data = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const orders = await data.json();
        setOrder(orders);
      }catch(e){
        const mockOrder={
          id: 1,
          createdAt: "Server is down...",
          comment:"",
          total: 12.34,
          userId:1
        };
        setOrder([mockOrder]);
      }
    }

    if (accessToken) {
      getOrderFromApi();
    }
  }, [accessToken]);

  return [order];
}

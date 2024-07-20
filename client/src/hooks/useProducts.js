import { useState, useEffect } from "react";

// a custom hook that fetches products from the API
export default function useProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getProductsFromApi() {
      try{
        const data = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const pro = await data.json();
        setProducts(pro);
      }catch(e){
        const mockProduct = {
          id:1,
          name   : "server problem",
          category   :"Add ons",
          price :   5.8,
          detail:   "We are having problems with the server...Sorry for inconvenience."
        };
        setProducts(mockProduct);
      }
    }
    getProductsFromApi();
  }, []);

  return [products];
}

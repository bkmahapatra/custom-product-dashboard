import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FetechedProduct } from "../types/products";

export default function useFetchProducts() {
  const [products, setProducts] = useState<FetechedProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    const url = `http://stageapi.monkcommerce.app/task/products/search?search=Hat&page=1&limit=1`;

    try {
      const response = await axios.get(url, {
        headers: {
          "x-api-key": "72njgfa948d9aS7gs5",
        },
      });

      const data = response.data;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products ,};
}

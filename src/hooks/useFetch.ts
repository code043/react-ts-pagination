import { useState, useEffect } from "react";
import paginate from "../utils";

interface Follower {
  id: number;
}

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Follower[][]>([]);

  const getProducts = async (url: string) => {
    const response = await fetch(url);
    const data: Follower[] = await response.json();
    setData(paginate(data));
    setLoading(false);
  };

  useEffect(() => {
    getProducts(url);
  }, []);

  return { loading, data };
};

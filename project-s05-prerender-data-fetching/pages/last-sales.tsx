import { useEffect, useState } from "react";

interface Data {
  [key: string]: Sale;
}

interface Sale {
  id: string;
  username: string;
  volume: number;
}
const FIREBASE_BACKEND = process.env.NEXT_PUBLIC_FIREBASE_BACKEND;
const LastSalesPage = () => {
  const [sales, setSales] = useState<Sale[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${FIREBASE_BACKEND}sales.json`)
      .then((res) => res.json())
      .then((data: Data) => {
        const transformedData = Object.entries(data).map(([key, value]) => ({
          id: key,
          username: value.username,
          volume: value.volume,
        }));

        setSales(transformedData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if(!sales) {
    return <p>No data yet...</p>
  }

  console.log({ FIREBASE_BACKEND });
  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.username} - {sale.volume}
          </li>
        );
      })}
    </ul>
  );
};

export default LastSalesPage;

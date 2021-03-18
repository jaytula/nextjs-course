import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Data {
  [key: string]: Sale;
}

interface Sale {
  id: string;
  username: string;
  volume: number;
}
const FIREBASE_BACKEND = process.env.NEXT_PUBLIC_FIREBASE_BACKEND;
const LastSalesPage: React.FC<{sales: Sale[]}> = ({sales: initialSales}) => {
  const [sales, setSales] = useState<Sale[] | undefined>(initialSales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR<Sale[] | undefined>(
    `${FIREBASE_BACKEND}sales.json`
  );

  useEffect(() => {
    if (data) {
      const transformedData = Object.entries(data).map(([key, value]) => ({
        id: key,
        username: value.username,
        volume: value.volume,
      }));

      setSales(transformedData);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`${FIREBASE_BACKEND}sales.json`)
  //     .then((res) => res.json())
  //     .then((data: Data) => {
  //       const transformedData = Object.entries(data).map(([key, value]) => ({
  //         id: key,
  //         username: value.username,
  //         volume: value.volume,
  //       }));

  //       setSales(transformedData);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;

  // if(!sales) {
  //   return <p>No data yet...</p>
  // }

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

export const getStaticProps: GetStaticProps = async (context) => {
  return fetch(`${FIREBASE_BACKEND}sales.json`)
    .then((res) => res.json())
    .then((data: Data) => {
      const transformedData = Object.entries(data).map(([key, value]) => ({
        id: key,
        username: value.username,
        volume: value.volume,
      }));
      return {
        props: {
          sales: transformedData
        },
        // revalidate: 10
      };
    });

};

export default LastSalesPage;

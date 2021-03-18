import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

const ProductDetailPage: React.FC<{
  product: { id: string; title: string; description: string };
}> = ({ product }) => {
  // if(!product) {
  //   return <p>Loading...</p>
  // }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const productId = params.pid;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      product,
    },
  };
};

// Required for dynamic paths
export const getStaticPaths = async () => {
  const data = await getData();

  return {
    paths: data.products.map((product) => ({ params: { pid: product.id } })),
    fallback: false,
    // fallback: "blocking",
  };
};

export default ProductDetailPage;

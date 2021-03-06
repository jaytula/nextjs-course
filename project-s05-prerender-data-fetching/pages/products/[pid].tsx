import path from "path";
import fs from "fs";
import util from 'util';
import { Fragment } from "react";

const readFile = util.promisify(fs.readFile);

const ProductDetailPage: React.FC<{
  product: { id: string; title: string; description: string };
}> = ({ product }) => {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const productId = params.pid;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }
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
    fallback: true,
    // fallback: "blocking",
  };
};

export default ProductDetailPage;

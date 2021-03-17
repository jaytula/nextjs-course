import path from 'path'
import fs from 'fs/promises';
import { Fragment } from "react";

const ProductDetailPage: React.FC<{
  product: { id: string; title: string; description: string };
}> = ({ product }) => {
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const productId = params.pid;
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  const product = data.products.find(product => product.id === productId)
  return {
    props: {
      product,
    },
  };
};

// Required for dynamic paths
export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: 'p1'}},
      { params: { pid: 'p2'}},
      { params: { pid: 'p3'}},
    ],
    fallback: false
  }
}

export default ProductDetailPage;

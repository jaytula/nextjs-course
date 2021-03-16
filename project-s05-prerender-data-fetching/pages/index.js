import data from '../data/dummy-backend.json';

function HomePage(props) {
  const { products } = props
  return (
    <ul>
      {products.map(product => {
        return <li key={product.id}>{product.title}</li>
      })}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: data
  }
}

export default HomePage;

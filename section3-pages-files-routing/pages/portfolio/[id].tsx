import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const pathname = router.pathname

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.id
  return (
    <div>
      <h1>The Portfolio Project Page: {id} </h1>
      <p>Pathname: {pathname}</p>
    </div>
  );
};

export default PortfolioProjectPage;

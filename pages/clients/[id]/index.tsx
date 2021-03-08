import { useRouter } from "next/router";

const ClientsProjectsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>ClientsProjectsPage: {id}</h1>
    </div>
  );
};

export default ClientsProjectsPage;

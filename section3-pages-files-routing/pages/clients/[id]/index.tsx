import { useRouter } from "next/router";

const ClientsProjectsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>ClientsProjectsPage: {id}</h1>
      <button
        onClick={() => {
          router.push({
            pathname: '/clients/[id]/[clientprojectid]',
            query: {
              id: id,
              clientprojectid: 'projecta'
            }
          });
        }}
      >
        Load Project A
      </button>
    </div>
  );
};

export default ClientsProjectsPage;

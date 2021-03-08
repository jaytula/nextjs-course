import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {
  const router = useRouter();
  const { id, clientprojectid } = router.query;

  return (
    <div>
      <h1>SelectedClientProjectPage: {id}:{clientprojectid}</h1>
    </div>
  );
};

export default SelectedClientProjectPage;

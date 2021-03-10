import { useRouter } from "next/router";

const FilteredEventsPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <div>
      <h1>Filtered Events Page</h1>
      <p>Query: {JSON.stringify(query)}</p>
    </div>
  );
};

export default FilteredEventsPage;

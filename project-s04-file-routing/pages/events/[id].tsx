import { useRouter } from "next/router";

const EventDetailPage = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div>
      <h1>Event Detail Page for {id}</h1>
    </div>
  );
};

export default EventDetailPage;

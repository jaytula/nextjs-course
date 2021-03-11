import { useRouter } from "next/router";

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  
  return (
    <div>
      <h1>Event Detail Page for {eventId}</h1>
    </div>
  );
};

export default EventDetailPage;

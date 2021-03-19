import EventList from "../components/events/event-list";
import {getFeaturedEvents, Event} from '../helpers/api-util';
import { GetStaticProps } from "next";

const HomePage: React.FC<{events: Event[]}> = ({events}) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getFeaturedEvents();
  return {
    props: {
      events
    },
    revalidate: 120
  }
};

export default HomePage;

import { Fragment } from 'react';
import { useRouter } from 'next/router';

import {Event, getAllEvents} from '../../helpers/api-util'
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { GetStaticProps } from 'next';


const AllEventsPage: React.FC<{events: Event[]}> = ({events}) => {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  }
}

export default AllEventsPage;

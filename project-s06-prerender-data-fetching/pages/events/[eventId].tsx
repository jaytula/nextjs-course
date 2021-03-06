import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Event, getEventById, getFeaturedEvents } from '../../helpers/api-util';

const EventDetailPage: React.FC<{event: Event}> = ({event}) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {eventId} = context.params
  const event = await getEventById(eventId as string)

  return {
    props: {
      event
    },
    revalidate: 30
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();

  return {
    paths: allEvents.map(event => ({params: {eventId: event.id}})),
    fallback: 'blocking'
  }
}

export default EventDetailPage;

import EventItem from "./event-item";
import { Event } from "../../dummy-data";

const EventList: React.FC<{ items: Event[] }> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <EventItem item={item} />
      ))}
    </ul>
  );
};

export default EventList;

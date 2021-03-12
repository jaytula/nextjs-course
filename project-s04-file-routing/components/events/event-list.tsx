import EventItem from "./event-item";
import { Event } from "../../dummy-data";
import classes from './event-list.module.css';

const EventList: React.FC<{ items: Event[] }> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;

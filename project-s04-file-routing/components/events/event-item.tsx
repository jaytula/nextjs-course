import { Event } from "../../dummy-data";

const EventItem: React.FC<{ item: Event }> = ({ item }) => {
  return <li>{item.title}</li>;
};

export default EventItem;

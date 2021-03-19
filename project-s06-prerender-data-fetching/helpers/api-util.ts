const FIREBASE_BACKEND = process.env.NEXT_PUBLIC_FIREBASE_BACKEND as string;

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export const getAllEvents: () => Promise<Event[]> = async () => {
  return fetch(`${FIREBASE_BACKEND}events.json`)
    .then((res) => res.json())
    .then((data: { [key: string]: Event }) => {
      const transformedData = Object.entries(data).map(([key, value]) => value);
      return transformedData;
    });
};

export const getFeaturedEvents: () => Promise<Event[]> = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}

export const getEventById: (eventId: string) => Promise<Event | undefined> = async (eventId) => {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.id === eventId);
}
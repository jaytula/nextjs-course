export interface EventItem {
  date: string;
  comments: CommentItem[];
}

export type CommentItem = {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  text: string;
  eventId: string;
}
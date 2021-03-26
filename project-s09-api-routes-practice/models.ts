export interface EventItem {
  date: string;
  comments: CommentItem[];
}

export interface CommentItem {
  id?: string;
  email: string;
  name: string;
  text: string;
  eventId: string;
}
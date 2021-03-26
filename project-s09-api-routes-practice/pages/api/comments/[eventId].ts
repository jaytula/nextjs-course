import { NextApiHandler } from "next";
import { CommentItem } from "../../../models";

const DUMMY_COMMENTS: CommentItem[] = [
  {
    id: "c1",
    email: "max@example.com",
    name: "Max",
    text: "I said this",
  },
  { id: "c2", email: "manu@example.com", name: "Manu", text: "You said that" },
];

const handler: NextApiHandler = (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if(!email.includes('@')) {
      res.status(422).json({message: 'Invalid email'})
      return;
    }

    if(!name || typeof name !== 'string' || !text.trim()) {
      res.status(422).json({message: 'name cannot be blank'})
      return
    }

    if(!text || typeof text !== 'string' || !text.trim()) {
      res.status(422).json({message: 'text cannot be blank'})
      return
    }

    const newComment: CommentItem = {
      id: new Date().toISOString(),
      email,
      name,
      text
    }

    res.status(201).json({
      message: "Comment added for eventId " + eventId,
      comment: newComment,
    });
    return;
  }

  if (req.method === "GET") {
    res.status(200).json({
      comments: DUMMY_COMMENTS,
    });
    return;
  }

  return res.status(405).end();
};

export default handler;

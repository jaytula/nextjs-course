import { NextApiHandler } from "next";
import { CommentItem, EventItem } from "../../../models";

import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.eventId as string;

  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    if (!name || typeof name !== "string" || !text.trim()) {
      res.status(422).json({ message: "name cannot be blank" });
      return;
    }

    if (!text || typeof text !== "string" || !text.trim()) {
      res.status(422).json({ message: "text cannot be blank" });
      return;
    }

    const newComment: CommentItem = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({
      message: "Comment added for eventId " + eventId,
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const results = await db
      .collection("comments")
      .find({
        eventId,
      })
      .sort({ _id: -1 })
      .toArray();

    const comments = results.map((result) => ({ ...result, id: result._id }));

    res.status(200).json({
      comments,
    });
  }

  client.close();
};

export default handler;

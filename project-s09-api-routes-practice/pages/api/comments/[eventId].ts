import { NextApiHandler } from "next";
import { CommentItem, EventItem } from "../../../models";

import { InsertOneWriteOpResult, MongoClient, OptionalId } from "mongodb";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.eventId as string;

  let client: MongoClient;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Could not connect to database" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      client.close();
      return;
    }

    if (!name || typeof name !== "string" || !text.trim()) {
      res.status(422).json({ message: "name cannot be blank" });
      client.close();
      return;
    }

    if (!text || typeof text !== "string" || !text.trim()) {
      res.status(422).json({ message: "text cannot be blank" });
      client.close();
      return;
    }

    const newComment: CommentItem = {
      email,
      name,
      text,
      eventId,
    };

    let result: InsertOneWriteOpResult<any>;

    try {
      result = await insertDocument<any>(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({
        message: "Comment added for eventId " + eventId,
        comment: newComment,
      });
    } catch (err) {
      res.status(500).json({ message: "Error inserting comment" });
    }
  }

  if (req.method === "GET") {
    let documents: OptionalId<CommentItem>[];

    try {
      documents = await getAllDocuments<CommentItem>(client, "comments", {
        eventId,
      });
      res.status(200).json({
        comments: documents,
      });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving comments" });
    }
  }

  client.close();
};

export default handler;

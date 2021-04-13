import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

type ResponseBody = {
  email: string;
  name: string;
  message: string;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method not allowed",
    });
    return;
  }

  const { email, name, message } = req.body as ResponseBody;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  ) {
    res.status(422).json({
      message: "Invalid input",
    });
    return;
  }

  const newMessage: {
    email: string;
    name: string;
    message: string;
    id?: any;
  } = {
    email,
    name,
    message,
  };

  let client: MongoClient;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.${process.env.mongodb_host}/${process.env.mongodb_database}`;

  try {
    client = await MongoClient.connect(connectionString as string, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
    return;
  }

  const db = client.db();

  try {
    const result = await db.collection("messages").insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ message: error.message || "Storing message failed!" });
    return;
  }

  client.close();

  res
    .status(201)
    .json({ message: "Successfully stored message!", data: newMessage });
};

export default handler;

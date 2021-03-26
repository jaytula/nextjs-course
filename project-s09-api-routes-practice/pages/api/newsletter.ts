import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const email = req.body.email as string;

  if (!email || !email.includes("@")) {
    res.status(422).json({ mesage: "Invalid email.address." });
    return;
  }

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  await db.collection("emails").insertOne({
    email,
  });

  client.close();

  res.status(201).json({
    message: "Signed up!",
    email,
  });
};

export default handler;

import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}

async function insertDocument(
  client: MongoClient,
  document: { email: string }
) {
  const db = client.db();
  await db.collection("newsletter").insertOne(document);
}

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

  let client: MongoClient;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }

  try {
    await insertDocument(client, {
      email,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Inserting data failed' });
    return;
  } 

  res.status(201).json({
    message: "Signed up!",
    email,
  });
};

export default handler;

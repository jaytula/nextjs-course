import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const email = req.body.email as string;

  if (!email || !email.includes("@")) {
    res.status(422).json({ mesage: "Invalid email.address." });
    return;
  }
  console.log( email );

  res.status(201).json({
    message: 'Signed up!',
    email,
  });
};

export default handler;

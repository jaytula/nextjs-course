import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method not allowed",
    });
    return;
  }

  const { email, name, message } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim === ""
  ) {
    res.status(422).json({
      message: "Invalid input",
    });
    return;
  }

  const newMessage = {
    email,
    name,
    message,
  };

  console.log(newMessage);

  res
    .status(201)
    .json({ message: "Successfully stored message!", data: newMessage });
};

export default handler;

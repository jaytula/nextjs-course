import { NextApiHandler } from "next";
import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST') {
    const {email, text} = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    }

    // store that in a database or in a file
    const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json')
    const fileContents = await readFile(FEEDBACK_FILE);
    const feedbacks = fileContents.toString() ? JSON.parse(fileContents.toString()) : [];
    feedbacks.push(newFeedback);
    await writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2))
    res.status(201).json({message: 'Success!', feedback: newFeedback})
  } else {
    res.status(200).json({ message: "This works!" });
  }
};

export default handler;

import { NextApiHandler } from "next";
import fs from 'fs';
import path from 'path';
import util from 'util';
import { Feedback } from "../../../models/Feedback";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export const extractFeedback = async (filePath) => {
  const fileContents = await readFile(filePath);
  return fileContents.toString() ? (JSON.parse(fileContents.toString()) as Feedback[]) : [] as Feedback[];
}

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST') {
    const {email, text} = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    }

    // store that in a database or in a file
    const feedbacks = await extractFeedback(buildFeedbackPath())
    feedbacks.push(newFeedback);
    await writeFile(buildFeedbackPath(), JSON.stringify(feedbacks, null, 2))
    res.status(201).json({message: 'Success!', feedback: newFeedback})
  } else {
    const feedbacks = await extractFeedback(buildFeedbackPath())
    
    res.status(200).json({ message: "This works!", feedbacks });
  }
};

export default handler;

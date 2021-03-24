import {NextApiHandler} from 'next';
import { buildFeedbackPath, extractFeedback } from '.';

const handler: NextApiHandler = async (req, res) => {
  const {feedbackId} = req.query;

  const feedbacks = await extractFeedback(buildFeedbackPath())

  const feedbackItem = feedbacks.find(feedback => feedback.id === feedbackId)

  res.json({
    message: `hello ${feedbackId}`,
    feedback: feedbackItem
  })
}

export default handler
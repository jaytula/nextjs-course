import { GetStaticProps } from "next";
import { Feedback } from "../models/Feedback";
import { extractFeedback, buildFeedbackPath } from "./api/feedback";

const FeedbackPage: React.FC<{ feedbacks: Feedback[] }> = ({ feedbacks }) => {
  return (
    <div>
      <h1>Feedbacks</h1>
      <ul>
        {feedbacks.map((feedback) => {
          return <li key={feedback.id}>{feedback.text}</li>;
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  feedbacks: Feedback[];
}> = async () => {
  const feedbacks = await extractFeedback(buildFeedbackPath())

  return {
    props: {
      feedbacks,
    },
  };
};

export default FeedbackPage;

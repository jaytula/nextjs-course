import { GetStaticPaths, GetStaticProps } from "next";
import { Feedback } from "../../models/Feedback";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackDetailPage: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  return (
    <div>
      <h1>Feedback Detail Page</h1>
      <pre>{JSON.stringify(feedback, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { feedbackId } = context.params;
  const feedbacks = await extractFeedback(buildFeedbackPath());

  const feedback = feedbacks.find((feedback) => feedback.id === feedbackId);
  return {
    props: {
      feedback,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const feedbacks = await extractFeedback(buildFeedbackPath());

  return {
    paths: feedbacks.map((feedback) => ({
      params: { feedbackId: feedback.id },
    })),
    fallback: "blocking"
  };
};

export default FeedbackDetailPage;

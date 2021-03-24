import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { Feedback } from "../../models/Feedback";
import { extractFeedback, buildFeedbackPath } from "../api/feedback";

const FeedbackPage: React.FC<{ feedbacks: Feedback[] }> = ({ feedbacks }) => {
  const router = useRouter();

  return (
    <div>
      <h1>Feedbacks</h1>
      <ul>
        {feedbacks.map((feedback) => {
          return (
            <li key={feedback.id}>
              {feedback.text}{" "}
              <button onClick={() => router.push(`/feedback/${feedback.id}`)}>
                Show Details
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  feedbacks: Feedback[];
}> = async () => {
  const feedbacks = await extractFeedback(buildFeedbackPath());

  return {
    props: {
      feedbacks,
    },
  };
};

export default FeedbackPage;

import { useRef, useState } from "react";
import {Feedback} from "../models/Feedback";

function HomePage() {
  const emailInputRef = useRef<HTMLInputElement>();
  const feedbackInputRef = useRef<HTMLTextAreaElement>();
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbackItems(data.feedbacks);
      });
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Email Address</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
       
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedbacks</button>
      <ul>
        {feedbackItems.map((feedback) => (
          <li key={feedback.id}>
            {feedback.email}: {feedback.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

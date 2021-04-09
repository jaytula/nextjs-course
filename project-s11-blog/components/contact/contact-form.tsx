import { useEffect, useState } from "react";
import Notification, { StatusType } from "../ui/notification";
import classes from "./contact-form.module.css";

const sendContactData = async (contactDetails: {
  name: string;
  email: string;
  message: string;
}) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contactDetails.name,
      email: contactDetails.email,
      message: contactDetails.message,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<StatusType>(null);
  const [requestError, setRequestError] = useState<string>("");

  useEffect(() => {
    if (requestStatus === "error" || requestStatus === "success") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setRequestStatus("pending");
    try {
      await sendContactData({ name, email, message });
      setRequestStatus("success");
      setMessage("");
      setEmail("");
      setName("");
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  };

  let notification:
    | { status: StatusType; title: string; message: string }
    | undefined;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={5}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification ? (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      ) : null}
    </section>
  );
};

export default ContactForm;

import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentItem } from "../../models";
import NotificationContext, {
  NotificationIface,
} from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);

  const { showNotification } = useContext<NotificationIface>(
    NotificationContext
  );

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        })
        .then((data) => {
          setComments(data.comments);
        })
        .finally(() => {
          setIsFetchingComments(false);
        })
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler: (commentData: CommentItem) => void = (
    commentData
  ) => {
    // send data to API
    showNotification({
      title: "Pending",
      message: "Adding your comment...",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success",
          message: "Comment added",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: err.message || "Comment could not be added.",
          status: "error",
        });
      });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments ? <p>Loading...</p> : null}
    </section>
  );
}

export default Comments;

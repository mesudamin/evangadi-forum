import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostAnswer.css";

function PostAnswer({ questionid, onAnswerPosted }) {
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!answer.trim()) {
      setErrorMessage("Please enter your answer before posting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        "http://localhost:3000/api/answers",
        {
          questionid,
          answer: answer.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswer("");
      setSuccessMessage("Answer posted successfully! Redirecting to Home page...");
      if (onAnswerPosted) {
        onAnswerPosted();
      }
      setTimeout(() => {
        navigate("/Home");
      }, 1500);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to post answer. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="post_answer_card">
      <div className="post_answer_header">
        <h3 className="post_answer_title">Answer The Top Question</h3>
        <Link to="/Home" className="go_question_link">
          Go to Question page
        </Link>
      </div>

      {errorMessage && (
        <div className="answer_error_box" role="alert">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="answer_success_box" role="status">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="post_answer_form">
        <textarea
          className="answer_textarea"
          placeholder="Your Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitting}
        />

        <button
          type="submit"
          className="post_answer_btn"
          disabled={submitting || !answer.trim()}
        >
          {submitting ? (
            <span className="btn_loading_content">
              <span className="btn_spinner"></span> Posting...
            </span>
          ) : (
            "Post Your Answer"
          )}
        </button>
      </form>
    </section>
  );
}

export default PostAnswer;

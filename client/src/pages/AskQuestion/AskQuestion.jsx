import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./AskQuestion.css";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!title.trim() || !description.trim()) {
      setErrorMessage("Please provide both a title and description for your question.");
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
        "http://localhost:3000/api/questions",
        {
          title: title.trim(),
          description: description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Your question was posted successfully! Redirecting...");
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to post question. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ask_question_page">
      <Header />

      <main className="ask_question_container">
        {/* Steps to follow before asking */}
        <section className="ask_steps_card">
          <h2 className="ask_steps_title">Steps to follow before asking your question:</h2>
          <ul className="ask_steps_list">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it here.</li>
          </ul>
        </section>

        {/* Public Question Form */}
        <section className="ask_form_card">
          <div className="ask_form_header">
            <h3 className="ask_form_title">Ask a public question</h3>
            <Link to="/Home" className="back_home_link">
              Go to question page
            </Link>
          </div>

          {errorMessage && (
            <div className="ask_error_box" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="ask_success_box" role="status">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="ask_form">
            <input
              type="text"
              className="ask_input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
              maxLength={200}
            />

            <textarea
              className="ask_textarea"
              placeholder="Question Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
              rows={6}
            />

            <button
              type="submit"
              className="post_btn"
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Post Your Question"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AskQuestion;

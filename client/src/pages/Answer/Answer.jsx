import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnswerCard from "../../components/Answer/AnswerCard";
import PostAnswer from "../../components/Answer/PostAnswer";
import axios from "../../axios/axios.js";
import "./Answer.css";

function Answer() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchQuestionAndAnswers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      // 1. Fetch Question details
      const qRes = await axios.get(
        `/questions/${questionid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const qData = qRes.data?.data;
      setQuestion(Array.isArray(qData) ? qData[0] : qData);

      // 2. Fetch Answers
      try {
        const aRes = await axios.get(
          `/answers/${questionid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const fetchedAnswers = aRes.data?.answers || aRes.data?.data || [];
        setAnswers(Array.isArray(fetchedAnswers) ? fetchedAnswers : []);
      } catch (ansErr) {
        if (ansErr?.response?.status === 404) {
          setAnswers([]);
        }
      }
      setError("");
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load question details"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [questionid, navigate]);

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [fetchQuestionAndAnswers]);

  return (
    <div className="answer_page">
      <Header />

      <main className="answer_container">
        {loading ? (
          <div className="answer_state_box">
            <div className="answer_spinner"></div>
            <p>Loading question and answers...</p>
          </div>
        ) : error ? (
          <div className="answer_state_box error">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Question Details Section */}
            <section className="question_display_section">
              <h2 className="question_label">Question</h2>
              <h3 className="question_subject">{question?.title}</h3>
              <p className="question_explanation">{question?.description}</p>
            </section>

            <hr className="answer_divider" />

            {/* Community Answers Section */}
            <section className="community_answers_section">
              <h3 className="community_answers_heading">
                Answer From The Community
              </h3>

              {answers.length === 0 ? (
                <p className="empty_answers">
                  No answers yet. Be the first to answer this question below!
                </p>
              ) : (
                <div className="answers_list">
                  {answers.map((item, index) => (
                    <AnswerCard
                      key={item.answerid || index}
                      answer={item}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Post Answer Component */}
            <PostAnswer
              questionid={questionid}
              onAnswerPosted={fetchQuestionAndAnswers}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Answer;

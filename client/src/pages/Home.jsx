import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "../axios/axios.js";
import { appData } from "../App.jsx";
import "./Home.css";

function Home() {
  const { user } = useContext(appData) || {};
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedData =
          response.data?.data || response.data?.questions || response.data || [];
        setQuestions(Array.isArray(fetchedData) ? fetchedData : []);
        setError("");
      } catch (err) {
        if (err?.response?.status === 404) {
          // No questions found
          setQuestions([]);
        } else if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setError(
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load questions. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  return (
    <div className="home_page">
      <Header />

      <main className="home_container">
        {/* Top bar: Ask Question button + Welcome greeting */}
        <div className="home_top_bar">
          <button
            className="ask_btn"
            onClick={() => navigate("/ask-question")}
          >
            Ask Question
          </button>
          <div className="welcome_user">
            Welcome: <span className="welcome_username">{user?.username || "Guest"}</span>
          </div>
        </div>

        {/* Questions Section */}
        <section className="questions_section">
          <h3 className="questions_title">Questions</h3>
          <hr className="questions_divider" />

          {loading ? (
            <div className="state_box">
              <div className="spinner"></div>
              <p>Loading questions...</p>
            </div>
          ) : error ? (
            <div className="state_box error">
              <p>{error}</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="state_box">
              <p>No questions found yet. Be the first to ask!</p>
            </div>
          ) : (
            <div className="questions_list">
              {questions.map((question) => (
                <div
                  key={question.questionid || question.id}
                  className="question_card"
                  onClick={() => navigate(`/question/${question.questionid}`)}
                >
                  {/* Left: Avatar & Author Username */}
                  <div className="question_user_wrapper">
                    <div className="user_avatar">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="avatar_icon"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span className="author_username">
                      {question.username || "User"}
                    </span>
                  </div>

                  {/* Middle: Question Title */}
                  <div className="question_content">
                    <p className="question_text">{question.title}</p>
                  </div>

                  {/* Right: Chevron arrow */}
                  <div className="question_action">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="chevron_icon"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;

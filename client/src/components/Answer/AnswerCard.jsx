import React from "react";
import "./AnswerCard.css";

function AnswerCard({ answer }) {
  return (
    <div className="answer_card">
      {/* Left: Avatar & Username */}
      <div className="answer_author_wrapper">
        <div className="answer_avatar_circle">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="answer_avatar_svg"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <span className="answer_author_name">
          {answer?.username || "User"}
        </span>
      </div>

      {/* Right: Answer Text */}
      <div className="answer_content">
        <p className="answer_text">{answer?.answer}</p>
      </div>
    </div>
  );
}

export default AnswerCard;

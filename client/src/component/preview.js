import React from 'react';

const Preview = ({ questions }) => {
    return (
      <div>
        {questions.map((q, index) => (
          <div key={q.id} className="preview-question">
            <p>
              Question {index + 1}:
            </p>
            <h3>
              {q.text}
            </h3>
            <ul>
              {q.options.map((o, i) => (
                <li key={o.id} className={`preview-option ${o.isCorrect ? 'preview-correct' : ''}`}>
                  {o.isCorrect && <i className="fas fa-check tick-icon"></i>}
                  {o.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  export default Preview;
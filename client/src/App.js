import React, { useState } from 'react';
import './App.css'
import axios from 'axios';
import Test from './Test';

const App = () => {
  const [questions, setQuestions] = useState([]);

  const saveWorksheet = () => {
    axios.post('http://localhost:5000/api/save-worksheet', { questions })
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ', err));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <h1>Form Component</h1>
          <QuestionList questions={questions} setQuestions={setQuestions} />
        </div>
        <div style={{ width: '45%' }}>
          <h1>Preview Component</h1>
          <Preview questions={questions} />
          <button onClick={saveWorksheet}>Save Worksheet</button>
        </div>
      </div>
      <div>
      <Test />
      </div>
    </>
  );
};

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
                {o.isCorrect && <i className="fas fa-check tick-icon"></i>} {/* Tick icon for correct answer */}
                {o.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};



const QuestionList = ({ questions, setQuestions }) => {
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <button onClick={addQuestion}>Add Question</button>
      {questions.map((q) => (
        <Question key={q.id} question={q} updateQuestion={updateQuestion} />
      ))}
    </div>
  );
};

const Question = ({ question, updateQuestion }) => {
  const updateText = (e) => {
    updateQuestion({ ...question, text: e.target.value });
  };

  const updateOptions = (newOptions) => {
    updateQuestion({ ...question, options: newOptions });
  };

  return (
    <div>
      <textarea placeholder="Enter question" value={question.text} onChange={updateText}></textarea>
      <OptionList options={question.options} updateOptions={updateOptions} />
    </div>
  );
};

const OptionList = ({ options, updateOptions }) => {
  const addOption = () => {
    const newOption = {
      id: Date.now(),
      text: '',
      isCorrect: false,
    };
    updateOptions([...options, newOption]);
  };

  const removeOption = (id) => {
    const newOptions = options.filter((o) => o.id !== id);
    updateOptions(newOptions);
  };

  const editOption = (updatedOption) => {
    const newOptions = options.map((o) => (o.id === updatedOption.id ? updatedOption : o));
    updateOptions(newOptions);
  };

  const markAsCorrect = (id) => {
    const newOptions = options.map((o) => (o.id === id ? { ...o, isCorrect: true } : { ...o, isCorrect: false }));
    updateOptions(newOptions);
  };

  return (
    <div>
      <button onClick={addOption}>Add Option</button>
      {options.map((o) => (
        <Option key={o.id} option={o} removeOption={removeOption} editOption={editOption} markAsCorrect={markAsCorrect} />
      ))}
    </div>
  );
};

const Option = ({ option, removeOption, editOption, markAsCorrect }) => {
  const [text, setText] = useState(option.text);

  const handleChange = (e) => {
    setText(e.target.value);
    editOption({ ...option, text: e.target.value });
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={() => removeOption(option.id)}>Remove</button>
      <button onClick={() => markAsCorrect(option.id)}>Mark as Correct</button>
    </div>
  );
};

export default App;

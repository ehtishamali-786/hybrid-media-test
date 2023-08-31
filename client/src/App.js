import React, { useState } from 'react';
import './App.css'
import axios from 'axios';
import Test from './pages/Test';
import QuestionList from './component/QuestionList';
import Preview from './component/preview';

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
export default App;

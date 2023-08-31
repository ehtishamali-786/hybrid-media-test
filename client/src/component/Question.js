
import React from 'react'
import OptionList from './optionList'

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


  export default Question;
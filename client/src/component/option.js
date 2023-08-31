import React, { useState } from 'react';

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
  export default Option;
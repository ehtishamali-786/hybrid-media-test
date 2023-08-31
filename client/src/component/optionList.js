import React from 'react'
import Option from './option'

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
  export default OptionList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [worksheets, setWorksheets] = useState([]);


    useEffect(() => {
        fetchWorksheet();
    }, []);

    const fetchWorksheet = async () => {
        await axios.get(`http://localhost:5000/api/fetch-worksheet`)
            .then(res => {
                setWorksheets(res.data)
            })
            .catch(err => console.log('Error: ', err));
    };
    
    return (
        <div className="test-page">
            <h1>Test Page</h1>
            {worksheets.length > 0 ? (
                worksheets.map((worksheet, worksheetIndex) => (
                    <div key={worksheet._id}>
                        <h2>Worksheet {worksheetIndex + 1}</h2>
                        {worksheet.questions.map((question, questionIndex) => (
                            <div key={question.id} className="test-question">
                                <h3>{questionIndex + 1}. {question.text}</h3>
                                <ul className="test-options">
                                    {question.options.map((option) => (
                                        <li key={option.id} className={`test-option ${option.isCorrect ? 'correct' : ''}`}>
                                            {option.isCorrect && <span className="correct-icon">✓</span>}
                                            {option.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>
    );
    
};

export default Test;

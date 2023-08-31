
import Question from './Question'

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


  export default QuestionList;
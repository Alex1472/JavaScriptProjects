export default function Greeting(props) {
    return (
        <div className="greeting-container">
            <h3 className="greeting-header">Quizzical</h3>
            <p className="greeting-descr">Some description if needed</p>
            <button
                className="default-btn start-quiz-btn"
                onClick={props.startQuiz}
            >
                Start Quiz
            </button>
        </div>
    );
}

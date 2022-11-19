import AnswerButton from "./AnswerButton";

export default function Question(props) {
    let questionInfo = props.questionInfo;
    let answerElements = questionInfo.answers.map((answer) => {
        return (
            <AnswerButton
                isSelected={answer == questionInfo.selectedAnswer}
                isRight={answer == questionInfo.rightAnswer}
                showRight={props.showRightAnswers}
                selectAnswer={() => props.selectAnswer(answer)}
                answer={answer}
                key={answer}
            />
        );
    });

    return (
        <div className="question-container">
            <p className="question-text">{questionInfo.text}</p>
            <div className="answers-container">{answerElements}</div>
            <hr />
        </div>
    );
}

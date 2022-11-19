import { useEffect, useState } from "react";
import Question from "./Question";

export default function Quiz(props) {
    let [showRightAnswers, setShowRightAnswers] = useState(false);
    let [questionsInfo, setQuestionInfo] = useState(null);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then((res) => res.json())
            .then((data) => {
                function correctText(text) {
                    return text
                        .replaceAll("&quot;", '"')
                        .replaceAll("&#039;", "'");
                }

                let questionInfos = [];
                for (let info of data.results) {
                    let correctAnswerIndex = Math.floor(4 * Math.random());
                    let answers = [...info.incorrect_answers];
                    answers.splice(correctAnswerIndex, 0, info.correct_answer);
                    answers.map((answer) => correctText(answer));

                    questionInfos.push({
                        text: correctText(info.question),
                        answers: answers,
                        selected_answer: "",
                        rightAnswer: correctText(info.correct_answer),
                    });
                }
                setQuestionInfo(questionInfos);
            });
    }, []);

    function showAnswers() {
        setShowRightAnswers(true);
    }

    function selectAnswer(newSelectedAnswer, questionIndex) {
        if (showRightAnswers) return;

        setQuestionInfo((prevQuestionInfos) => {
            let newQuestionInfos = [];
            for (let i = 0; i < prevQuestionInfos.length; i++) {
                let prevQuestionInfo = prevQuestionInfos[i];
                if (questionIndex != i) {
                    newQuestionInfos.push(prevQuestionInfo);
                    continue;
                }
                let actualSelectedAnwser =
                    prevQuestionInfo.selectedAnswer != newSelectedAnswer
                        ? newSelectedAnswer
                        : "";
                newQuestionInfos.push({
                    ...prevQuestionInfo,
                    selectedAnswer: actualSelectedAnwser,
                });
            }
            return newQuestionInfos;
        });
    }

    function countRightAnswers(questionsInfo) {
        return questionsInfo.reduce((result, questionInfo) => {
            return questionInfo.selectedAnswer == questionInfo.rightAnswer
                ? result + 1
                : result;
        }, 0);
    }

    let questionElements = questionsInfo?.map((questionInfo, index) => (
        <Question
            questionInfo={questionInfo}
            selectAnswer={(selectedAnswer) =>
                selectAnswer(selectedAnswer, index)
            }
            showRightAnswers={showRightAnswers}
            key={index}
        />
    ));
    return (
        <div>
            <div>{questionElements}</div>
            <div className="quiz-result-container">
                {showRightAnswers ? (
                    <>
                        <p className="result-text">{`You scored ${countRightAnswers(
                            questionsInfo
                        )}/${questionsInfo.length} correct answers`}</p>
                        <button
                            className="default-btn quiz-btn"
                            onClick={props.resetQuiz}
                        >
                            Play again
                        </button>
                    </>
                ) : (
                    <button
                        className="default-btn quiz-btn"
                        onClick={showAnswers}
                    >
                        Check answers
                    </button>
                )}
            </div>
        </div>
    );
}

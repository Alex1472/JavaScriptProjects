export default function AnswerButton(props) {
    function calculateStyle(isSelected, isRight, showRight) {
        if (showRight) {
            if (!isSelected) {
                if (isRight) {
                    return {
                        backgroundColor: "#94D7A2",
                        borderColor: "transparent",
                    };
                } else {
                    return {
                        opacity: 0.5,
                    };
                }
            } else {
                if (isRight) {
                    return {
                        backgroundColor: "#94D7A2",
                        borderColor: "transparent",
                    };
                } else {
                    return {
                        backgroundColor: "#F8BCBC",
                        borderColor: "transparent",
                        opacity: 0.5,
                    };
                }
            }
        } else {
            if (isSelected) {
                return {
                    backgroundColor: "#D6DBF5",
                    borderColor: "transparent",
                };
            }
        }
        return null;
    }

    let style = calculateStyle(
        props.isSelected,
        props.isRight,
        props.showRight
    );
    return (
        <button
            className="answer-default-btn"
            style={style}
            onClick={props.selectAnswer}
        >
            {props.answer}
        </button>
    );
}

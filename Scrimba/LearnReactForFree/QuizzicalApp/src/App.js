import "./App.css";
import { useState } from "react";
import Greeting from "./components/Greeting";
import Quiz from "./components/Quiz";

function App() {
    let [startQuiz, setStartQuiz] = useState(false);

    return (
        <main className="App">
            {startQuiz ? (
                <Quiz resetQuiz={() => setStartQuiz(false)} />
            ) : (
                <Greeting startQuiz={() => setStartQuiz(true)} />
            )}
        </main>
    );
}

export default App;

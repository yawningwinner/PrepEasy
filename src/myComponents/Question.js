import React, { useState, useEffect } from "react";

const Question = ({display}) => {
    const [items, setItems] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [timerActive, setTimerActive] = useState(true);
    const [timeUp, setTimeUp] = useState(false);
    // const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        update();
    }, []);

    const getAndUpdate = () => {
        const title = document.getElementById("title").value;
        const option1 = document.getElementById("option1").value;
        const option2 = document.getElementById("option2").value;
        const option3 = document.getElementById("option3").value;
        const option4 = document.getElementById("option4").value;
        const correctans = document.getElementById("correctans").value;

        const item = [title, option1, option2, option3, option4, correctans];
        let quesJsonArray = [];

        if (localStorage.getItem("quesJson") === null) {
            quesJsonArray.push(item);
            localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        } else {
            const quesJsonArrayStr = localStorage.getItem("quesJson");
            quesJsonArray = JSON.parse(quesJsonArrayStr);
            quesJsonArray.push(item);
            localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        }
        update();
    };

    const update = () => {
        let quesJsonArray = [];

        if (localStorage.getItem("quesJson") === null) {
            quesJsonArray = [];
            localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        } else {
            const quesJsonArrayStr = localStorage.getItem("quesJson");
            quesJsonArray = JSON.parse(quesJsonArrayStr);
        }

        setItems(quesJsonArray);
    };

    const deleted = (itemIndex) => {
        const quesJsonArrayStr = localStorage.getItem("quesJson");
        let quesJsonArray = JSON.parse(quesJsonArrayStr);
        quesJsonArray.splice(itemIndex, 1);
        localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        update();
    };

    const clearStorage = () => {
        if (window.confirm("Do you really want to clear?")) {
            localStorage.clear();
            update();
        }
    };
    const [timeRemaining, setTimeRemaining] = useState(0);

  const startTimer = () => {
    const inputSeconds = parseInt(document.getElementById("timerInput").value);
    if (isNaN(inputSeconds) || inputSeconds <= 0) {
      alert("Invalid input! Please enter a valid number of seconds.");
      return;
    }

    setTimeRemaining(inputSeconds);

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          setTimerActive(false);
        }
        return prevTime - 1;
      });
    }, 1000);
    // setTimeout(() => {
    //     clearInterval(intervalId);
    //     alert("Time's up!");
    //     setTimeUp(true);
    //   }, inputSeconds * 1000);
  };
  const checkAnswer = (index) => {
    if (timerActive) {
      let newAnswer = [...answers];
      if (items[index][5] === document.getElementById(`answer-${index}`).value) {
        newAnswer[index] = "correct";
      } else {
        newAnswer[index] = "wrong";
      }
      setAnswer(newAnswer);
    }
  };
    const style={"display": display?"":"none"};
    return (
        <div>
            <div >
                <div>Add question</div>

                <div >
                    <label htmlFor="title">Question</label>
                    <input
                        type="text"
                        id="title"
                        aria-describedby="emailHelp"
                    />
                </div>
                {/* <div>
                <label htmlFor="title">Question Time</label>
         **   <input type="number" id="timerInput" placeholder="Enter time in seconds" />
             <button onClick={startTimer}>Start Timer</button>

            </div> */}
                <div >
                    <label htmlFor="description">Option 1</label>
                    <input
                        type="text"
                        id="option1"
                    ></input>
                    <label htmlFor="description">Option 2</label>
                    <input
                        type="text"
                        id="option2"
                    ></input>
                    <label htmlFor="description">Opption 3</label>
                    <input
                        type="text"
                        id="option3"
                    ></input>
                    <label htmlFor="description">Option 4</label>
                    <input
                        type="text"
                        id="option4"
                    ></input>
                    <br/>
                    <label type="text">correct option (type 1, 2, 3, or 4, only one correct)</label>
                    <input type="text" id="correctans"></input>
                </div>

                <button
                    id="add"
                    onClick={getAndUpdate}
                >
                    Add
                </button>
                <button
                    id="clear"
                    onClick={clearStorage}
                >
                    Clear all
                </button>

                <div id="items" style={style}>
                    <div>Questions</div>
                    <table border="">
                        <thead>
                            <tr>
                                <td scope="col">S No</td>
                                <td scope="col">Question</td>
                                <td scope="col">Option 1</td>
                                <td scope="col">Option 2</td>
                                <td scope="col">Option 3</td>
                                <td scope="col">Option 4</td>
                                <td scope="col">Answer</td>
                                <td scope="col">Time</td>
                                <td scope="col">Start Timer</td>
                                <td scope="col">Check answer</td>
                                <td scope="col">Result</td>
                                <td scope="col">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((element, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element[0]}</td>
                                    <td>{element[1]}</td>
                                    <td>{element[2]}</td>
                                    <td>{element[3]}</td>
                                    <td>{element[4]}</td>
                                    <td>
                                        <label>type answer here</label>
                                        <input type="text" id={`answer-${index}`} disabled={!timerActive}  />
                                    </td>
                                    <td>
                                    <input type="number" id="timerInput" placeholder="Enter time in seconds" />
                                    </td>
                                    <td>
                                    <button onClick={startTimer} disabled={!timerActive}>Start Timer</button>
                                    </td>
                                    <td>
                                    <button onClick={() => checkAnswer(index)} disabled={!timerActive}>
                                            check answer
                                        </button>                                            
                                    </td>
                                    <td>
                                        <div>
                                            {
                                                answers[index]
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleted(index)}
                                            >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );
};

export default Question;

// if(element[4]===document.getElementById(`answer-${index}`).value)
// {
//     const newanswer=answers
//     newanswer[index]="correct"
//     setAnswer(newanswer)
// }
// else
// {
//     const newanswer=answers
//     newanswer[index]="correct"
//     setAnswer(newanswer)
// }

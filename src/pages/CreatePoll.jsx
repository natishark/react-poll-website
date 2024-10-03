import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";

function CreatePoll() {
  const navigate = useNavigate();
  const [poll, setPoll] = useState({
    question: "",
    options: [
      { id: 1, num: 1, value: "" },
      { id: 2, num: 2, value: "" }
    ]
  });

  function handlePollCreation() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...poll, id: nanoid() })
    };

    fetch("/new-poll", request)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(e => console.log(e));
    
    setPoll({
      question: "",
      options: [
        { id: 1, num: 1, value: "" },
        { id: 2, num: 2, value: "" }
      ]
    });
    navigate("/");
  }

  function addOption() {
    const newNum = poll.options.length + 1;
    setPoll({ ...poll, options: [ ...poll.options, { id: nanoid(), num: newNum, value: "" } ] });
  }

  function removeOption(id) {
    let newOptions = [];
    let curNum = 1;
    for (const op of poll.options) {
      if (op.id !== id) {
        newOptions.push({ ...op, num: curNum++ });
      }
    }
    setPoll({ ...poll, options: newOptions });
  }

  const optionList = poll.options.map(option =>  (
      <li className="create-ans-option" key={option.id}>
        <textarea 
          placeholder={`Option ${option.num}`} 
          id={`option-${option.num}`} 
          required
          value={option.value}
          onChange={handleChange} 
        />
        <button 
          className="del-poll-op-btn" 
          disabled={poll.options.length <= 2}
          onClick={() => removeOption(option.id)}>
          <span className="hidden-content">Delete answer option</span>
        </button>
      </li>
    )
  );

  function handleChange(event) {
    event.preventDefault();
    if (event.target.id === "ques") {
      setPoll({ ...poll, question: event.target.value });
    } else {
      poll.options[event.target.id.split("-")[1] - 1].value = event.target.value;
      setPoll({ ...poll, options: poll.options.map(op => {
        if (op.num === event.target.id.split("-")[1]) {
          return { ...op, value: event.target.value };
        }
        return op;
      })});
    }
  }


  return (
    <>
      <Header />
      <main className="create-main main">
        <div className="question-input">
          <h2 className="main-section-title">Question</h2>
          <textarea  
            className="ques-input" 
            name="question" 
            id="ques" 
            required 
            value={poll.question}
            onChange={handleChange}
          />
        </div>
        <div className="options-input">
          <h2 className="main-section-title">Options</h2>
          {optionList}
          <button 
            className="ui-button" 
            type="button"
            onClick={addOption}>
            Add
            <span className="hidden-content"> new option</span>
          </button>
        </div>
        <div className="create-btn-group pc-btn-group">
          <button 
            type="button" 
            className="ui-button encourage"
            onClick={handlePollCreation}>
            Create!
          </button>
          <button 
            type="button" 
            className="ui-button dangerous"
            onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </main>
    </>
  );
}

export default CreatePoll;

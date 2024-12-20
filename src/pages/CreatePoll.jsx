import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Poll } from "../utils/poll/poll";
import Header from "../components/Header";
import ConfirmCancelModal from "../components/ConfirmCancelModal";

function CreatePoll() {
  const navigate = useNavigate();
  const [poll, setPoll] = useState(Poll.empty());
  const [modalState, setModalState] = useState(null);

  function handlePollCreation() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(poll)
    };

    fetch("/new-poll", request)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(e => console.log(e));
    
    setPoll(Poll.empty());
    navigate("/");
  }

  function handleModalClosing() {
    setModalState(null);
  }

  function handleAbortCreation() {
    if (poll.isEmpty()) {
      navigate("/")
    } else {
      setModalState("cancel")
    }
  }

  function addOption() {
    setPoll(poll.addOption());
  }

  function removeOption(id) {
    setPoll(poll.removeOption(id));
  }

  const optionList = poll.options.map(option =>  (
      <li className="create-ans-option" key={option.id}>
        <textarea 
          placeholder={`Option ${option.num + 1}`}
          id={option.id} 
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
      setPoll(poll.updateQuestion(event.target.value));
    } else {
      setPoll(poll.updateOption(event.target.id, event.target.value));
    }
  }

  return (
    <>
      <Header onPollsNavigate={handleAbortCreation}/>
      <main className="create-main main">
        <div className="question-input">
          <h2 className="main-section-title">Question</h2>
          <textarea  
            className="ques-input" 
            name="question" 
            id="ques" 
            placeholder="Type your question here..." 
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
        <div className="create-btn-group btn-group">
          <button 
            type="button" 
            className="ui-button encourage"
            onClick={() => setModalState("create")}>
            Create!
          </button>
          <button 
            type="button" 
            className="ui-button dangerous"
            onClick={handleAbortCreation}>
            Cancel
          </button>
        </div>
      </main>
      <ConfirmCancelModal 
        isOpen={modalState === "create"}
        message="Create this poll?"
        focusOnConfirm={true}
        onConfirm={handlePollCreation}
        onCancel={handleModalClosing}
      />
      <ConfirmCancelModal 
        isOpen={modalState === "cancel"}
        message="Abort creation? What is written will be lost."
        focusOnConfirm={false}
        onConfirm={() => navigate("/")}
        onCancel={handleModalClosing}
      />
    </>
  );
}

export default CreatePoll;

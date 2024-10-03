import { useState } from "react";
import radioButton from "../assets/radio-button.svg";

const SEND_ERROR_MESSAGE = "You need to chose something!"

function Poll({ id, name, options, updatePoll }) {
  const [isResults, setResults] = useState(false);
  const [focus, setFocus] = useState(null);
  const [sendError, setSendError] = useState(null);

  const resultsTemplate = (op) => {
    let sum = options
      .map(op => op.voteNumber)
      .reduce((a, b) => a + b, 0);
    return (
      <div className="pc-option-res pc-option" key={op.id}>
        <p className="pc-option-desc res-line stats">{`${sum === 0 ? 0 : Math.floor(op.voteNumber * 100 / sum)}%`}</p>
        <p className="pc-option-desc res-line">{op.value}</p>
      </div>
    )
  };

  function handleFocusChange(opId) {
    if (focus !== opId) {
      setFocus(opId);
    }
    if (sendError !== null) {
      setSendError(null);
    }
  }

  const viewTemplate = (op) => (
    <div className="pc-option" key={op.id} onClick={() => handleFocusChange(op.id)}>
      <label className="pc-option-desc radio-el" htmlFor={id + op.id}>
        <input 
          type="radio" 
          id={id + op.id} 
          name={`poll-${id}`} 
          value={op.value} 
          checked={focus === op.id}
        />
        <svg className="radio-button unchecked-rb">
          <use href={`${radioButton}#unchecked`}></use>
        </svg>
        <svg className="radio-button checked-rb">
          <use href={`${radioButton}#checked`}></use>
        </svg>
        {op.value}
      </label>
    </div>
  );

  const optionList = options.map(op => isResults ? resultsTemplate(op) : viewTemplate(op));

  function showResults() {
    setResults(true);
  }

  function sendVote() {
    if (focus === null) {
      setSendError(SEND_ERROR_MESSAGE);
      return;
    }

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, voteId: focus })
    };

    const optionId = focus;

    fetch("/new-vote", request)
      .catch(e => console.log(e));

    updatePoll(id, options.map(o => {
      if (o.id === optionId) {
        o.voteNumber++;
      }
      setFocus(null);
      setResults(true);
      return o;
    }));
  }

  function includeSendError() {
    return !isResults && sendError !== null ? 
      <p className="error-message">{sendError}</p> :
      <></>
  }

  return (
    <div className="poll-card">
      <h2 className="main-section-title">{name}</h2>
      <fieldset className="pc-options">
        {optionList}
      </fieldset>
      <div className="pc-btn-group">
        <button 
          type="button" 
          className="ui-button encourage"
          onClick={sendVote}
          disabled={isResults}>
          Vote
        </button>
        <button 
          type="button" 
          className="ui-button"
          onClick={showResults}
          disabled={isResults}>
          Show results
        </button>
      </div>
      {includeSendError()}
    </div>
  )
}

export default Poll;

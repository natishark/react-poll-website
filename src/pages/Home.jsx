import Poll from "../components/Poll";
import Header from "../components/Header";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [pollList, setPolls] = useState([]);

  useEffect(() => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/polls", request)
      .then(response => response.json())
      .then(response => setPolls(response))
      .catch(e => console.log(e));
  });

  function updatePoll(id, options) {
    setPolls(pollList.map(p => {
      if (p.id === id) {
        return { ...p, options: options };
      }
      return p;
    }));
  }

  const pollElements = pollList.map(poll => (
    <Poll 
      key={poll.id}
      id={poll.id}
      name={poll.question}
      options={poll.options}
      updatePoll={updatePoll}
    />
  ))

  return (
    <>
      <Header />
      <main className="main">
        {pollElements}
      </main>
    </>
  );
}

export default Home;

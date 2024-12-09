import Header from "../components/Header";
import PageNavigation from "../components/PageNavigation";
import Poll from "../components/Poll";

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMount } from "../utils/hooks/mount";

const POLL_PER_PAGE = 2;

function Home() {
  const [pollList, setPolls] = useState([]);
  const { page: pageNumberStr = 1 } = useParams();
  const pageNumber = Number(pageNumberStr);

  console.log(pageNumber);

  function getPolls() {
    console.log('req');
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/polls", request)
      .then(response => response.json())
      .then(response => setPolls(response))
      .catch(e => console.log(e));
  }

  useMount(getPolls);

  function updatePoll(id, options) {
    setPolls(pollList.map(p => {
      if (p.id === id) {
        return { ...p, options: options };
      }
      return p;
    }));
  }

  const pollElements = pollList
    .slice((pageNumber - 1) * POLL_PER_PAGE, pageNumber * POLL_PER_PAGE)
    .map(poll => (
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
        <PageNavigation
          current={pageNumber}
          total={Math.ceil(pollList.length / POLL_PER_PAGE)} />
      </main>
    </>
  );
}

export default Home;

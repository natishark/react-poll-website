import { Link } from "react-router-dom";
import '../styles/page-navigation.css';

function PageNavigation({current, total}) {
  return (
    <nav>
      {current > 1 && <Link to={`/${current - 1}`}>{'<'}</Link>}
      {generateElements(current, total)}
      {current < total && <Link to={`/${current + 1}`}>{'>'}</Link>}
    </nav>
  );
}

function generateElements(current, total) {
  const pageNumbersToRender = Array.from(new Set([1, current - 1, current, current + 1, total]))
    .filter(page => page >= 1 && page <= total);

  const elements = [];

  let previous = 0;
  let elementIndex = 0;

  pageNumbersToRender.forEach(num => {
    if (num !== previous + 1) {
      elements.push(<span key={elementIndex++}>...</span>);
    }

    elements.push(
      <Link
        to={`/${num}`}
        key={elementIndex++}
        className={`page-number ${getActivePageClass(current === num)}`}>
        {num}
      </Link>
    );
    previous = num;
  });

  return elements;
}

function getActivePageClass(isActive) {
  return isActive ? "active-page" : "";
}

export default PageNavigation;
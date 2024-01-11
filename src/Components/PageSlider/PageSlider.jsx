import "./PageSlider.css";

function PageSlider({
  activePage,
  changePage,
  goToPrevPage,
  goToNextPage,
  numberOfPages,
}) {
  let startIndex;
  let endIndex;

  if (activePage < 7) {
    startIndex = 1;
    endIndex = Math.min(7, numberOfPages);
  } else if (activePage + 3 > numberOfPages) {
    startIndex = numberOfPages - 6;
    endIndex = numberOfPages;
  } else {
    startIndex = activePage - 3;
    endIndex = Math.min(activePage + 3, numberOfPages);
  }

  function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  return (
    <div className="page-slider">
      <button
        className="left-slider-btn slider-btn"
        onClick={() => {
          if (activePage - 1 >= 1) goToPrevPage();
        }}
      >
        <svg
          className="left-arrow"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>
      <div className="pages">
        {range(startIndex, endIndex).map((page) => {
          return (
            <button
              key={page}
              className={activePage === page ? "active-page page" : "page"}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className="right-slider-btn slider-btn"
        onClick={() => {
          if (activePage + 1 <= numberOfPages) goToNextPage();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>
    </div>
  );
}

export default PageSlider;

import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export default function News({ category, country, apikey, pagesize }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchData();
  }, [category, country, apikey, page, pagesize]);

  async function fetchData() {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apikey}&page=${page}&pageSize=${pagesize}`;
    setLoading(true);
    const response = await fetch(url);
    const parsedData = await response.json();
    setLoading(false);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  }

  const isPrevButtonDisabled = page <= 1;
  const isNextButtonDisabled = page + 1 > Math.ceil(totalResults / pagesize);

  const handlePrevPage = () => {
    if (!isPrevButtonDisabled) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (!isNextButtonDisabled) {
      setPage(page + 1);
    } else {
      alert("You are up-to-date");
    }
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">TOP HEADLINES - {category.toUpperCase()}</h2>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItems
                title={element.title}
                description={element.description}
                imageURL={element.urlToImage}
                newsURL={element.url}
              />
            </div>
          ))}
      </div>

      <div className="container d-flex justify-content-between my-3">
        <button
          disabled={isPrevButtonDisabled}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevPage}
        >
          &#8592; Previous
        </button>
        <button
          disabled={isNextButtonDisabled}
          type="button"
          className="btn btn-dark"
          onClick={handleNextPage}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

News.defaultProps = {
  country: "in",
  pagesize: 9,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired
};

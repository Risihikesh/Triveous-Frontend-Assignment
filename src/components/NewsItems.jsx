import React from "react";

const NewsItems = ({ imageURL, title, description, newsURL }) => {
  return (
    <div className="my-3">
      <div
        className="card-container" // Add a class for the container
        style={{
          display: "flex",
          alignItems: "stretch", // Ensure all cards have equal height
        }}
      >
        <div className="card" style={{ width: "18rem", padding: "5px", borderRadius: "8px", border: "1px solid black" }}>
          <img
            src={
              !imageURL
                ? "https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc="
                : imageURL
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <h5 className="card-title">{title}</h5>
              <p
                className="card-text"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxHeight: "4.5em", // Adjust this value to control the description height
                  marginBottom: "1em", // Add spacing at the bottom
                }}
              >
                {!description ? "No description available" : description}
              </p>
            </div>
            <div>
              <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                Read More ...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;

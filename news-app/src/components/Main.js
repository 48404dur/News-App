import React, { useEffect, useState } from "react";
import "./main.css";
import DefaultImage from './default.jpg';

export default function Navbar() {
  const [newsdata, setnewsdata] = useState([]);
  const [category, setcategory] = useState("General");

  const newscategory = (NewCategory) => {
    setcategory(NewCategory);
  };

  useEffect(() => {
    const fetchnews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${category}&from=2024-07-24&sortBy=publishedAt&apiKey=3969d3121f7341abba391e7a8cac2724`
        );
        const data = await response.json();
        setnewsdata(data.articles);
        console.log(data.articles);
      } catch (error) {
        console.log("Error Fetching the data", error);
      }
    };

    fetchnews();
  }, [category]); // <-- Added category as a dependency

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand ms-5" href="\\">
            -News-
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={() => newscategory("General")}>
                  General
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => newscategory("Music")}>
                  Music
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => newscategory("Entertainment")}>
                  Entertainment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => newscategory("Cartoon")}>
                  Cartoon
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => newscategory("Geography")}>
                  Geography
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => newscategory("Hollywood")}>
                  Hollywood
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-between">
              {newsdata.length > 0 ? (
                newsdata.map((item, index) => (
                  <div className="card m-2 flex-grow-1" style={{ width: "20rem", flexBasis: "calc(25% - 1rem)" }} key={index}>
                    <img
                      src={!item.urlToImage ? DefaultImage : item.urlToImage}
                      className="card-img-top"
                      alt="The Image Is Not Available"
                      height="250px"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <a href={item.url} className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No news articles found for this criteria.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

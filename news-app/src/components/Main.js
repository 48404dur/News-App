import React, { useEffect, useState } from "react";
import "./main.css";
import DefaultImage from './default.jpg';

export default function Navbar() {
  const [newsdata, setnewsdata] = useState([]);
  const [category, setcategory] = useState("General");
  const [loading, setLoading] = useState(true);
  const [value, setvalue] = useState("");

  const newscategory = (NewCategory) => {
    setcategory(NewCategory);
  };

  const Handlechange = (e) => {
    setvalue(e.target.value);
  };

  const setCustomCategory = (e) => {
    e.preventDefault(); // Prevent form submission
    if (value.trim() !== "") {
      setcategory(value); // Update category to the custom search value
      setvalue(""); // Clear the input field after setting the category
    }
  };

  useEffect(() => {
    const fetchnews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${category}&apiKey=3969d3121f7341abba391e7a8cac2724`
        );
        const data = await response.json();
        setnewsdata(data.articles);
        localStorage.setItem(`NewsData-${category}`, JSON.stringify(data.articles)); // Store with category-specific key
      } catch (error) {
        console.log("Error Fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    const storedNewsData = localStorage.getItem(`NewsData-${category}`); // Retrieve with category-specific key
    if (storedNewsData) {
      setnewsdata(JSON.parse(storedNewsData));
      setLoading(false); // Stop spinner immediately if data is found in localStorage
    } else {
      fetchnews();
    }
  }, [category]); // This will re-fetch news whenever the category changes

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-5 text-white" href="\">
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
                <a className="nav-link active text-white" aria-current="page" href="\" onClick={(e) => {e.preventDefault(); newscategory("General")}}>
                  General
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="\" onClick={(e) => {e.preventDefault(); newscategory("Music")}}>
                  Music
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="\" onClick={(e) => {e.preventDefault(); newscategory("Entertainment")}}>
                  Entertainment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="\" onClick={(e) => {e.preventDefault(); newscategory("Cartoon")}}>
                  Cartoon
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="\" onClick={(e) => {e.preventDefault(); newscategory("Geography")}}>
                  Geography
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="\" onClick={(e) => {e.preventDefault(); newscategory("Hollywood")}}>
                  Hollywood
                </a>
              </li>
              <form className="d-flex" role="search" style={{ marginLeft: "80px" }} onSubmit={setCustomCategory}>
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={value} onChange={Handlechange} />
                <button className="btn btn-primary ms-3" type="submit">Search</button>
              </form>
            </ul>
          </div>
        </div>
      </nav>

      {/* Conditionally render spinner */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center mt-3">-News- {category}</h1>
          <div className="container-fluid" style={{ marginTop: "70px" }}>
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
      )}
    </>
  );
}

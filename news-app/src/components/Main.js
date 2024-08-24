  import React , {useEffect , useState} from "react";
  import './main.css'
  export default function Navbar() {
    const [newsdata , setnewsdata] = useState([])
    useEffect(()=>{
      const  fetchnews = async ()=>{
        try{
          const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-07-24&sortBy=publishedAt&apiKey=3969d3121f7341abba391e7a8cac2724')
          const data = await response.json()
          // console.log(data.articles)
          setnewsdata(data.articles)
          console.log(data.articles)
        }catch(error){
          console.log("Error Fetching the data" , error)
        }
      }
      fetchnews()
    } , [])
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand ms-5" href="\">
              -News-
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="\navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="\">
                    General
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="\">
                    Music
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="\">
                    Entertainment
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="\">
                    Cartoon
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="\">
                    Goegraphy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="\">
                    Hollywood
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
        <div>
          {newsdata.length > 0 ? (
            newsdata.map((item, index) => (
              <div class="card" style={{width: "18rem"}} key={index}>
               <img src={item.urlToImage} class="card-img-top" alt="The Image Is Not Available "/>
                <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
              <p class="card-text">{item.description}</p>
               <a href={item.url} class="btn btn-primary">Read More</a>
                </div>
             </div>
            ))
          ) : (
            <p>No news articles found for this criteria.</p>
          )}
        </div>
      </>
    );
  }

import { useState, useEffect } from "react";


// Import components
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel"

import "../Homepage/Homepage.scss";

const Homepage = () => {
  const [gameData, setGameData] = useState(null);

  useEffect( () => {
    const fetchData = query => {
      fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "a60e9faf7fmshc23154d0472737cp1baaf5jsna13ea55c29e8",
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => setGameData(data.slice(0,100)))
        .catch((err) => {
          console.error(err);
        });
    }
    
    fetchData();
    
  }, []);

  return (
    <div className="homepage">
      <div className="homepage__container container">
        <h5 className="hompage__header fw-bold">
          <i className="fab fa-hotjar text-danger"></i> New Release Free Games
        </h5>
        <hr />
      </div>
      <div className="container-fluid">
        {gameData && <Carousel games={gameData.slice(0,5)}></Carousel>}
        <hr />
        {gameData && <Card games={gameData.slice(6,12)}></Card>}
      </div>
    </div>
  );
};

export default Homepage;

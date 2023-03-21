import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import "./Home.scss";
import { HomePic1, HomePic2, HomePic3, HomeText } from "../../utils/consts";
const images = [HomePic1, HomePic2, HomePic3];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="container">
      <Card className="card">
        <span className="home-text">{HomeText} </span>
        <div className="home-images">
          <img
            src={images[currentImageIndex]}
            alt="slideshow"
            height={300}
            width={300}
          />
        </div>
      </Card>
    </div>
  );
};

export default Home;

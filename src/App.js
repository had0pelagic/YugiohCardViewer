import "./App.css";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./api";
import Loader from "./components/loading_spinner";
import styled from "styled-components";
import ModelViewer from "./components/model_viewer";
import CardBackside from "./files/images/card_backside.png";

export default function App() {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCard = async () => {
      var response = await api.cards.getRandomCard("randomcard.php");

      if (response.status === 200) {
        setCard(response.data);
      } else {
        console.log("error");
      }
      setLoading(false);
    };

    getCard();
  }, []);

  const MainContainer = styled.div`
    background-color: #282c34;
    width: 800px;
    height: 800px;
    border-style: solid;
    border-width: 2px;
    border-color: white;
  `;

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <Loader />
        ) : (
          <MainContainer>
            <ModelViewer image={card.card_images[0].image_url} />
          </MainContainer>
        )}
      </header>
    </div>
  );
}

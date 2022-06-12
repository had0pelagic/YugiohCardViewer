import "./App.css";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./api";
import Loader from "./components/loading_spinner";
import styled from "styled-components";
import ModelViewer from "./components/model_viewer";
import CardBackside from "./files/images/card_backside.png";
import Dark from "./files/images/DARK.png";
import Divine from "./files/images/DIVINE.png";
import Earth from "./files/images/EARTH.png";
import Fire from "./files/images/FIRE.png";
import Light from "./files/images/LIGHT.png";
import Magic from "./files/images/MAGIC.png";
import Spell from "./files/images/SPELL.png";
import Trap from "./files/images/TRAP.png";
import Virus from "./files/images/VIRUS.png";
import Water from "./files/images/WATER.png";
import Wind from "./files/images/WIND.png";
import Star from "./files/images/Star.png";

export default function App() {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const effect_cards = ["Trap Card", "Spell Card"];
  const attribute_images = {
    DARK: Dark,
    DIVINE: Divine,
    EARTH: Earth,
    FIRE: Fire,
    LIGHT: Light,
    MAGIC: Magic,
    SPELL: Spell,
    TRAP: Trap,
    VIRUS: Virus,
    WATER: Water,
    WIND: Wind,
  };

  useEffect(() => {
    const getCard = async () => {
      var response = await api.cards.getRandomCard("randomcard.php");

      if (response.status === 200) {
        setCard(response.data);
        console.log(response.data);
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
          <div className="main_page">
            <div className="container" id="left_container">
              <div className="description_panel">
                {card.desc ? (
                  <div>
                    <p className="description">{card.desc}</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="container" id="center_container">
              <div className="viewer_panel">
                <ModelViewer image={card.card_images[0].image_url} />
              </div>
            </div>
            <div className="container" id="right_container">
              {card && !effect_cards.includes(card.type) ? (
                <div className="information_panel" id="monster_card">
                  <div>{card.name}</div>
                  {card.level ? (
                    <div className="level_wrapper">
                      <p>Level: {card.level}</p>
                      <img
                        src={Star}
                        alt="Level star"
                        className="level_image"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {card.type ? (
                    <div>
                      <p>Type: {card.type}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                  {card.attribute ? (
                    <div className="attribute_wrapper">
                      <p>Attribute: {card.attribute}</p>
                      <img
                        src={attribute_images[card.attribute.toUpperCase()]}
                        alt="Card level"
                        className="attribute_image"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {card.atk & card.def ? (
                    <div>
                      <p>
                        ATK/{card.atk} DEF/{card.def}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div className="information_panel" id="effect_card">
                  <div>
                    <p>Name: {card.name}</p>
                  </div>
                  {card.type ? (
                    <div>
                      <p>Type: {card.type}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

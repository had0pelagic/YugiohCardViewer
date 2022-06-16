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
  const [cards, setCards] = useState([]);
  const [searchForm, setSearchForm] = useState({
    name: "",
  });
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
    getRandomCard();
  }, []);

  const getRandomCard = async () => {
    var response = await api.cards.getRandom();

    if (response.status === 200) {
      setCard(response.data);
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  const getCardByName = async () => {
    var response = await api.cards.getByName(searchForm.name);

    if (response.status === 200) {
      setCards(response.data.data);
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    setSearchForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelectChange = (e) => {
    setCard(cards[e.target.value]);
  };

  const CardDescriptionContainer = (
    <div className="description_container">
      {card.hasOwnProperty("desc") ? (
        <>
          <p className="description_text">{card.desc}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  const CardInformationContainer = (
    <>
      {card && !effect_cards.includes(card.type) ? (
        <div className="information_container" id="monster_card">
          <div>{card.name}</div>
          {card.hasOwnProperty("level") ? (
            <div className="level_wrapper">
              <p>Level: {card.level}</p>
              <div className="level_image_container">
                <img src={Star} alt="Level star" className="level_image" />
              </div>
            </div>
          ) : (
            <></>
          )}
          {card.hasOwnProperty("type") ? (
            <div>
              <p>Type: {card.type}</p>
            </div>
          ) : (
            <></>
          )}
          {card.hasOwnProperty("attribute") ? (
            <div className="attribute_wrapper">
              <p>Attribute: {card.attribute}</p>
              <div className="attribute_image_container">
                <img
                  src={attribute_images[card.attribute.toUpperCase()]}
                  alt="Card level"
                  className="attribute_image"
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          {card.hasOwnProperty("atk") && card.hasOwnProperty("def") ? (
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
        <div className="information_container" id="effect_card">
          <div>
            <p>Name: {card.name}</p>
          </div>
          {card.hasOwnProperty("type") ? (
            <div>
              <p>Type: {card.type}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );

  const ActionContainer = (
    <div className="action_grid">
      <div className="action_left_container">
        <button className="action_button" onClick={() => getRandomCard()}>
          Random card
        </button>
      </div>

      <div className="action_center_container">
        <form className="search_form" onSubmit={handleSearchSubmit}>
          <input
            className="search_input"
            id="name"
            value={searchForm.name}
            onChange={handleSearchChange}
          />
          <button
            style={{ marginLeft: "10px" }}
            className="action_button"
            onClick={() => getCardByName()}
          >
            Search
          </button>
        </form>
      </div>

      <div className="action_right_container">
        {cards && cards.length > 0 ? (
          <select className="select" onChange={handleSelectChange}>
            {cards.map((card, index) => (
              <option key={index} value={index}>
                {card.name}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <Loader />
        ) : (
          <div className="main">
            <div className="main_grid">
              <div className="grid_container" id="left_container">
                {CardDescriptionContainer}
              </div>

              <div className="grid_container" id="center_container">
                <div className="viewer_container">
                  <ModelViewer image={card.card_images[0].image_url} />
                </div>
              </div>

              <div className="grid_container" id="right_container">
                {CardInformationContainer}
              </div>
            </div>

            <div className="action_container">{ActionContainer}</div>
          </div>
        )}
      </header>
    </div>
  );
}

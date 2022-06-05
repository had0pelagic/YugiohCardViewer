/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import card_repository from "./repositories/card_repository";

const instance = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/",
});

const api = {
  get: async (path) => {
    return instance.get(path);
  },
};

const repositories = {
  cards: card_repository(api),
};

export default { ...repositories };

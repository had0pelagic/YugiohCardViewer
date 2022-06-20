/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import card_repository from "./repositories/card_repository";

const instance = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/",
});

const handleResponse = async (response, statusCode) => {
  return {
    status: statusCode,
    data: response.data,
    headers: response.headers,
  };
};

const api = {
  get: async (path) => {
    return instance
      .get(path)
      .then(async function (response) {
        return handleResponse(response, response.status);
      })
      .catch(async function (response) {
        response.data = response.response.data.error;
        return handleResponse(response, response.response.status);
      });
  },
};

const repositories = {
  cards: card_repository(api),
};

export default { ...repositories };

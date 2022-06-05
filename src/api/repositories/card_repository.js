/* eslint-disable import/no-anonymous-default-export */
export default (axios) => ({
  async getRandomCard() {
    return await axios.get("randomcard.php");
  },
});

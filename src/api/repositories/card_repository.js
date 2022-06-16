/* eslint-disable import/no-anonymous-default-export */
export default (axios) => ({
  async getRandom() {
    return await axios.get("randomcard.php");
  },
  async getByName(name) {
    return await axios.get(`cardinfo.php?fname=${name}`);
  },
});

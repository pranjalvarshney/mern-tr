const axios = require("axios");

const uri = "https://api.quotable.io/random";

module.exports = fetchData = async () => {
  try {
    const response = await axios.get(uri);
    console.log(response.data.content);
    return response.data.content.split(" ");
  } catch (error) {
    console.log(error);
  }
};

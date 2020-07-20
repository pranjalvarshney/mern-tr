const axios = require("axios");

const uri = "https://api.quotable.io/random";

module.export = fetchData = async () => {
  try {
    const response = await axios.get(uri);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

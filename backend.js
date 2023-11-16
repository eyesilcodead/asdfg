const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

const getCityName = async (location) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.long}&radius=1000&key=AIzaSyCluWp7DJQ3HpAMJrUerzfd2RYbSBVvePw&language=tr`,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getCountryName = async (location) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=AIzaSyCluWp7DJQ3HpAMJrUerzfd2RYbSBVvePw&language=tr`,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

app.post("/cityfinder", async (req, res) => {
  try {
    const result = await getCityName(req.body);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Puan Durumu error occurred" });
  }
});

app.post("/countryfinder", async (req, res) => {
  try {
    const result = await getCountryName(req.body);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Puan Durumu error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

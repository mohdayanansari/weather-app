const express = require("express");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiID = "0569f8ccf19c5365347d13e98f5b4c8c";
  const api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiID +
    "&units=metric";

  https.get(api, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const tem = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL =
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write(
        "<h1> The current temperature in " +
          query +
          " is " +
          tem +
          " Celcius </h1>"
      );
      res.write("<h1>" + desc + "</h1>");
      res.write("<img src=" + imageURL + " >");
      console.log(tem, desc);
      res.send();
    });
  });
});

app.listen(5500, () => {
  console.log("Server is running on port 5500.");
});

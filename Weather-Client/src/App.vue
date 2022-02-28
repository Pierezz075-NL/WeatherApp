<template>
  <div id="app">
    <main>
      <!-- First search -->
      <div class="search-wrapper" v-if="!initData">
        <div class="search-content">
          <h1>Weather Forecast</h1>
          <p>Fill in your city and find out what the weather forecast is</p>
        </div>
        <div class="search-box">
          <input
            type="text"
            class="search-bar"
            placeholder="Example: Amsterdam"
            v-model="query"
            @keypress="fetchWeather"
          />
        </div>
      </div>

      <!-- Then show result -->
      <div v-if="initData">
        <div class="location">
          <div
            class="top-box"
            :class="
              weather.main.temp > 20
                ? 'top-box-warm'
                : weather.main.temp < 20 && weather.main.temp > 9
                ? 'top-box-semi'
                : 'top-box-cold'
            "
          >
            <div class="box-location">
              <h3>{{ weather.weather[0].main }}</h3>
              <h2>{{ weather.name }} - {{ weather.sys.country }}</h2>
              <h1>{{ Math.round(weather.main.temp) }}°c</h1>
              <div class="date">{{ dateBuilder() }}</div>
            </div>
          </div>

          <div class="bottom-box">
            <div class="column">
              <div class="row">
                <div class="row-header">
                  <p>Feels like</p>
                </div>
                <div class="row-content">
                  <p>{{Math.round(weather.main.feels_like)}}°c </p>
                </div>
              </div>
              <div class="row">
                <div class="row-header">
                  <p>Min</p>
                </div>
                <div class="row-content">
                  <p>{{Math.round(weather.main.temp_min)}}°c </p>
                </div>
              </div>
              <div class="row">
                <div class="row-header">
                  <p>Max</p>
                </div>
                <div class="row-content">
                  <p>{{Math.round(weather.main.temp_max)}}°c </p>
                </div>
              </div>
            </div>
            <button class="reset" v-on:click="initData = false">Reset Location</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      query: "",
      weather: {},
      initData: false,
    };
  },
  methods: {
    /* eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    fetchWeather(e) {
      if (e.key == "Enter") {
        // Create query and post it to the microsservice
        const query = { city: this.query };
        axios
          .post("http://localhost:5000/weather", query)
          .then((response) => {
            this.initData = true;
            return response.data;
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let d = new Date();
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    imageBuilder() {
      let weatherIcon = this.weather.weather[0].icon;
      return `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

main {
  min-height: 100vh;
}

.search-wrapper {
  background-color: #fff;
  padding-bottom: 20px;
  min-height: 100vh;
  background-image: url("../src/assets/bg.jpeg");
  background-size: cover;
}

.search-content h1,
.search-content p {
  font-size: 30px;
  text-align: center;
  padding: 20px 0px;
}

.search-content p {
  font-size: 18px;
  font-family: "Arial", sans-serif;
}

.search-box {
  padding: 25px;
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;
  text-align: center;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location {
  min-height: 100vh;
}

.top-box {
  min-height: 60vh;
  background-size: cover;
  background-position: top;
}
.top-box-cold {
  background-image: url("../src/assets/cold-bg.jpg");
}
.top-box-semi {
  background-image: url("../src/assets/semi.jpeg");
}
.top-box-warm {
  background-image: url("../src/assets/warm-bg.jpg");
}

.bottom-box {
  min-height: 40vh;
  text-align: center;
}

.box-location {
  text-align: center;
  color: #fff;
  padding: 145px 0;
}
.box-location .date{
  font-weight: bold;
  font-size: 20px;
  padding-top: 30px;
}
.top-box-cold .box-location, .top-box-semi .box-location{
  color: #313131;
}
.box-location h1 {
  font-size: 90px;
  padding: 20px 0px 0px 0px;
}
.box-location h2 {
  font-size: 20px;
  font-weight: 100;
  padding-top: 5px;
}
.box-location h3 {
  font-size: 26px;
  font-weight: bold;
  padding: 0px 0px 0px 0px;
}

.bottom-box .date {
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size:24px;
  padding: 25px 0px;
}

.bottom-box .column{
  padding:45px 0px;
  margin: 0 auto;
  text-align: center;
}

.bottom-box .column .row{
  width: 33%;   
  padding: 0px 20px;
  float: left;
}

.bottom-box .column .row .row-header p{
  padding-bottom:10px;
  font-weight:bold;
  font-size:18px;
}

.bottom-box .column .row .row-content{
  font-size:22px;
  background-color: #F0F0F0;
  border-radius:5px;
}
.bottom-box .column .row .row-content p{
  padding:10px;
  text-align: center;
  color:#000;
  font-weight: bold;
}
.bottom-box .column .row .row-content img {
  display: inline-block;
  width: 50px;
}
.reset{
  padding:10px 25px;
  background-color: #E5EBF1;
  color: #000;
  border: 0;
  border-radius:5px;
  margin-top: 70px;
  font-size:24px;
}
</style>

import React from "react";

function Location(props) {
  function all_loc() {
    if (navigator.geolocation) getPosition();
    else alert("Geolocation not available");
  }
  const getPosition = (options) => {
    let my_promise = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    my_promise
      .then((position) => {
        console.log(position);
        getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => {
        getWeather(28.67, 77.22);
        alert("You  disabled location.");
      });
  };
  async function getWeather(lat, lon) {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7a36780cd7989555231b47d268f69c7f`
    );
    const data=await api_call.json();
    console.log(data);
    console.log(Math.round(data.main.temp));
    console.log(Math.round(data.main.temp*1.8+32));
    console.log(data.weather[0].main);
  }
  async function getlocation(){
    const city=document.getElementById("fname").value;
    console.log(city);
    const api_fetch=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7a36780cd7989555231b47d268f69c7f`);
    const loc=await api_fetch.json();
    console.log(loc[0]);
    getWeather(loc[0].lat,loc[0].lon);
  }
  return (
    <>
      <div className="container">
        <button onClick={all_loc}>click here</button>
     <label htmlFor="fname">City name:</label>
  <input type="text" id="fname" name="fname"/>
      <button className="btn" onClick={getlocation}>Search</button>
      </div>
    </>
  );
}

export default Location;

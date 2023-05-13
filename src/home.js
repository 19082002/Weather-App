import React, { useState } from "react";
import "./home.css";
function Home(props) {
  // const[backgr,setBackgr]=(url(/images/back.jpg));
  const [hr,setHr]=useState(1);
  const [temp, setTemp] = useState(23);
  const [city_name, setCity] = useState("Lc");
  const [obmain, setObmain] = useState({
    wind: 3.4,
    feellike: 35,
    sunset: "18:05",
    sunrise: "5:00",
    pressure: 1039,
    maxtemp: 33,
    mintemp: 78,
    humidity: 56,
    rain: 78,
  });
  const [sky, setSky] = useState("clear");
  const [ic, setIc] = useState("cloud-meatball");
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
  async function getlocation() {
    const city = document.getElementById("cname").value;
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7a36780cd7989555231b47d268f69c7f`
    )
      .then((res) => res.json())
      .then((loc) => { 
        console.log(loc);
        console.log(loc[0]);
        getWeather(loc[0].lat, loc[0].lon);
      })
      .catch(() => {
        alert("location not found");
      });
  }
  async function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7a36780cd7989555231b47d268f69c7f`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.name);
        let unix1=data.sys.sunrise;
        let date1=new Date(unix1*1000);
        let time1=date1.getHours()+':'+date1.getMinutes();
        let unix2=data.sys.sunset;
        let date2=new Date(unix2*1000);
        let time2=date2.getHours()+':'+date2.getMinutes();
        setCity(data.name);
        setTemp(Math.round((data.main.temp) - 273.15));
        setSky(data.weather[0].main);
        // icon();
        setObmain({
          wind: data.wind.speed,
          feellike: Math.round(data.main.feels_like - 273.15),
          sunset: time2,
          sunrise: time1,
          pressure: data.main.pressure,
          maxtemp: Math.round(data.main.temp_max - 273.15),
          mintemp: Math.round(data.main.temp_min - 273.15),
          humidity: data.main.humidity,
          // rain:data.rain
        });
        icon();

      })
      .then((res)=>{icon();})
      .catch((err) => {
        console.log(err);
        alert("Loaction not found");
      });
  }
  function icon() {
   console.log(sky);
    switch (sky) {
      case "Clear":
        if(hr>4&&hr<18){
          document.getElementById("cnt").style.backgroundImage = "url('/images/clear.jpg')";  
        setIc("sun");}
        else{
          document.getElementById("cnt").style.backgroundImage = "url('/images/clearnight.jpg')";
         setIc("moon");}
        break;
       case "Haze":
        document.getElementById("cnt").style.backgroundImage = "url('/images/haze.jpg')";
       setIc("smog");
        break;
      case "Clouds":   
        if(hr>4&&hr<18){
          document.getElementById("cnt").style.backgroundImage = "url('/images/cloud.jpg')"; 
        setIc("cloud-sun");}
        else {
          document.getElementById("cnt").style.backgroundImage = "url('/images/cloud.jpg')";setIc("cloud-moon"); 
      }
        console.log(ic);
        break;
      case "Rain":
        document.getElementById("cnt").style.backgroundImage = "url('/images/rain.jpg')";
        setIc("cloud-rain");
        break;
      case "Snow": 
      document.getElementById("cnt").style.backgroundImage = "url('/images/haze.jpg')";
        setIc("snowflake");
        break;
      case "Dust":
        setIc();
        break;
      case "Fog":
        document.getElementById("cnt").style.backgroundImage = "url('/images/haze.jpg')";
        setIc("smog");
        break;
      case "smoke":
        document.getElementById("cnt").style.backgroundImage = "url('/images/storm.jpg')";
        setIc("smog");
        break;
      case "Tornado":
        document.getElementById("cnt").style.backgroundImage = "url('/images/clearnight.jpg')";
        setIc("poo-storm");
        break;
      default:
        setIc("cloud-meatball");
    }
  }
  function date(){
    setInterval(()=>{
      let a=new Date();
      let hrs=a.getHours();
      setHr(hrs);  
      let time=hrs+':'+a.getMinutes()+':'+a.getSeconds()+' ';
      document.getElementById('tm').innerHTML=time;
    })
  }
date(); 
// icon(); 
// all_loc();
 
  return (
    <> 
      <div className="main">
        <div className="container" id="cnt">
          <div className="head">
            {/* if(window.confirm()){all_loc();} */}
            <div className="input-group ">
              <input
                type="text"
                className="form-control"
                id="cname"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
              <div className="input-group-prepend">
                <button className="btn " type="button" onClick={getlocation}>
                  &#128269;
                </button>
              </div>
            </div>
            <p onClick={all_loc} className="location">
              Turn on location
            </p>
            <p className="cname">{city_name}</p>
            <div className="middle">
              <i className={`fas fa-${ic}`}></i><span>
              <h4 className="temp">{temp}°C</h4></span>
              <p className="sky">
                {sky} {obmain.maxtemp}°C/{obmain.mintemp}°C
              </p>
            </div>
          </div>
          <div className="foot">
            <ul>
              <li>Humidity : {obmain.humidity}% </li>
              {/* <li>Rain {obmain.rain}%</li> */}
              <li>Real feel : {obmain.feellike}°</li>
              <li>pressure : {obmain.pressure}mbar</li>
            </ul>
            <span>
              <ul>
                <li>Sunrise : {obmain.sunrise}</li>
                <li>Sunset :  {obmain.sunset}</li>
              </ul>
              <ul>
                <li>Wind {obmain.wind} Km/h</li>
              </ul>
            </span>
          </div>
          <div className="time"><p id="tm"></p></div>
          
        </div>
      </div>
    </>
  );
}

export default Home;

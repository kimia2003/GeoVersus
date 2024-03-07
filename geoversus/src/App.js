import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, StreetViewPanorama } from '@react-google-maps/api';
import welcomeImage from './images/geologo.png'; // Adjust the filename and extension accordingly

import "./App.css";

const libraries = ['places'];

const mapContainerStyle = {
    width: "600px",
    height: "300px"
};

const center = {
  lat: 7.8731, // Sri Lanka latitude
  lng: 80.7718, // Sri Lanka longitude
};

const locations = [
    { name: "Seattle", lat: 47.60938630682191, lng: -122.33872169447726},
    { name: "West Hollywood", lat: 34.083650233963176, lng: -118.35512724948612 },
    { name: "London", lat: 51.50111174643269, lng: -0.10577136162671487 },
    { name: "Tokyo", lat: 35.66573721793416, lng: 139.77424247743855 },
    { name: "Dubai", lat: 25.195820211175878, lng: 55.277369469791786 },
    { name: "Jeddah", lat: 21.523915556881203, lng: 39.16336895178029 },
    { name: "Abuja", lat: 9.068533774008563, lng: 7.470567032942697 },
    { name: "Lisbon", lat: 38.695902577548395, lng: -9.207421686647791 },
    // add more locations later
];

const App = () => {
    return (
      <>
        <div>
          <LandingPage/>
        </div>
      </>
    );
};

const Map = ({ position }) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyCmmj1NWAU0BLH20V7w19PM2WwlWXSUIIE', 
      libraries,
    });

    if (loadError) {
      return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
      return <div>Loading maps</div>;
    }

    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={position}
        >
        <Marker position={position} />
        </GoogleMap>
      </div>
    );
};


const StreetView = ({ position }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCmmj1NWAU0BLH20V7w19PM2WwlWXSUIIE', 
        libraries,
    });
  
    if (loadError) {
        return <div>Error loading maps</div>;
    }
  
    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
  
    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={position}
                options={{streetViewControl: false}}>
                <StreetViewPanorama
                    visible={true}
                    mapContainerStyle={mapContainerStyle}
                    position={position}
                    options={{
                        addressControl: false, 
                        streetViewControl: false, 
                        linksControl: false,
                        panControl: false,
                        enableCloseButton: false
                    }}
                />
            </GoogleMap>
        </div>
      );
};

const LandingPage = () => {

  const [playerName, setPlayerName] = useState("");
  const [result, setResult] = useState({});
  
  const handlePlayerName = (event) => {
      event.preventDefault();
      const playerNameForm = event.target;
      setPlayerName(playerNameForm.playerNameInput.value);
  }

  const Welcome = () => {
      return (
          <div id="welcome">
            <img src={welcomeImage} alt="Welcome" />
              <h1>Hi!</h1>
              <p>What's your name?</p>
              <form onSubmit={handlePlayerName}>
                  <p>
                      <label htmlFor='playerNameInput'>PLAYER NAME:&nbsp;</label>
                      <input id='playerNameInput' type="text" autoFocus /><br />
                      <input type="submit" value="Let's get Geoguessin'!" />
                  </p>
              </form>
          </div>
      )
  };

  const submitGuess = () => {
      setResult({
          guess: "Hawaii?",
          result: "WRONG AGAIN"
      });
  };

  const Game = () => {
    const [counter, setCounter] = React.useState(60);
    const [randomLocation, setRandomLocation] = useState(null); 

    React.useEffect(() => {
      if(playerName && !result.result) {
        const randomIndex = Math.floor(Math.random() * locations.length);
        const randomLocation = locations[randomIndex];
        setRandomLocation(randomLocation);
      }
    }, [playerName, result]);

    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        setResult({
          guess: "",
          result: "TIME'S UP! YOU DIDN'T GUESS IN TIME."
        });
        clearInterval(timer); // stop the timer
      }
      return () => clearInterval(timer);
    }, [counter]);

      return (
          <div id="game">
              <h1>Hey {playerName}, we're playing!</h1>
              {randomLocation && (
                <>
                   <Map position={center}/>
                  <StreetView position={{lat: randomLocation.lat, lng: randomLocation.lng}}/>
                </>
              )}
              <p>Time: {counter} seconds</p> {/* Display timer */}
              <p>
                  <button onClick={submitGuess}>Guess now</button>
              </p>
          </div>
      );
  };

  const resetPage = () => {
      setResult({});
      setPlayerName("");
  };

  const resetGame = () => {
      setResult({});
  };

  const Result = () => {
      return (
          <>
              <h1>{result.result}</h1>
              <p>
                  <button onClick={() => resetGame()}>Play again?</button>
                  <button onClick={() => resetPage()}>Change name</button>
              </p>
          </>
      );
  };

  return (
      <div id="container">
          {playerName === "" && <Welcome />}
          {playerName !== "" && !result.result && <Game />}
          {result.result && <Result />}
      </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, StreetViewPanorama } from '@react-google-maps/api';
import "./App.css";

const libraries = ['places'];

const mapContainerStyle = {
    width: "600px",
    height: "300px"
};

const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const App = () => {
    return (
      <>
        <div>
          <LandingPage/>
        </div>
      </>
    );
};

const Map = () => {
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
          center={center}
        >
        <Marker position={center} />
        </GoogleMap>
      </div>
    );
};


const StreetView = (props) => {
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
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}
                options={{streetViewControl: false}}>
                <StreetViewPanorama
                    visible={true}
                    mapContainerStyle={mapContainerStyle}
                    position={center}
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

  const Game = (props) => {
    const [counter, setCounter] = React.useState(60);

    React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        setResult({
          guess: "",
          result: "TIME'S UP! YOU DIDN'T GUESS IN TIME."
        });
        clearInterval(timer); // Stop the timer
      }
    return () => clearInterval(timer);
  }, [counter]);

      return (
          <div id="game">
              <h1>Hey {props.playerName}, we're playing!</h1>
              <Map/>
              <StreetView/>
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
          {playerName !== "" && !result.result && <Game playerName={playerName} />}
          {result.result && <Result />}
      </div>
  );
};

export default App;

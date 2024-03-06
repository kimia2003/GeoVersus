import React from 'react';
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "./App.css";

const libraries = ['places'];

const mapContainerStyle = {
  width: '200px',
  height: '100px',
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

const LandingPage = () => {

  const [playerName, setPlayerName] = useState("");
  const [gameDetails, setGameDetails] = useState({});
  const [result, setResult] = useState({});

  const TitleBar = () => {
      return (
          <div className="title-bar">
              <p className="title-text">GeoVersus</p>
          </div>
      );
  }

  function handlePlayerName(event) {
      event.preventDefault();
      const playerNameForm = event.target;
      setPlayerName(playerNameForm.playerNameInput.value);
  }

  function Welcome() {
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
  }

  function submitGuess() {
      setResult({
          guess: "Hawaii?",
          result: "WRONG AGAIN"
      });
  }

  function Game(props) {
      return (
          <div id="game">
              <h1>Hey {props.playerName}, we're playing!</h1>
              <Map/>
              <p>
                  <button onClick={submitGuess}>Guess now</button>
              </p>
          </div>
      );
  }

  function resetPage() {
      setResult({});
      setPlayerName("");
  }

  function resetGame() {
      setResult({});
  }

  function Result() {
      return (
          <>
              <h1>{result.result}</h1>
              <p>
                  <button onClick={() => resetGame()}>Play again?</button>
                  <button onClick={() => resetPage()}>Change name</button>
              </p>
          </>
      );
  }

  return (
      <div id="container">
          <TitleBar />
          {playerName === "" && <Welcome />}
          {playerName !== "" && !result.result && <Game playerName={playerName} />}
          {result.result && <Result />}
      </div>
  );
}
export default App;
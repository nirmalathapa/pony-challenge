import React from "react";
import pony from "../img/pony.png";

export const Intro = () => (
  <div>
    <h1>Save the Pony</h1>
    <img class="start-pony" src={pony} alt="pony" />
    <ol>
      <li>Click arrow to navigate through the maze</li>
      <li>Choose the right path to get away from Domokun </li>
      <li>Target for the Finish flag to win the game</li>
    </ol>
  </div>
);

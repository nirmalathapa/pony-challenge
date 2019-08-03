const BASE_URL = "https://ponychallenge.trustpilot.com";

//const BASE_URL = "http://localhost:8080";

const createMazeURL = () => `${BASE_URL}/pony-challenge/maze`;

const getMazeURL = id => `${BASE_URL}/pony-challenge/maze/${id}`;

const createMaze = () =>
  fetch(createMazeURL(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "maze-width": 15,
      "maze-height": 25,
      "maze-player-name": "spike",
      difficulty: 1
    })
  })
    .then(res => res.json())
    .then(result => result["maze_id"]);

const getMaze = id => fetch(getMazeURL(id)).then(res => res.json());

const makeMove = (id, direction) =>
  fetch(getMazeURL(id), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      direction: direction
    })
  }).then(res => res.json());

export { createMaze, getMaze, makeMove };

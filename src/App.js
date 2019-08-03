import React, { Component } from "react";
import Cell from "./components/Cell";

import { createMaze, getMaze, makeMove } from "./apicall";
import { Pony } from "./components/Pony";
import { Domokun } from "./components/Domokun";
import { EndPoint } from "./components/EndPoint";
import { chunks } from "./Chunks";
import { ButtonStart } from "./components/ButtonStart";
import { Intro } from "./components/Intro";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze_id: null,
      mazeData: null
    };
  }

  handleStartGame = () => {
    createMaze().then(maze_id => {
      this.setState(
        {
          maze_id: maze_id
        },
        () => {
          this.updateMaze();
        }
      );
    });
  };

  wallAroundCell = cellIndex => {
    return this.state.mazeData.data[cellIndex];
  };

  updateMaze = () => {
    const mazeId = this.state.maze_id;
    getMaze(mazeId).then(res => {
      this.setState({
        mazeData: res
      });
    });
  };

  moveLeft = () => {
    makeMove(this.state.maze_id, "west").then(() => this.updateMaze());
  };

  moveRight = () => {
    makeMove(this.state.maze_id, "east").then(() => this.updateMaze());
  };

  moveUp = () => {
    makeMove(this.state.maze_id, "north").then(() => this.updateMaze());
  };

  moveDown = () => {
    makeMove(this.state.maze_id, "south").then(() => this.updateMaze());
  };

  renderCharacters = position => {
    const maze = this.state.mazeData;
    const ponyPosition = maze.pony[0];

    if (ponyPosition === position) {
      return <Pony />;
    }

    if (maze.domokun[0] === position) {
      return <Domokun />;
    }

    if (maze["end-point"][0] === position) {
      return <EndPoint />;
    }
  };

  renderNavigationButton = position => {
    const maze = this.state.mazeData;
    const ponyPosition = maze.pony[0];
    const wallsAroundPony = maze.data[ponyPosition];
    // "pony":[357],"domokun":[275],"end-point":[249]

    if (ponyPosition - 1 === position && !wallsAroundPony.includes("west")) {
      // west
      return (
        <button onClick={this.moveLeft}>
          <i className="fas fa-arrow-left" />
        </button>
      );
    }

    if (
      //east wall
      ponyPosition + 1 === position &&
      !this.wallAroundCell(position).includes("west")
    ) {
      return (
        <button onClick={this.moveRight}>
          <i className="fas fa-arrow-right" />
        </button>
      );
    }
    //north wall
    if (
      ponyPosition - 15 === position &&
      !this.wallAroundCell(ponyPosition).includes("north")
    ) {
      return (
        <button onClick={this.moveUp}>
          <i className="fas fa-arrow-up" />
        </button>
      );
    }
    //north south
    if (
      ponyPosition + 15 === position &&
      !this.wallAroundCell(position).includes("north")
    ) {
      return (
        <button onClick={this.moveDown}>
          <i className="fas fa-arrow-down" />
        </button>
      );
    }
  };

  domokunCapturedPony = () => {
    const maze = this.state.mazeData;
    const ponyPosition = maze.pony[0];
    const domokunPosition = maze.domokun[0];

    return ponyPosition === domokunPosition;
  };

  ponyReachedExit = () => {
    const maze = this.state.mazeData;
    const ponyPosition = maze.pony[0];
    const endPoint = maze["end-point"][0];
    //return true;
    return ponyPosition === endPoint;
  };

  gameOver = () => this.domokunCapturedPony() || this.ponyReachedExit();

  renderGameOver = () => (
    <div className="overlay">
      <h1>Game Over</h1>
      {this.ponyReachedExit() && <h2> You have won </h2>}
      {this.domokunCapturedPony() && <p> You are dead </p>}
      <button onClick={this.handleStartGame}>Restart</button>
    </div>
  );

  render() {
    const maze = this.state.mazeData;

    if (!maze)
      return (
        <div className="start-game">
          <Intro />
          <ButtonStart onClick={this.handleStartGame} />
        </div>
      );

    return (
      <div className="App">
        <div className="maze">
          {this.gameOver() && this.renderGameOver()}
          <div>
            {chunks(maze.data, 15).map((row, rowIndex) => (
              <div className="row">
                {row.map((item, colIndex) => (
                  <Cell wallDirections={item}>
                    <div>
                      {this.renderNavigationButton(rowIndex * 15 + colIndex)}
                      {this.renderCharacters(rowIndex * 15 + colIndex)}
                    </div>
                  </Cell>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

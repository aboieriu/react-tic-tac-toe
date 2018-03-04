import './style/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board'
import Head from './components/head';

class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            availablePlayers:['X','0']
            , history: [{
                squares: Array(9).fill(null),
              }]
            , currentPlayer:null
            , winner:null
            , stepNumber: 0
        }
    }

    componentDidMount() {
        this.setNextPlayer();
    }

    getCurrentState(){
        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
        return history[stepNumber];
    }

    refresh(){
        this.setState({
            history: [{
                squares: Array(9).fill(null),
              }]
            , currentPlayer:null
            , winner:null
            , stepNumber: 0
        })
        this.setNextPlayer();
    }

    setNextPlayer(){
        let currentPlayerIndex = this.state.availablePlayers.indexOf(this.state.currentPlayer) + 1;
        if (currentPlayerIndex > this.state.availablePlayers.length -1) {
            currentPlayerIndex = 0;
        }

        this.setState({currentPlayer:this.state.availablePlayers[currentPlayerIndex]});
    }

    handleSquareClick(i){
        let currentState = this.getCurrentState();
        const squares = currentState.squares.slice();
        if (this.state.winner != null) {
            this.refresh();
        } else {
            if (squares[i] === null) {
                squares[i]=this.state.currentPlayer;
                this.setNextPlayer();
                this.updateGameState(squares);
                this.calculateWinner(squares);
            }
        }
    }

    updateGameState(squares){
        const history = this.state.history;
        this.setState({
            history: history.concat([{
              squares: squares
            }])
            , stepNumber:history.length
        });
    }

    calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        let winner = null;

        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner=squares[a];
          }
        }

        // Determine if game is a draw
        var emptyBlock = squares.find(function(element) {
            return element === null;
        });

        if (!winner && emptyBlock === undefined) {
            winner = -1;
        }
        
        this.setState({winner:winner})
      }

      jumpTo(stepToJumpTo) {
          this.setState({
              stepNumber:stepToJumpTo
          });
      }

    render() {
        const history = this.state.history;
        const moves = history.map((step, move) => {
            let desc = "Go to game start";
            if (this.state.winner != null && move === history.length-1) {
                desc = 'Go to game end';
            } else if (move) {
                desc = 'Go to move #' + move;
            }
            
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        return (
        <div className="game">
            <div className="game-info">
                <ul>{moves}</ul>
            </div>
            <div className="game-container">
                <div className="game-head">
                    <Head currentPlayer={this.state.currentPlayer} winner={this.state.winner} />
                </div>
                <div className="game-board">
                    <Board squares={this.getCurrentState().squares} onSquareClick={(i)=> {this.handleSquareClick(i)}}/>
                </div>
            </div>
        </div>
        );
    }
}
  
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
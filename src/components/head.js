import React from 'react';

class Head extends React.Component {

    render() {
        const winner = this.props.winner;
        let gameStatus = "";
        if (winner) {
            if (winner === -1) {
                gameStatus = "Game ended. It's a draw!"
            } else {
                gameStatus = "Winner is: " + winner; 
            }
        } else {
            gameStatus = "Current player: " + this.props.currentPlayer;
        }

        return (
            <div>
                {gameStatus}
            </div>
        );
    };
}

export default Head;
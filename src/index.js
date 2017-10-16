import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//React is a declarative, efficient, and flexible JavaScript library for building user interfaces.

function Square(props) {
    return (//this is being passed to the Board component
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

//The constructor for a React component is called before it is mounted. 
//When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement
//Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
//components tells react what you want to render
//components takes param like props and returns a hirerachy of views to display via render method
class Board extends React.Component {// Board can be used like <Board /> to use independantly whever wanted
    renderSquare(i) {
        return ( //it was passed by square component function
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() { //render methos returns description of what you wnat to render and react will render that to screen (It returns react element)       
        return (//this is the JSX syntax, react will convert it to react elements
        <div> 
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}
//When you want to aggregate data from multiple children or to have two child components communicate with each other, 
//move the state upwards so that it lives in the parent component. 
//The parent can then pass the state back down to the children via props, so that the child components are always in sync with each other and with the parent.

class Game extends React.Component {
    constructor() {
      super();
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ? "Move #" + move : "Game start";
        return (
          <li key={move}>
            <a href="##" onClick={() => this.jumpTo(move)}>{desc}</a>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);

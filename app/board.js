var React = require("react");
var Engine = require("./engine");

var Square = React.createClass({
  handleClick: function (e) {
    this.props.onPlay(this.props.position);
  },
  render: function () {
    var position = this.props.position;
    var gameOver = this.props.game.isOver();

    var classes = ["square", "square" + position];
    if (Array.isArray(gameOver) && gameOver.includes(position)) {
      classes.push("winner");
    }
    classes = classes.join(" ");

    return (
      <div className={classes} onClick={this.handleClick}>
        {this.props.game.playerAt(position)}
      </div>
    );
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return Engine.createNewGame();
  },
  handlePlay: function (square) {
    this.setState(this.state.play(square));
  },
  render: function () {
    var attrs = {game:this.state, onPlay:this.handlePlay};
    return (
      <div className="board">
        <div className="row">
          <Square position={0} {...attrs} />
          <Square position={1} {...attrs} />
          <Square position={2} {...attrs} />
        </div>
        <div className="row">
          <Square position={3} {...attrs} />
          <Square position={4} {...attrs} />
          <Square position={5} {...attrs} />
        </div>
        <div className="row">
          <Square position={6} {...attrs} />
          <Square position={7} {...attrs} />
          <Square position={8} {...attrs} />
        </div>
      </div>
    );
  }
});

module.exports = Board;

'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(self, call) {
  if (!self)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true }
  });

  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var App = function (_React$ComponentApp) {
  _inherits(App, _React$ComponentApp);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$ComponentApp.call(this));

    var w = 90,
        h = 90,
        arr = [],
        size = w * h;
    for (var i = 0; i < size; i++) {
      arr.push(Math.round(Math.random()));
    }

    _this.state = {count: -1,board: arr,width: w,height: h,speed: 1,play: true};
    _this.togglePlay = _this.togglePlay.bind(_this);
    _this.clearBoard = _this.clearBoard.bind(_this);
    _this.randomBoard = _this.randomBoard.bind(_this);
    _this.speedUp = _this.speedUp.bind(_this);
    _this.slowDown = _this.slowDown.bind(_this);
    _this.makeBigger = _this.makeBigger.bind(_this);
    _this.makeSmaller = _this.makeSmaller.bind(_this);

    return _this;

  }

  //there is probably a better way to do this
  App.prototype.clearBoard = function clearBoard() {
    var size = this.state.width * this.state.height, arr = [];
    for (var i = 0; i < size; i++) {
      arr.push(0);
    }
    this.setState({ board: arr, count: 0 });
  };

  App.prototype.randomBoard = function randomBoard() {
    var size = this.state.width * this.state.height, arr = [];
    for (var i = 0; i < size; i++) {
      arr.push(Math.round(Math.random()));
    }
    this.setState({ board: arr, count: 0 });
  };

  App.prototype.togglePlay = function togglePlay() {
    this.setState({ play: !this.state.play });
  };

  App.prototype.speedUp = function speedUp() {
    if (this.state.speed > 50) {
      this.setState({ speed: this.state.speed - 50 });
    } else {
      this.setState({ speed: 1 });
    }
  };

  App.prototype.slowDown = function slowDown() {
    if (this.state.speed < 500) {
      this.setState({ speed: this.state.speed + 50 });
    }
  };

  App.prototype.makeBigger = function makeBigger() {
    if (this.state.width < 130) {
      this.setState({ width: this.state.width + 10,
        height: this.state.height + 10 }, function () {
        this.randomBoard();
      });
    }
  };

  App.prototype.makeSmaller = function makeSmaller() {
    if (this.state.width > 10) {
      this.setState({ width: this.state.width - 10,
        height: this.state.height - 10 }, function () {
        this.randomBoard();
      });
    }
  };

  App.prototype.render = function render() {
    return React.createElement('div',{ className: 'app-contain' },
      React.createElement(LifeBoard, { app: this }),
      React.createElement(Btn, { icon: 'random', name: 'RANDOM', click: this.randomBoard }),
      React.createElement(Btn, { icon: 'times', name: 'CLEAR', click: this.clearBoard }),
      React.createElement(Btn, { icon: 'search-minus', name: 'SMALLER', click: this.makeBigger }),
      React.createElement(Btn, { icon: 'search-plus', name: 'BIGGER', click: this.makeSmaller }),
      React.createElement(Btn, { icon: 'angle-double-left', name: 'SLOW', click: this.slowDown }),
      React.createElement(Btn, { icon: 'angle-double-right', name: 'FAST', click: this.speedUp }),
      React.createElement(Btn, { icon: 'play/pause', name: 'PLAY', playing: this.state.play, click: this.togglePlay }),
      React.createElement(Counter, { count: this.state.count })
    );
  };

  return App;
}(React.Component);

var Btn = function (_React$ComponentBtn) {
  _inherits(Btn, _React$ComponentBtn);

  function Btn() {
    _classCallCheck(this, Btn);

    return _possibleConstructorReturn(this, _React$ComponentBtn.apply(this, arguments));
  }

  Btn.prototype.render = function render() {
    var icon = this.props.icon;
    if (icon == 'play/pause') {
      icon = this.props.playing == true ? 'pause' : 'play';
    }
    return React.createElement('div',{ className: 'btn', onClick: this.props.click },
      React.createElement('i', { className: 'fa fa-' + icon })
    );
  };

  return Btn;
}(React.Component);

var Counter = function (_React$ComponentCntr) {
  _inherits(Counter, _React$ComponentCntr);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, _React$ComponentCntr.apply(this, arguments));
  }

  Counter.prototype.render = function render() {
    return React.createElement('div',{ className: 'counter' },
      React.createElement('p',null,this.props.count)
    );
  };

  return Counter;
}(React.Component);

var LifeBoard = function (_React$ComponentLB) {
  _inherits(LifeBoard, _React$ComponentLB);

  function LifeBoard() {
    _classCallCheck(this, LifeBoard);

    var _this = _possibleConstructorReturn(this, _React$ComponentLB.call(this));

    _this.updateBoard = _this.updateBoard.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  LifeBoard.prototype.updateBoard = function updateBoard() {
    var board = this.props.app.state.board,
        width = this.props.app.state.width,
        height = this.props.app.state.height,
        next = [],
        //next step of board
    x = 0,
        y = 0;
    for (var i = board.length - 1; i >= 0; i--) {
      var nCount = 0;
      nCount = getNeighborCount(i, width);
      if (board[i] >= 1) {
        //rules for living cells
        if (nCount < 2) {
          next.unshift(0); //dead
        } else if (nCount < 4) {
            next.unshift(1); //alive
        } else {
          next.unshift(0); //dead
        }
      } else if (nCount == 3) {
        next.unshift(1); //alive
      } else {
        next.unshift(0); //dead
      }
    }
    this.timer = false;
    this.props.app.setState({ board: next, count: this.props.app.state.count + 1 });

    function getNeighborCount(i, width) {
      var count = 0; //total number of neighbors

      //up/down
      if (board[i - width] >= 1) count++; //up
      if (board[i + width] >= 1) count++; //down
      //on the right
      if (i % width != width - 1) {
        //on right edge
        if (board[i + 1] >= 1) count++; //right
        if (board[i - width + 1] >= 1) count++; //upper-right
        if (board[i + width + 1] >= 1) count++; //lower-right
      }
      //on the left
      if (i % width != 0) {
        //on left edge
        if (board[i - 1] >= 1) count++; //left
        if (board[i - width - 1] >= 1) count++; //upper-left
        if (board[i + width - 1] >= 1) count++; //lower-left
      }
      return count;
    }
  };

  LifeBoard.prototype.getX = function getX(i, width) {return i % width;};

  LifeBoard.prototype.getY = function getY(i, width) {return Math.floor(i / width);};

  LifeBoard.prototype.paint = function paint() {
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    var board = this.props.app.state.board,
        width = this.props.app.state.width,
        height = this.props.app.state.height,
        x = 0,
        y = 0;
    ctx.clearRect(0, 0, width, height);
    for (var i = board.length - 1; i >= 0; i--) {
      if (board[i] == 1) {
        y = this.getY(i, width);
        x = this.getX(i, width);
        // ctx.fillStyle = '#11bb55';
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  LifeBoard.prototype.handleClick = function handleClick(e) {
    //calculates click x and y....
    var canvas = ReactDOM.findDOMNode(this),
        rect = canvas.getBoundingClientRect(),
        //REKT
    pxX = e.clientX - rect.left - 2,
        //2 for border
    pxY = e.clientY - rect.top - 2,
        cWidth = this.props.app.state.width,
        cHeight = this.props.app.state.height,
        x = undefined,
        y = undefined;
    x = Math.floor(pxX / rect.width * cWidth);
    y = Math.floor(pxY / rect.width * cHeight);
    console.log(x, y);
    if (x >= 0 && y >= 0) {
      //puts that ish into our data...
      var i = y * cWidth + x,
          board = this.props.app.state.board.slice(),
          data = board[i] == 0 ? 1 : 0; //if 0, 1-- if 1, 0
      board.splice(i, 1, data);

      this.props.app.setState({ board: board });
    }
  };

  LifeBoard.prototype.componentDidMount = function componentDidMount() {
    this.paint();
    this.props.app.setState({ count: 0 }); //lol just to force update whoo
  };

  LifeBoard.prototype.componentDidUpdate = function componentDidUpdate() {
    this.paint();
    if (this.props.app.state.play && !this.timer) {
      this.timer = window.setTimeout(this.updateBoard, this.props.app.state.speed);
    }
  };

  LifeBoard.prototype.render = function render() {
    return React.createElement('canvas', { width: this.props.app.state.width + 'px',
      height: this.props.app.state.height + 'px',
      onClick: this.handleClick });
  };

  return LifeBoard;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

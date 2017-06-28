var sgSounds = {
    _buttons: [
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    ],

    _error: new Audio('http://www.oringz.com/oringz-uploads/sounds-1038-jammed.mp3'),

    _win: new Audio('http://www.oringz.com/oringz-uploads/31_oringz-pack-nine-15.mp3'),

    playButton: function (button) {
        if (parseInt(button) > this._buttons.length - 1) {
            return;
        }
        this._buttons[button].play();
    },

    playError: function () {
        this._error.play();
    },

    playWin: function () {
        this._win.play();
    }
};

var sgCounter = {
    _text: {
        attention: '!!'
    },

    _classNames: {
        attention: 'sg-count__value-attention',
        error: 'sg-count__value-error',
        win: 'sg-count__value-win'
    },

    _value: '00',

    _setValue: function (value) {
        if (parseInt(value) < 10) {
            this._value = '0' + value;
        } else {
            this._value = value;
        }
    },

    _do: function (operation) {
        var container = $('.sg-count__value'),
            text = '',
            className = '';

        switch (operation) {
            case 'error':
                text = this._text.attention;
                className = this._classNames.attention + ' ' + this._classNames.error;
                break;
            case 'win':
                text = this._text.attention;
                className = this._classNames.attention + ' ' + this._classNames.win;
                break;
            case 'reset':
                container
                    .text(this._value)
                    .removeClass(this._classNames.attention + ' ' + this._classNames.error + ' ' + this._classNames.win);
                return;
                break;
            case 'change':
                container
                    .text(this._value);
                return;
                break;
        }

        container
            .text(text)
            .addClass(className);
    },

    error: function () {
        this._do('error');
    },

    win: function () {
        this._do('win');
    },

    reset: function (value) {
        if (typeof value !== 'undefined') {
            this._setValue(value);
        }
        this._do('reset');
    },

    change: function (value) {
        this._setValue(value);
        this._do('change');
    }
};

var sgStatus = {

    _text: {
        turn: 'Your turn',
        error: 'Wrong!',
        win: 'You won!'
    },
    _classNames: {
        show: 'sg-status-show',
        error: 'sg-status-error',
        win: 'sg-status-win'
    },

    _do: function (operation) {
        var element = $('.sg-status'),
            text = '',
            className = '';

        switch (operation) {
            case 'turn':
                text = this._text.turn;
                className = this._classNames.show;
                break;
            case 'error':
                text = this._text.error;
                className = this._classNames.show + ' ' + this._classNames.error;
                break;
            case 'win':
                text = this._text.win;
                className = this._classNames.show + ' ' + this._classNames.win;
                break;
            case 'hide':
                element
                    .removeClass(this._classNames.show + ' ' + this._classNames.error + ' ' + this._classNames.win);

                setTimeout(function () {
                    element
                        .text('');
                }, 600);
                return;
                break;
        }
        element
            .text(text)
            .addClass(className);
    },

    turn: function () {
        this._do('turn');
    },

    error: function () {
        this._do('error');
    },

    win: function () {
        this._do('win');
    },

    hide: function () {
        this._do('hide');
    }
};

var sgBoard = {
    _classNames: {
        clickable: 'sg-board__button-clickable',
        zoom: 'sg-board__button-zoom'
    },

    _currentButtonIndex: 0,

    _do: function (operation) {
        var container = $('.sg-board__button');

        switch (operation) {
            case 'clickable':
                container.addClass(this._classNames.clickable);
                break;
            case 'unclickable':
                container.removeClass(this._classNames.clickable);
                break;
            case 'zoomIn':
                container
                    .eq(this._currentButtonIndex)
                    .addClass(this._classNames.zoom);
                break;
            case 'zoomOut':
                container
                    .eq(this._currentButtonIndex)
                    .removeClass(this._classNames.zoom);
                break;
        }
    },

    animationTime: 300,

    makeClickable: function () {
        this._do('clickable');
    },

    makeUnclickable: function () {
        this._do('unclickable');
    },

    zoom: function (index, human) {
        var $this = this;

        if (human) {
            this._do('unclickable');
        }
        this._currentButtonIndex = index;
        this._do('zoomIn');

        setTimeout(function () {
            $this._do('zoomOut');
        }, this.animationTime);

        if (human) {
            setTimeout(function () {
                $this._do('clickable');
            }, (this.animationTime * 2));
        }
    }
};

var sgInfo = {
    playerTurn: function () {
        sgStatus.turn();
    },

    hideStatus: function () {
        sgStatus.hide();
    },

    changeCount: function (count) {
        sgCounter.change(count);
    },

    error: function () {
        sgStatus.error();

        sgCounter.error();

        setTimeout(function () {
            sgStatus.hide();
            sgCounter.reset();
        }, 1500);
    },

    reset: function () {
        sgStatus.hide();
        sgCounter.reset(0);
    },

    win: function () {
        var $this = this;

        sgStatus.win();
        sgCounter.win();

        setTimeout(function () {
            $this.reset();
        }, 3000);
    }

};

var sgHint = {

    _getHintBlock: function (index) {
        return '<div class="sg-color-' + (index + 1) + '"></div>'
    },

    toggleShow: function (forceHide) {
        var button = $('.sg-hint__show'),
            buttonActiveClassName = 'sg-hint__show-active',
            data = $('.sg-hint__data'),
            dataOpenClassName = 'sg-hint__data-open';


        if (!forceHide) {
            button.toggleClass(buttonActiveClassName);
            data.toggleClass(dataOpenClassName);
        } else {
            button.removeClass(buttonActiveClassName);
            data.removeClass(dataOpenClassName);
        }
    },

    _do: function (who, operation, index) {
        var container = who === 'player' ? $('.sg-hint__moves-player') : $('.sg-hint__moves-computer');

        if (operation === 'add') {
            container.append(this._getHintBlock(index))
        } else if (operation === 'clean') {
            container.find('div').remove();
        }
    },
    computer: function (operation, index) {
        this._do('computer', operation, index);
    },

    player: function (operation, index) {
        this._do('player', operation, index);
    }
};


var sgLogic = {
    sequence: [],

    step: function () {
        return this.sequence.length
    },

    playerProgress: 0,
    stepsForWin: 20,

    isGameOn: false,
    isPlayerTurn: false,
    isStrict: false,
    isBusy: false,


    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    makeButtonsUnclickable: function () {
        sgBoard.makeUnclickable();
        this.isBusy = true;
    },

    makeButtonsClickable: function () {
        sgBoard.makeClickable();
        this.isBusy = false;
    },

    computerMove: function () {
        var $this = this;

        sgInfo.hideStatus();

        $this.makeButtonsUnclickable();

        var turn = $this.random(0, 3);
        $this.sequence.push(turn);

        sgInfo.changeCount($this.step());

        setTimeout(function () {
            $this.showComputerMoves();
        }, 700);
    },

    showComputerMoves: function (index) {
        index = index || 0;

        if (!index) {
            sgHint.computer('clean');
        }

        var $this = this,
            lastCall = typeof $this.sequence[index + 1] === 'undefined';

        sgSounds.playButton(this.sequence[index]);
        sgBoard.zoom(this.sequence[index]);

        sgHint.computer('add', $this.sequence[index]);

        setTimeout(function () {
            if (lastCall) {
                $this.preparePlayerMove();
            } else {
                $this.showComputerMoves(index + 1)
            }
        }, 700);

    },

    preparePlayerMove: function () {
        sgInfo.playerTurn();
        this.makeButtonsClickable();
    },

    playerMove: function (index) {
        if (this.isBusy || !this.isGameOn) {
            return;
        }

        sgSounds.playButton(index);
        sgBoard.zoom(index, true);

        sgHint.player('add', index);

        this.checkPlayerMove(index);

    },

    checkPlayerMove: function (value) {

        if (this.sequence[this.playerProgress] === value) {
            this.playerMoveIsCorrect();
        } else if (this.isStrict) {
            this.wrongPlayerTurnStrict();
        } else {
            this.wrongPlayerTurn();
        }
    },

    playerMoveIsCorrect: function () {
        if (this.playerProgress === (this.sequence.length - 1)) {
            this.allPlayerMovesAreCorrect();
        } else {
            this.playerProgress++;
        }
    },

    allPlayerMovesAreCorrect: function () {
        var $this = this;

        if ($this.playerProgress === ($this.stepsForWin - 1)) {

            setTimeout(function () {
                $this.playerWon();
            }, 1500);
            return;
        }

        $this.makeButtonsUnclickable();

        setTimeout(function () {
            $this.playerProgress = 0;
            sgHint.player('clean');

            $this.computerMove();
        }, 1500);
    },

    wrongPlayerTurn: function () {
        var $this = this;

        sgInfo.error();
        sgSounds.playError();

        this.makeButtonsUnclickable();

        setTimeout(function () {
            $this.playerProgress = 0;
            sgHint.player('clean');

            $this.showComputerMoves();
        }, 2500);

    },

    wrongPlayerTurnStrict: function () {

        var $this = this;

        sgInfo.error();
        sgSounds.playError();

        setTimeout(function () {
            $this.gameReset();
        }, 2500);
    },

    playerWon: function () {
        var $this = this;

        sgInfo.win();
        sgSounds.playWin();

        setTimeout(function () {
            $this.gameOnOf();
        }, 3000);
    },

    boardReset: function () {
        this.sequence = [];
        this.isPlayerTurn = false;
        this.playerProgress = 0;

        sgBoard.makeUnclickable();
        sgInfo.reset();

        sgHint.computer('clean');
        sgHint.player('clean');

        sgHint.toggleShow(true);
    },

    gameStrict: function () {
        if (!this.isGameOn) {
            return;
        }

        var button = $('.sg-controls__strict'),
            activeClassName = 'sg-controls__button-active';

        if (this.isStrict) {
            this.isStrict = false;
            button.removeClass(activeClassName);
        } else {
            this.isStrict = true;
            button.addClass(activeClassName);
        }
    },

    gameReset: function () {

        var $this = this;

        if ($this.isBusy) {
            return;
        }

        $this.boardReset();

        setTimeout(function () {
            $this.computerMove();
        }, 1500);

    },

    gameOnOf: function () {

        if (this.isBusy) {
            return;
        }

        var onOfButton = $('.sg-controls__start'),
            activeClassName = 'sg-controls__button-active';

        if (this.isGameOn) {
            this.isGameOn = false;
            this.boardReset();
            onOfButton.removeClass(activeClassName);
        } else {
            this.isGameOn = true;
            onOfButton.addClass(activeClassName);
            this.computerMove();
        }
    }
};


$('.sg-board__button').click(function () {
    sgLogic.playerMove($(this).index());
});


$('.sg-controls__start').click(function () {
    sgLogic.gameOnOf();

});

$('.sg-controls__reset').click(function () {
    sgLogic.gameReset();
});

$('.sg-controls__strict').click(function () {
    sgLogic.gameStrict();
});

$('.sg-hint__show').click(function () {
    sgHint.toggleShow();
});
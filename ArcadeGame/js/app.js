
/* Global variables */
window.lives = 5;
window.points = 0;
window.gamesWon = 0;
window.gamesLost = 0;

/* Class Enemy*/
class Enemy {
    constructor(x, y, speed)
    {
        this.speed = Math.round(Math.random() * 3) + 1;

        setTimeout(() => {
            this.x = x;
            this.y = y;
        }, this.speed * 100);

        this.avatar = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x = (this.x + dt * this.speed * 150) % (500)
    }

    render ()  {
        ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
    }

    reset (){
        this.speed = Math.round(Math.random() * 3) + 1;
    }
}

/* Class Player */
class Player {
    constructor(x, y) {
        this.avatar = 'images/char-boy.png';
        this.x = 2 * 101;
        this.y = 5 * 80;
    }


    update() {
    }

    render() {
        ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
    }

    handleInput(userInput) {
        switch (userInput) {
            case KeyType.Left:
                if (this.x >= 0) { this.x -= 101; }
                break;
            case KeyType.Right:
                if (this.x < 305) { this.x += 101; }
                break;
            case KeyType.Down:
                if (this.y < 320) { this.y += 83; }
                break;
            case KeyType.Up:
                if (this.y > 0) { this.y -= 83; }

                if (this.y < 0) {
                    // Award the player 10 points
                    points += 10
                    updateCells('.pointsvalue', points);

                    // check if the accumulation of points equal to 20 points
                    if (window.points == 20) {
                        // Display winning Message and then reset all values
                        window.gamesWon += 1;
                        window.points = 0;
                        window.lives = 5;

                        // Show the number of lives.
                        updateCells('.livesvalue', window.lives);

                        // Update Games won:
                        updateCells('.wonvalue', window.gamesWon);
                    }

                    player.reset();
                }
                break;
        }
    }

    reset() {
        this.x = 201;
        this.y = 400;
    }
}

function updateCells(className, value)
{
    let divSelected = document.querySelector(className);
    divSelected.textContent = value;
}


var bug1 = new Enemy(-80, 66, Math.round(Math.random() * 2));
var bug2 = new Enemy(-80, 149, Math.round(Math.random() * 3));
var bug3 = new Enemy(-80, 232, Math.round(Math.random() * 2));

window.allEnemies = [bug1, bug2, bug3];

var player = new Player();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
});

/* KeyType class */
class KeyType {};
KeyType.Right = 'right';
KeyType.Left = 'left';
KeyType.Up = 'up';
KeyType.Down = 'down';

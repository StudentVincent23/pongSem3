import { getCookie,updateCookie } from './cookies';

const squares: { pos: { x: number, y: number }, size: number, visible: boolean }[] = [];
const numSquares: number = 7; // Number of squares to generate
const sizeSquares: number = 5; // Size of each square

const keysPressed: boolean[] = [];
const KEY_UP: number = 38;
const KEY_DOWN: number = 40;
const KEY_W: number = 87;
const KEY_S: number = 83;

// send data to database
import { sendWebsocket } from './websocket';
const socket = new WebSocket('ws://localhost:5080/websocket');
function updateDataBaseScore(newHighScore :any):void {
    const playerScore = getCookie("playerHighscore");
    if (playerScore !== null) {
        const score = parseInt(playerScore);

        if (score < newHighScore) {
            const playerName = getCookie("playerName");
            const highScoreMsg = "P" + " " + playerName + " " + newHighScore;
            
            updateCookie('playerHighscore', newHighScore);
            sendWebsocket(socket, highScoreMsg);
        }
    }
}
// send data to database

window.addEventListener('keydown', function (e: KeyboardEvent) {
    keysPressed[e.keyCode] = true;
});

window.addEventListener('keyup', function (e: KeyboardEvent) {
    keysPressed[e.keyCode] = false;
});

interface PongObject {
    pos: { x: number, y: number };
    velocity: { x: number, y: number };
    radius: number;
    update: (canvas: HTMLCanvasElement) => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
}

class Pong implements PongObject {
    pos: { x: number; y: number };
    velocity: { x: number; y: number };
    radius: number;

    constructor(pos: { x: number, y: number }, velocity: { x: number, y: number }, radius: number) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = radius;
    }

    update(canvas: HTMLCanvasElement): void {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        // kaats van de muur
        if (this.pos.y + this.radius > canvas.height || this.pos.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

interface PaddleObject { // kan ook zonder echter voor toekomst mss handig voor data transfer
    pos: { x: number; y: number };
    velocity: { x: number; y: number };
    width: number;
    height: number;
    score: number;

    update: (canvas: HTMLCanvasElement) => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
    getHalfWidth: () => number;
    getHalfHeight: () => number;
    getCenter: () => { x: number; y: number };
}

class Paddle implements PaddleObject {
    pos: { x: number; y: number };
    velocity: { x: number; y: number };
    width: number;
    height: number;
    score: number;
    id: string;
    

    constructor(pos: { x: number; y: number }, velocity: { x: number; y: number }, width: number, height: number,  id: string) {
        this.pos = pos;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.score = 0;
        this.id = id;
    }

    update(canvas: HTMLCanvasElement): void {
        if (this.id === 'player1') {
            if (keysPressed[KEY_UP]) {
                this.pos.y -= this.velocity.y;
            } else if (keysPressed[KEY_DOWN]) {
                this.pos.y += this.velocity.y;
            }
        } else if (this.id === 'player2') {
            if (keysPressed[KEY_W]) {
                this.pos.y -= this.velocity.y;
            } else if (keysPressed[KEY_S]) {
                this.pos.y += this.velocity.y;
            }
        }

        // Check for wall collision
        if (this.pos.y < 0) { // Hit the top wall
            this.pos.y = 0;
        } else if (this.pos.y + this.height > canvas.height) { // Hit the bottom wall
            this.pos.y = canvas.height - this.height;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#33ff00";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    getHalfWidth(): number {
        return this.width / 2;
    }

    getHalfHeight(): number {
        return this.height / 2;
    }

    getCenter(): { x: number; y: number } {
        return { x: this.pos.x + this.getHalfWidth(), y: this.pos.y + this.getHalfHeight() };
    }
}

function pongPaddleCollision(pong: Pong, paddle: Paddle): void {
    const dx: number = Math.abs(pong.pos.x - paddle.getCenter().x);
    const dy: number = Math.abs(pong.pos.y - paddle.getCenter().y);

    if (dx <= pong.radius + paddle.getHalfWidth() && dy <= pong.radius + paddle.getHalfHeight()) {
        // Adjust pong's position
        if (pong.velocity.x > 0) {
            pong.pos.x = paddle.pos.x - pong.radius;
        } else {
            pong.pos.x = paddle.pos.x + paddle.width + pong.radius;
        }

        // Calculate the difference from the paddle's center
        const distanceFromCenter = pong.pos.y - paddle.getCenter().y;
        const normalizedDistance = distanceFromCenter / paddle.getHalfHeight(); // Normalize the distance

        // Calculate the current speed (magnitude of velocity vector)
        const speed = Math.sqrt(pong.velocity.x * pong.velocity.x + pong.velocity.y * pong.velocity.y);

        // Adjust the velocity direction based on the hit position
        const maxBounceAngle = Math.PI / 4; // 45 degrees
        const bounceAngle = normalizedDistance * maxBounceAngle;

        // Reverse the horizontal direction
        const newVelocityX = -Math.sign(pong.velocity.x) * Math.cos(bounceAngle) * speed;
        const newVelocityY = Math.sin(bounceAngle) * speed;

        // Apply the new velocities
        pong.velocity.x = newVelocityX;
        pong.velocity.y = newVelocityY;

        // Ensure the ball doesn't get stuck with a zero vertical velocity
        if (Math.abs(pong.velocity.y) < 0.1) {
            pong.velocity.y = Math.sign(pong.velocity.y) * 0.1;
        }
    }
}

function respawnBall(pong: Pong, canvas: HTMLCanvasElement): void {
    if (pong.velocity.x > 0) {
        pong.pos.x = canvas.width - 150;
        pong.pos.y = (Math.random() * (canvas.height - 200)) + 100;
    }

    if (pong.velocity.x < 0) {
        pong.pos.x = 150;
        pong.pos.y = (Math.random() * (canvas.height - 200)) + 100;
    }

    pong.velocity.x *= -1;
    pong.velocity.y *= -1;
}

function increaseScore(pong: Pong, paddle1: Paddle, paddle2: Paddle, canvas: HTMLCanvasElement): void {
    if (pong.pos.x <= -pong.radius) {
        paddle2.score += 1;
        respawnBall(pong, canvas);

        document.getElementById("player2Score")!.innerHTML = paddle2.score.toString();
    }

    if (pong.pos.x >= canvas.width + pong.radius) {
        paddle1.score += 1;
        respawnBall(pong, canvas);

        updateDataBaseScore(paddle1.score);

        document.getElementById("player1Score")!.innerHTML = paddle1.score.toString();
    }
}

function player2AI(pong: Pong, paddle: Paddle, canvas: HTMLCanvasElement): void {
    if (pong.velocity.x > 0) {
        if (pong.pos.y > paddle.pos.y) {
            paddle.pos.y += paddle.velocity.y;
            if (paddle.pos.y + paddle.height >= canvas.height) {
                paddle.pos.y = canvas.height - paddle.height;
            }
        }

        if (pong.pos.y < paddle.pos.y) {
            paddle.pos.y -= paddle.velocity.y;
            if (paddle.pos.y <= 0) {
                paddle.pos.y = 0;
            }
        }
    }
}

function player2AIWorse(pong: Pong, paddle: Paddle, canvas: HTMLCanvasElement): void {
    // Randomly decide whether to move the paddle or not
    const randomChance = Math.random();

    // Only move the paddle if the random chance is below a certain threshold
    if (randomChance < 0.7) {
        if (pong.velocity.x > 0) {
            // Move the paddle towards the ball's y position
            if (pong.pos.y > paddle.pos.y) {
                paddle.pos.y += paddle.velocity.y;
                if (paddle.pos.y + paddle.height >= canvas.height) {
                    paddle.pos.y = canvas.height - paddle.height;
                }
            } else if (pong.pos.y < paddle.pos.y) {
                paddle.pos.y -= paddle.velocity.y;
                if (paddle.pos.y <= 0) {
                    paddle.pos.y = 0;
                }
            }
        }
    }
}



function generateSquares(canvas: HTMLCanvasElement, squares: { pos: { x: number; y: number }; size: number; visible: boolean }[]): void {
    // Check if the squares array is empty
    if (squares.length === 0) {
        // If empty, generate new squares
        for (let i = 0; i < numSquares; i++) {
            const square = {
                pos: {
                    x: Math.random() * (canvas.width - sizeSquares),
                    y: Math.random() * (canvas.height - sizeSquares)
                },
                size: sizeSquares,
                visible: true // Set to false if you want to hide squares initially
            };
            squares.push(square);
        }
    } else {
        // If not empty, generate a new square
        const newSquare = {
            pos: {
                x: Math.random() * (canvas.width - sizeSquares),
                y: Math.random() * (canvas.height - sizeSquares)
            },
            size: sizeSquares,
            visible: true
        };
        squares.push(newSquare);
    }
}


function drawSquares(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#ffff00"; // Yellow color for squares
    squares.forEach(square => {
        if (square.visible) {
            ctx.fillRect(square.pos.x, square.pos.y, square.size, square.size);
        }
    });
}

function checkSquareCollision(
    canvas: HTMLCanvasElement, 
    pong: PongObject, 
    paddle1: PaddleObject, 
    paddle2: PaddleObject, 
    squares: { pos: { x: number; y: number }; size: number; visible: boolean }[]): void {
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        if (
            pong.pos.x + pong.radius >= square.pos.x &&
            pong.pos.x - pong.radius <= square.pos.x + square.size &&
            pong.pos.y + pong.radius >= square.pos.y &&
            pong.pos.y - pong.radius <= square.pos.y + square.size
        ) {
            squares.splice(i, 1);
            generateSquares(canvas, squares);
            activeSquare(pong, paddle1, paddle2, squares, canvas, generateSquares);
        }
    }
}

// helper function randomInt
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function activeSquare(
     pong: { radius: number, velocity: { x: number, y: number } },
     paddle1: { height: number; velocity: { x: number; y: number } },
     paddle2: { height: number; velocity: { x: number; y: number } },
     squares: { pos: { x: number; y: number }; size: number; visible: boolean }[],
     canvas: HTMLCanvasElement,
     generateSquares: (canvas: HTMLCanvasElement, squares: { pos: { x: number; y: number }; size: number; visible: boolean }[]) => void
): void {
    switch (getRandomInt(0, 13)) {
        case 0:
            paddle1.height += 2;
            paddle2.height += 2;
            break;
        case 1:
            paddle1.height -= 2;
            paddle2.height -= 2;
            break;
        case 2:
            pong.radius += 1;
            break;
        case 3:
            pong.radius -= 1;
            break;
        case 4:
            // up is down and down is up
            paddle1.velocity.y *= -1;
            // paddle2.velocity.y *= -1; // ai kan dit nog niet hebben
            break;
        case 5:
            // Speed up pong
            pong.velocity.x *= 1.05;
            pong.velocity.y *= 1.05;
            break;
        case 6:
            // Slow down pong
            pong.velocity.x *= 0.95;
            pong.velocity.y *= 0.95;
            break;
        case 7:
            // Bounce off buff
            pong.velocity.x *= -1;
            pong.velocity.y *= -1;
            break;
        case 8:
            // Generate new squares
            generateSquares(canvas, squares);
            generateSquares(canvas, squares);
            break;
        case 9:
            // Remove squares
            if (squares.length > 0) {
                squares.pop(); // Remove the last square from the array
            }
            break;
        case 10:
            // Increase square sizes
            squares.forEach(square => {
                square.size += 1;
            });
            break;
        case 11:
            // Decrease square sizes
            squares.forEach(square => {
                square.size -= 1;
            });
            break;
        case 12:
            // do nothing
            break;
        default:
            break;
    }

    // Safety checks and adjustments
    if (paddle1.height > 400) {
        paddle1.height = 400;
        paddle2.height = 400;
    } else if (paddle1.height < 20) {
        paddle1.height = 20;
        paddle2.height = 20;
    } else if (pong.radius > 75) {
        pong.radius = 50;
    } else if (pong.radius < 5) {
        pong.radius = 5;
    } else if (squares.length > 15) {
        for (let i = 0; i < squares.length - 15; i++) {
            squares.pop();
        }
        squares.pop(); // Remove the last square from the array
    } else if (squares.length < numSquares) {
        generateSquares(canvas, squares);
    }
}

function vec2(x: number, y: number): { x: number, y: number } { // helper voor 2D vectors
    return { x: x, y: y };
}

export function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const pong = new Pong(vec2(canvas.width / 2, canvas.height / 2), vec2(1, 1), 5);
    const paddle1 = new Paddle(vec2(0, 50), vec2(1, 1), 5, 30, 'player1');
    const paddle2 = new Paddle(vec2(canvas.width - 5, 50), vec2(1, 1), 5, 30, 'nvt');

    if (getCookie('player2WS') === 'true') {
        paddle2.id = 'player2';
    }

    if (getCookie('buffsEnabled') == 'true') {
        generateSquares(canvas, squares);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameDraw(canvas, ctx, pong, paddle1, paddle2);
        gameUpdate(canvas, pong, paddle1, paddle2);
        
        if (getCookie('pcEnabled') === 'true') {
            player2AI(pong, paddle2, canvas);
        }

        if (getCookie('pcBadEnabled') === 'true') {
            player2AIWorse(pong, paddle2, canvas);
        }

        if (getCookie('buffsEnabled') == 'true') {
            drawSquares(ctx);
            checkSquareCollision(canvas, pong, paddle1, paddle2, squares); // als ai aan staat moet up is down paddle 2 ook aan gaan case 4
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

function gameUpdate(canvas: HTMLCanvasElement, pong: Pong, paddle1: Paddle, paddle2: Paddle): void {
    pong.update(canvas);
    paddle1.update(canvas); // player 1
    paddle2.update(canvas);
    pongPaddleCollision(pong, paddle1);
    pongPaddleCollision(pong, paddle2);
    increaseScore(pong, paddle1, paddle2, canvas);
}

function gameDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, pong: Pong, paddle1: Paddle, paddle2: Paddle): void {
    pong.draw(ctx);
    paddle1.draw(ctx);
    paddle2.draw(ctx);
}


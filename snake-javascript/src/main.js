const GRID = 20;
const CELL = 400 / GRID;
const board = document.getElementById('game');
const context = board.getContext('2d');

let facing = { x: 1, y: 0 };
let snake = [{ x: GRID / 2, y: GRID / 2 }];
let gameOver = false;
let lastTick = 0;
const TICK_MS = 150;

document.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowUp':
			facing = { x: 0, y: -1 }
			break;
		case 'ArrowDown':
			facing = { x: 0, y: 1 }
			break;
		case 'ArrowLeft':
			facing = { x: -1, y: 0 }
			break;
		case 'ArrowRight':
			facing = { x: 1, y: 0 }
			break;
	}
});

document.addEventListener('keydown', () => {
	if (gameOver) reset();
});


function update() {
	if (gameOver) return;

	let head = { x: snake[0].x + facing.x, y: snake[0].y + facing.y }

	if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
		gameOver = true;
		return;
	}

	snake.unshift(head);
}

function reset() {
	facing = { x: 1, y: 0 };
	snake = [{ x: GRID / 2, y: GRID / 2 }];
	gameOver = false;
}

function draw() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, 400, 400);

	if (gameOver) {
		context.fillStyle = 'white';
		context.font = 'bold 32px monospace';
		context.textAlign = 'center';
		context.fillText('GAME OVER', 200, 180);
		context.font = '14px monospace';
		context.fillStyle = 'grey';
		context.fillText('press any key to restart', 200, 255);
		context.textAlign = 'left';
		return;
	}

	context.fillStyle = 'lime';
	for (const s of snake) {
		context.fillRect(s.x * CELL, s.y * CELL, CELL, CELL);
	}
}

function loop(timestamp) {
	if (timestamp - lastTick >= TICK_MS) {
		update();
		lastTick = timestamp;
	}
	draw();
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
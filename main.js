"use strict";

///////////////////////////////////////////////////////////

const canvas = {
	init() {
		this.elem = document.querySelector("canvas");
		this.resize();
		window.addEventListener("resize", () => this.resize(), false);
		return this.elem.getContext("2d");
	},
	resize() {
		this.width = this.elem.width = this.elem.offsetWidth;
		this.height = this.elem.height = this.elem.offsetHeight;
	},
	clear() {
		ctx.clearRect(0, 0, this.width, this.height);
	}
};

///////////////////////////////////////////////////////////

const pointer = {
	x: 100,
	y: 200,
	init() {
		window.addEventListener("pointermove", (e) => this.move(e), false);
	},
	move(e) {
		this.x = e.clientX;
		this.y = e.clientY;
	}
};

///////////////////////////////////////////////////////////////

const Node = class {
	constructor() {
		this.x = 0;
		this.y = 0;
	}
	follow(that) {
		const dx = that.x - this.x;
		const dy = that.y - this.y;
		that.x -= dx * 0.6;
		that.y -= dy * 0.6;
		this.draw();
	}
	copy(that, dx, dy) {
		this.x = dx * that.x;
		this.y = dy * that.y;
		this.draw();
	}
	inv(that) {
		this.x = that.y;
		this.y = that.x;
		this.draw();
	}
	draw() {
		ctx.drawImage(
			sprite,
			canvas.width * 0.5 + this.x - rad,
			canvas.height * 0.5 + this.y - rad,
			2 * rad,
			2 * rad
		);
	}
};

///////////////////////////////////////////////////////////

const run = () => {
	requestAnimationFrame(run);
	canvas.clear();
	pointer.node.x = pointer.x - canvas.width * 0.5;
	pointer.node.y = pointer.y - canvas.height * 0.5;
	pointer.node.follow(nodes[0]);
	for (let i = 0; i < len; i++) nodes[i].follow(nodes[i + 1]);
	for (let i = len; i < 2 * len; i++)
		nodes[i].copy(nodes[i - len], 1, -1);
	for (let i = 2 * len; i < 3 * len; i++)
		nodes[i].copy(nodes[i - 2 * len], -1, 1);
	for (let i = 3 * len; i < 4 * len; i++)
		nodes[i].copy(nodes[i - 3 * len], -1, -1);
	for (let i = 4 * len; i < 8 * len; i++)
		nodes[i].inv(nodes[i - 4 * len]);
};

///////////////////////////////////////////////////////////

const ctx = canvas.init();
pointer.init();

console.clear();
const len = 256;
let rad = Math.min(canvas.width, canvas.height) / 15;
const sprite = new Image();
sprite.src = "https://assets.codepen.io/222599/sphere-h.png";
const nodes = [];
for (let i = 0; i < 8 * len; i++) {
	nodes.push(new Node());
}
pointer.node = new Node();
run();

export function* hangmanDrawingGenerator(ctx, width, height) {
	ctx.fillStyle = '#ffffbf';
	ctx.fillRect(0, 0, width, height);

	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#022449';

	//bottom line
	ctx.moveTo(width * 0.2, height - ctx.lineWidth / 2);
	ctx.lineTo(width - width * 0.2, height - ctx.lineWidth / 2);
	ctx.stroke();

	// main
	ctx.moveTo(width * 0.2 + width * 0.1, height);
	ctx.lineTo(width * 0.2 + width * 0.1, height * 0.2);
	ctx.stroke();

	//crossbar
	ctx.moveTo(width * 0.2 + width * 0.1, height * 0.2 + height * 0.12);
	ctx.lineTo(width * 0.2 + width * 0.1 + height * 0.12, height * 0.2);
	ctx.stroke();

	//to right
	ctx.moveTo(width * 0.2 + width * 0.1 - ctx.lineWidth / 2, height * 0.2);
	ctx.lineTo(width * 0.2 + width * 0.4, height * 0.2);
	ctx.stroke();

	//to bottom
	ctx.moveTo(width * 0.2 + width * 0.4, height * 0.2 - ctx.lineWidth / 2);
	ctx.lineTo(width * 0.2 + width * 0.4, height * 0.3);
	ctx.stroke();
	ctx.closePath();

	yield;

	//head
	ctx.beginPath();
	ctx.lineWidth = 8;
	const headRadius = height * 0.075;
	ctx.arc(width * 0.2 + width * 0.4, height * 0.3 + headRadius, headRadius, 0, 2 * Math.PI);
	ctx.stroke();

	yield;

	//body
	ctx.moveTo(width * 0.2 + width * 0.4, height * 0.3 + 2 * headRadius);
	ctx.lineTo(width * 0.2 + width * 0.4, height * 0.3 + 2 * headRadius + height * 0.25);
	ctx.stroke();

	yield;

	//left arm
	ctx.moveTo(width * 0.2 + width * 0.4, height * 0.3 + 2 * headRadius + height * 0.04);
	ctx.lineTo(width * 0.2 + width * 0.4 - width * 0.1, height * 0.3 + 2 * headRadius + height * 0.14);
	ctx.stroke();

	yield;

	//right arm
	ctx.moveTo(width * 0.2 + width * 0.4, height * 0.3 + 2 * headRadius + height * 0.04);
	ctx.lineTo(width * 0.2 + width * 0.4 + width * 0.1, height * 0.3 + 2 * headRadius + height * 0.14);
	ctx.stroke();

	yield;

	//left leg
	ctx.moveTo(width * 0.2 + width * 0.4, height * 0.3 + 2 * headRadius + height * 0.25 - ctx.lineWidth / 2);
	ctx.lineTo(width * 0.2 + width * 0.4 - width * 0.1, height * 0.3 + 2 * headRadius + height * 0.25 + height * 0.1 - ctx.lineWidth / 2);
	ctx.stroke();

	yield;

	//right leg
	ctx.moveTo(width * 0.2 + width * 0.4, height * 0.3 + 2 * headRadius + height * 0.25 - ctx.lineWidth / 2);
	ctx.lineTo(width * 0.2 + width * 0.4 + width * 0.1, height * 0.3 + 2 * headRadius + height * 0.25 + height * 0.1 - ctx.lineWidth / 2);
	ctx.stroke();

	yield;
}

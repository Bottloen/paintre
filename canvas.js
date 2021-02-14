const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clean = document.getElementById("jsClean");
const range = document.getElementById("jsRange");

let painting = false;
let filling = false;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.lineWidth = "2.5";
ctx.fillStyle = "white";

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    if (filling === false) {
        ctx.strokeStyle = color;
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleModeClick() {
    if (filling === false) {
        filling = true;
        mode.innerText = "PAINT";
    } else {
        filling = false;
        mode.innerText = "FILL";
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "download image..";
    link.click();
}

function handleCM(event) {
    event.preventDefault();
}

function handleCleanClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleRangeInput(event) {
    ctx.lineWidth = event.target.value;
}

function handleMoveTouch(event) {
    event.preventDefault();
    var touches = event.changedTouches;
    ctx.lineTo(touches[0].screenX, touches[0].screenY);
    ctx.stroke();
}

function handleStartTouch(event) {
    event.preventDefault();
    ctx.beginPath();
    startPainting();
}

function handleEndTouch(event) {
    event.preventDefault();
    ctx.closePath();
    stopPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("touchmove", handleMoveTouch);
    canvas.addEventListener("touchstart", handleStartTouch);
    canvas.addEventListener("touchend", handleEndTouch);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}

if (clean) {
    clean.addEventListener("click", handleCleanClick);
}

if (range) {
    range.addEventListener("input", handleRangeInput);
}
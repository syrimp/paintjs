const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //2d의 context를 가지게됨
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jssave");
//캔버스에 그림을 그리려면 css로 정의된 캔버스 사이즈 말고 
//js에서도 pixel modifier에 canvas의 픽셀 사이즈를 정의해야 한다.
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //선색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선 굵기
// ctx.fillRect(50,20,100,40); //채우기 좌표, 크기



let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //마우스를 뗀 상태
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else { //마우스를 누르고 있는 상태
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleRightClick(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[♩]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick)
}

Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
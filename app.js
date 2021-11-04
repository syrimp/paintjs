const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //2d의 context를 가지게됨
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
//캔버스에 그림을 그리려면 css로 정의된 캔버스 사이즈 말고 
//js에서도 pixel modifier에 canvas의 픽셀 사이즈를 정의해야 한다.
canvas.width = 700;
canvas.height = 700;


ctx.strokeStyle = "#2c2c2c"; //선색
ctx.lineWidth = 2.5; //선 굵기

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

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
function getR(){
    const widget =  PF('spinnerR');
    if(!widget){
        console.warn("SpinnerR is not loaded");
        return parseFloat(document.getElementById("pointForm:rSpinner").value);
    }
    return widget.getValue();
}

const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext("2d");

function getClickCoordinates(evt, R){
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    const scale = 100/R;
    const xVal = (x - 150) / scale;
    const yVal = (150 - y) / scale;

    console.log(x);
    console.log(y);
    console.log(xVal, yVal);
    return { xVal, yVal };
}

function drawGraph(R=1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";

    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150, 0); ctx.lineTo(144, 15); ctx.lineTo(156, 15); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(300, 150); ctx.lineTo(285, 156); ctx.lineTo(285, 144); ctx.closePath(); ctx.fill();

    function tick(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // OX
    tick(200, 145, 200, 155);
    tick(250, 145, 250, 155);
    tick(50, 145, 50, 155);
    tick(100, 145, 100, 155);

    // OY
    tick(145, 100, 155, 100);
    tick(145, 50, 155, 50);
    tick(145, 200, 155, 200);
    tick(145, 250, 155, 250);

    const scale = 100 / R;

    ctx.fillText("R/2", 150 + scale * R / 2 - 10, 140);
    ctx.fillText("R", 150 + scale * R - 5, 140);
    ctx.fillText("-R/2", 150 - scale * R / 2 - 15, 140);
    ctx.fillText("-R", 150 - scale * R - 10, 140);

    ctx.fillText("R/2", 160, 150 - scale * R / 2);
    ctx.fillText("R", 160, 150 - scale * R);
    ctx.fillText("-R/2", 160, 150 + scale * R / 2);
    ctx.fillText("-R", 160, 150 + scale * R);

    ctx.fillText("X", 285, 140);
    ctx.fillText("Y", 160, 15);

    ctx.fillStyle = "rgba(60, 180, 100, 0.3)";

    //rectangle
    ctx.fillRect(50, 50, 100, 100);

    //triangle
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 150 + 50);
    ctx.lineTo(50, 150);

    ctx.closePath();
    ctx.fill();


    //sector
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 50, Math.PI * 1.5, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

let coordX = null;
let coordY = null;
let coordR = null;

canvas.addEventListener('click', function (event){
    console.warn("Getting R...")
    const R = getR();
    console.warn("Got R... " + R)
    const coords = getClickCoordinates(event, R);

    coordX = coords.xVal;
    coordY = coords.yVal;
    coordR = R;

    console.warn(coords)

    sendCoordinates([
        {name: 'clickX', value: coordX},
        {name: 'clickY', value: coordY},
        {name: 'clickR', value: coordR}
    ]);

});

window.drawPoints = function (){
    const ctx = canvas.getContext('2d');
    const table = document.getElementById('pointForm:pointsTable');
    if (!table) return;
    const rows = table.getElementsByTagName('tr');
    let scale = 50;

    for (let i = 1; i < rows.length; i++){
        const cells = rows[i].getElementsByTagName('td');
        const x = parseFloat(cells[0].innerText);
        const y = parseFloat(cells[1].innerText);
        const r = parseFloat(cells[2].innerText)
        const hit = cells[3].innerText === 'hit';
        scale = 100/r;

        ctx.fillStyle = hit ? 'green' : 'red';
        ctx.beginPath();
        ctx.arc(x * scale + 150, 150 - y * scale, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    drawGraph();
    drawPoints();
});

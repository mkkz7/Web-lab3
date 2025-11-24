window.getR = function (){
    const widget =  PF('spinnerR');
    if(!widget){
        console.warn("SpinnerR is not loaded");
        return parseFloat(document.getElementById("pointForm:rSpinner").value);
    }
    return widget.getValue();
}

const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext("2d");
const center = { x: canvas.width / 2, y: canvas.height / 2 };


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

window.drawGraph = function (R){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";
    const scale = 100 / R;

    ctx.beginPath();
    ctx.moveTo(0, center.y);
    ctx.lineTo(canvas.width, center.y);
    ctx.moveTo(center.x, 0);
    ctx.lineTo(center.x, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center.x, 0); ctx.lineTo(center.x-6, 12); ctx.lineTo(center.x+6, 12); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width, center.y); ctx.lineTo(canvas.width-12, center.y-6); ctx.lineTo(canvas.width-12, center.y+6); ctx.closePath(); ctx.fill();


    const ticks = [-R, -R/2, R/2, R];
    ticks.forEach(t => {
        // OX
        ctx.beginPath();
        ctx.moveTo(center.x + t*scale, center.y-5);
        ctx.lineTo(center.x + t*scale, center.y+5);
        ctx.stroke();
        ctx.fillText(t.toString(), center.x + t*scale - 10, center.y + 15);

        // OY
        ctx.beginPath();
        ctx.moveTo(center.x-5, center.y - t*scale);
        ctx.lineTo(center.x+5, center.y - t*scale);
        ctx.stroke();
        ctx.fillText(t.toString(), center.x + 10, center.y - t*scale);


    });

    // function tick(x1, y1, x2, y2) {
    //     ctx.beginPath();
    //     ctx.moveTo(x1, y1);
    //     ctx.lineTo(x2, y2);
    //     ctx.stroke();
    // }
    //
    // // OX
    // tick(200, 145, 200, 155);
    // tick(250, 145, 250, 155);
    // tick(50, 145, 50, 155);
    // tick(100, 145, 100, 155);
    //
    // // OY
    // tick(145, 100, 155, 100);
    // tick(145, 50, 155, 50);
    // tick(145, 200, 155, 200);
    // tick(145, 250, 155, 250);


    ctx.fillText("X", canvas.width - 15, center.y + 15);
    ctx.fillText("Y", center.x + 10, 15);

    ctx.fillStyle = "rgba(60, 180, 100, 0.3)";

    // rectangle (II четверть)
    ctx.fillRect(center.x - R*scale, center.y - R*scale, R*scale, R*scale);

    // triangle (III четверть)
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(center.x - R*scale, center.y);
    ctx.lineTo(center.x, center.y + R*scale/2);
    ctx.closePath();
    ctx.fill();

    // sector (I четверть)
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, R*scale/2, Math.PI * 1.5, 0, false);
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
        const r = getR();
        const hit = cells[3].innerText === 'hit';
        scale = 100/r;

        ctx.fillStyle = hit ? 'green' : 'red';
        ctx.beginPath();
        ctx.arc(x * scale + 150, 150 - y * scale, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.afterUpdate = function () {
    drawGraph(getR());
    drawPoints();
};

document.addEventListener('DOMContentLoaded', () =>{
    drawGraph(1);
    drawPoints();
});


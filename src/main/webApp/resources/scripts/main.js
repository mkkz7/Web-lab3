
window.validateForm = function() {
    //validation for X, R is on PrimeFaces Spinner
    const yInput = document.querySelector('[data-id="y-input"]');

    const Y = parseFloat(yInput.value);
    if (Y < -3.0 || Y > 3.0 || isNaN(Y) || !Number.isFinite(Y)) {
        console.log("Y has to be a number from -3 to 3")
        alert("Y has to be a number from -3 to 3");
        return false;
    }

    if (!/^-?\d+(\.\d{1,6})?$/.test(y.value)) {
        alert("Max - 6 symbols after '.' ");
        console.log("Max - 6 symbols after '.' ")
        return false;
    }

    return true;
}

const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext("2d");

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

function drawPoints(){
    const ctx = canvas.getContext('2d');
    const table = document.getElementById('pointsTable');
    if (!table) return;
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++){
        const cells = rows[i].getElementsByTagName('td');
        const x = parseFloat(cells[0].innerText);
        const y = parseFloat(cells[1].innerText);
        const hit = cells[3].innerText === 'hit';

        ctx.fillStyle = hit ? 'green' : 'red';
        ctx.beginPath();
        ctx.arc(x * 50 + 150, -y * 50 + 150, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    drawGraph();
    drawPoints();
});

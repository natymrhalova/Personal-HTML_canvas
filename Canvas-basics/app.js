window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let painting = false;

    let startPosition = () => {
        painting = true;
    }

    let finishedPosition = () => {
        painting = false;
        ctx.beginPath();
    }

    let draw = (e) => {
        if (!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "beige";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }


    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

});

window.addEventListener("resize", () => {
    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

let clearCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

document.getElementById("button").addEventListener("click", clearCanvas)
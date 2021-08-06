window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    //position in a document X,Y, HEIGHT, WIDTH
    // context.fillRect(0, 0, 300, 300)

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    //context.strokeRect(300, 300, 200, 500)
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();




})

window.addEventListener("resize", () => {

    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

})
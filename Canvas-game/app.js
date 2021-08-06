const canvas = document.querySelector("canvas");

//Giant API object which allows us to work with it and layer on it
const ctx = canvas.getContext("2d");

//innerWidht ang height are properties of an window object
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue")
player.draw()

const projectile = new Projectile(x, y, 5, "red", { x: 1, y: 1 })

const projectiles = [];
const enemies = [];

let spawnEnemies = () => {
    setInterval(() => {
        const x = Math.random() * canvas.width
        const y = 100
        const radius = Math.random() * 30 + 3;
        const color = "green"

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 2000)
}

let animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile) => {
        projectile.update()
    })

    enemies.forEach((enemy) => {
        enemy.update()
    })

}

addEventListener("click", (e) => {
    const angle = Math.atan2(e.clientY - y, e.clientX - x)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(x, y, 5, "red", velocity)
    )
})

animate()
spawnEnemies()



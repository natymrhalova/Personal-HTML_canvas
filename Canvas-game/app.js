const canvas = document.querySelector("canvas");

//Giant API object which allows us to work with it and layer on it
const ctx = canvas.getContext("2d");

//innerWidth ang height are properties of an window object
canvas.width = innerWidth;
canvas.height = innerHeight;

//Specifiing a player constructor
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

const player = new Player(x, y, 30, "white")
player.draw()

const projectiles = [];
const enemies = [];

let spawnEnemies = () => {
    setInterval(() => {
        const x = Math.random() * canvas.width
        const y = 100
        const radius = Math.random() * (45 - 10) + 10;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1500)
}

let animationId

let animate = () => {
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0,0,0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile, index) => {
        projectile.update()
        //remove projectiles of the screen
        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        //End game when an enemy touches a player
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            //When projectiles touches enemy
            if (dist - enemy.radius - projectile.radius < 1) {

                if (enemy.radius - 20 > 10) {
                    enemy.radius -= 10
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)

                }

            }
        })
    })
}

addEventListener("click", (e) => {
    const angle = Math.atan2(e.clientY - y, e.clientX - x)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(
        new Projectile(x, y, 5, "white", velocity)
    )
})

animate()
spawnEnemies()



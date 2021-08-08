const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//innerWidth ang height are properties of an window object
canvas.width = innerWidth;
canvas.height = innerHeight;

//Specifiing a player constructor because we need to draw a new player everytime
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    //draws a player circle everytime a function is called
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

//Projectile constructor to draw mutliple projectiles
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
    //Updates a new projectile
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

//enemy constructor to create a new Enemy after 1500 miliseconds. Set in a setTimeout function
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

class Particle {
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

//Used in multiple ocassions to center a player or a projectile etc. 
const x = canvas.width / 2;
const y = canvas.height / 2;

//Creates a new player based on player constructor
const player = new Player(x, y, 30, "white")
player.draw()

//Everytime time 
const projectiles = [];
const enemies = [];

//Creates new enemy every 1500 seconds from a random angle with random radius
let spawnEnemies = () => {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
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

//Request a new animation frame and creates new enemies and updates projectiles
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

            //When projectiles touches enemy that projectile and that enemy are splice from an enemy and projectile array to erase them from screen
            if (dist - enemy.radius - projectile.radius < 1) {

                if (enemy.radius - 20 > 5) {
                    gsap.setTimeout(enemy, {
                        radius: enemy.radius - 10
                    })
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

//Creates a new projectile after mouse click
addEventListener("click", (e) => {

    //Counts an angle in which the porjectile is supposed to fire - where the mouse was click
    const angle = Math.atan2(e.clientY - y, e.clientX - x)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    //Pushes new projectile to projectiles array which is looped through everytime a new screen is animated
    projectiles.push(
        new Projectile(x, y, 5, "white", velocity)
    )
})

animate()
spawnEnemies()



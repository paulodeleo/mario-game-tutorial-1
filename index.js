const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(c)

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x: 100, 
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        this.draw()
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

const player = new Player()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
    }
}

animate()

window.addEventListener('keydown', ({ code }) => {
    switch (code) {
        case 'KeyA':
            console.log('left')
            keys.left.pressed = true
            break
        case 'KeyD':
            console.log('right')
            keys.right.pressed = true
            break
        case 'KeyW':
            console.log('up')
            player.velocity.y -= 20
            break
        case 'KeyS':
            console.log('down')
            break
        default:
            break;
    }
    }
)

window.addEventListener('keyup', ({ code }) => {
    switch (code) {
        case 'KeyA':
            keys.left.pressed = false
            console.log('left')
            break
        case 'KeyD':
            keys.right.pressed = false
            console.log('right')
            break
        case 'KeyW':
            console.log('up')
            player.velocity.y -= 20
            break
        case 'KeyS':
            console.log('down')
            break
        default:
            break;
    }
    }
)
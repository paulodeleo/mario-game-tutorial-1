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

class Platform {
    constructor({ x, y, image}) {
        this.position = {
            x,
            y
        }
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(image, this.position.x, this.position.y, this.width, this.height)
    }
}

const image = new Image(580,125)
image.src = './img/platform.png'

const player = new Player()
const platforms = [
    new Platform({ x: 200, y: 300, image }), 
    new Platform({ x: 500, y: 500, image })
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()
    
    if (keys.right.pressed && player.position.x < 450) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x -= -5
            })
        }
    }

    console.log(scrollOffset)

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x  <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }    
    })
    if (scrollOffset > 1000) {
        console.log('You win!')
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
            if (player.velocity.y == 0) {
                player.velocity.y -= 20
            }
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
        /*case 'KeyW':
            console.log('up')
            player.velocity.y -= 10
            break
        */
        case 'KeyS':
            console.log('down')
            break
        default:
            break;
    }
    }
)
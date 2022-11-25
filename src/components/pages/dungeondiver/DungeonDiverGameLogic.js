export function GameLogic(ctx){
    gameState(ctx)
    movementFrames()
    idleDirection()
    diveTimer(ctx)
    swimFrames()
    attack()
    // healthChecker(playerModel)
    playerModel.image.onload = ()=>{
        ctx.fillStyle = 'gray'
        ctx.fillRect(0, 0, 700, 520)
        playerModel.update(ctx)
    }

}

class Entity{
    constructor({position, width, height, health, damage, imageSrc, scale = 1, framesMax, offset, sprites}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = this.framesCurrent
        this.framesElaped = 0
        this.framesHold = 9
        this.sprites = sprites
        for(const obj in this.sprites){
            sprites[obj].image = new Image()
            sprites[obj].image.src = sprites[obj].imageSrc
        }
        this.width = width
        this.height = height
        this.alive = false
        this.health = health
        this.damage = damage
        this.offset = offset
        this.notSafe = true
        this.direction = 'left'
        this.hurt = false
        this.dying = false
        this.waiting = false
        this.attacking = false
    }

    draw(ctx){
        ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            )
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(ctx){
        this.draw(ctx)
        this.framesElaped++
        if(this.framesElaped % this.framesHold === 0){  
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
        if(this.position.x < 30){
            this.position.x = 30
        } else if(this.position.x + this.width > 670){
            this.position.x = 670 - this.width
        } 

        if(this.position.y < 60){
            this.position.y = 60
        } else if (this.position.y  + this.height > 450){
            this.position.y = 450 - this.height    
        } 
    }

    
}

class Player {
    constructor({position, width, height, speed, health, imageSrc, scale = 1, offset, sprites}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.sprites = sprites
        this.width = width
        this.height = height
        this.speed = speed
        this.alive = true
        this.health = health
        this.offset = offset
        this.attackBox = {
            up: {
                position: this.position,
                width: 40,
                height: 25
            },
            left: {
                position: this.position,
                width: 30,
                height: 60
            },
            down: {
                position: this.position,
                width: 40,
                height: 25
            },
            right: {
                position: this.position,
                width: 30,
                height: 60
            }
        }
        this.isAttacking = false
    }

    draw(ctx){
        ctx.drawImage(
            this.image, 
            0,
            0,
            this.image.width,
            this.image.height,
            

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            this.image.width  * this.scale,
            this.image.height * this.scale
            )
            ctx.fillStyle = 'green'
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(ctx){
            this.draw(ctx)
        
        if(this.position.x < 30){
            this.speed.x = 0
            this.position.x = 30
        } else if((this.position.x + this.speed.x)  < 30 ){
            this.speed.x = 0
            this.position.x = 30
        }else if((this.position.x + this.width) + this.speed.x > 670 ){
            this.speed.x = 0
            this.position.x = 670 - this.width
        } else if(this.position.x + this.width > 670){
            this.speed.x = 0
            this.position.x = 670 - this.width
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 60){
            this.speed.y = 0
            this.position.y = 60
        } else if (this.position.y  + this.speed.y < 60){
            this.speed.y = 0
            this.position.y = 60    
        } else if (this.position.y  + this.height + this.speed.y > 460){
            this.speed.y = 0
            this.position.y = 460 - this.height    
        } else if (this.position.y  + this.height > 460){
            this.speed.y = 0
            this.position.y = 460 - this.height    
        } else {
            this.position.y += this.speed.y
        }
    }
    
    visualHitBox(){
        // if(this.isAttacking ==== true){
        //     ctx.fillStyle = 'black'
        //     if(lastKey ==== 'w'){  
        //         ctx.fillRect(this.attackBox.up.position.x, this.attackBox.up.position.y -25, this.attackBox.up.width, this.attackBox.up.height)
        //     } else if (lastKey ==== 'a') {
        //         ctx.fillRect(this.attackBox.left.position.x - 30, this.attackBox.left.position.y, this.attackBox.left.width, this.attackBox.left.height)
        //     } else if (lastKey === 's') {
        //         ctx.fillRect(this.attackBox.down.position.x, this.attackBox.down.position.y+55, this.attackBox.down.width, this.attackBox.down.height)
        //     } else if (lastKey === 'd') {
        //         ctx.fillRect(this.attackBox.right.position.x + 40, this.attackBox.right.position.y, this.attackBox.right.width, this.attackBox.right.height)
        //     }

        // }
    }

    attack(){
        setTimeout(()=>{
            this.isAttacking = true
        }, 250)       
        setTimeout(()=>{
          this.isAttacking = false
        }, 400)
       }  
}

const playerModel = new Player({
    position: {x: 50, y: 70},
    width: 40,
    height: 55,
    speed: {x: 0, y: 0},
    health: 20,
    imageSrc: '',
    scale: 1,
    offset: {x: 30, y:9},
    sprites: {
        idleLeft:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        idleRight:{
            offset: {x: 22 ,y: 9},
            width: 40,
            height: 55
        },
        idleDown:{
            offset: {x:30, y: 14},
            width: 40,
            height: 55
        },
        idleUp:{
            offset: {x: 30 ,y: 10},
            width: 40,
            height: 55
        },
        attRight:{
            offset: {x: 15 ,y: 8},
            width: 40,
            height: 55,
        },
        attLeft:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        attUp:{
            offset: {x: 30 ,y: 20},
            width: 40,
            height: 45,
        },
        attDown:{
            offset: {x: 30 ,y: 0},
            width: 40,
            height: 55
        },
        runUp:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        runDown:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        runRight:{
            offset: {x: 22 ,y: 9},
            width: 40,
            height: 55
        },
        runLeft:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        swimRight:{
            offset: {x: 30 ,y: 18},
            width: 40,
            height: 55,
            y: 10
        },
        swimLeft:{
            offset: {x: 38 ,y: 18},
            width: 40,
            height: 55,
            y: 10
        },
        swimUnD: {
            offset: {x: 30, y: 18}
        }, 
        hurt: {
            offset: {x: 30, y: 9},
            width: 40,
            height: 55
        }
}
})


let gameWon = false
let gameLost = false
let gameStart = false
let level = 1
let gamePause = false
let bossDead = false

let lastKey = ''
let moved = false
let dialogue = false
let spikeCount = 0
let attacking = false

let moving = false
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let hurt = false
let dying = false

let runFramesElaped = 10
let runCurrentFrame = 0
let runFramesMax = 6
let runFramesHold = 7


let idleframesElaped = 10
let idleCurrentFrame = 0

let idleframesMax = 5
let idleframesHold = 10
const movementFrames = ()=>{
    if(!attacking && !dying && !hurt){
            runFramesElaped++
            // console.log(runFramesElaped % runFramesHold)
            if(runFramesElaped % runFramesHold === 0){  
                if(runCurrentFrame < runFramesMax - 1){
                    runCurrentFrame++
                } else {
                    runCurrentFrame = 0
                }
            }

            playerModel.speed.x = 0
            playerModel.speed.y = 0
            if(keys.w.pressed && keys.a.pressed && keys.d.pressed){
                playerModel.speed.x = 0
                playerModel.speed.y = -3
                playerModel.width = playerModel.sprites.runUp.width
                playerModel.height = playerModel.sprites.runUp.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runUp.offset.x
                playerModel.offset.y = playerModel.sprites.runUp.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runUp/golem-run-t-0${runCurrentFrame}.png`
                }
            } else if (keys.s.pressed && keys.a.pressed && keys.d.pressed){
                playerModel.speed.x = 0
                playerModel.speed.y = 3
                playerModel.width = playerModel.sprites.runDown.width
                playerModel.height = playerModel.sprites.runDown.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runDown.offset.x
                playerModel.offset.y = playerModel.sprites.runDown.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runDown/golem-run-d-0${runCurrentFrame}.png`
                }
            } else if (keys.d.pressed && keys.w.pressed && keys.s.pressed){
                playerModel.speed.x = 3
                playerModel.speed.y = 0
                playerModel.width = playerModel.sprites.runRight.width
                playerModel.height = playerModel.sprites.runRight.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runRight.offset.x
                playerModel.offset.y = playerModel.sprites.runRight.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            } else if (keys.a.pressed && keys.s.pressed && keys.w.pressed) {
                playerModel.speed.x = -3
                playerModel.speed.y = 0
                playerModel.width = playerModel.sprites.runLeft.width
                playerModel.height = playerModel.sprites.runLeft.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runLeft.offset.x
                playerModel.offset.y = playerModel.sprites.runLeft.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            } else if(keys.d.pressed && keys.s.pressed){
                playerModel.speed.x = 3
                playerModel.speed.y = 3
                playerModel.width = playerModel.sprites.runRight.width
                playerModel.height = playerModel.sprites.runRight.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runRight.offset.x
                playerModel.offset.y = playerModel.sprites.runRight.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            }  else if(keys.a.pressed && keys.s.pressed){
                playerModel.speed.x = -3
                playerModel.speed.y = 3
                playerModel.width = playerModel.sprites.runUp.width
                playerModel.height = playerModel.sprites.runUp.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runUp.offset.x
                playerModel.offset.y = playerModel.sprites.runUp.offset.y
                playerModel.image.src =  `/dungeondiversprites/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            }  else if(keys.d.pressed && keys.w.pressed){
                playerModel.speed.x = 3
                playerModel.speed.y = -3
                playerModel.width = playerModel.sprites.runRight.width
                playerModel.height = playerModel.sprites.runRight.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runRight.offset.x
                playerModel.offset.y = playerModel.sprites.runRight.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            }  else if(keys.a.pressed && keys.w.pressed){
                playerModel.speed.x = -3
                playerModel.speed.y = -3
                playerModel.width = playerModel.sprites.runLeft.width
                playerModel.height = playerModel.sprites.runLeft.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runLeft.offset.x
                playerModel.offset.y = playerModel.sprites.runLeft.offset.y
                playerModel.image.src =  `/dungeondiversprites/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            }   else if(keys.a.pressed && keys.d.pressed){
                playerModel.speed.x = 0
                playerModel.speed.y = 0
                playerModel.width = playerModel.sprites.idleDown.width
                playerModel.height = playerModel.sprites.idleDown.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.idleDown.offset.x
                playerModel.offset.y = playerModel.sprites.idleDown.offset.y
                playerModel.image.src =  `/dungeondiversprites/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
                }
            }  else if(keys.w.pressed && keys.s.pressed){
                playerModel.speed.x = 0
                playerModel.speed.y = 0              
                playerModel.width = playerModel.sprites.idleDown.width
                playerModel.height = playerModel.sprites.idleDown.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.idleDown.offset.x
                playerModel.offset.y = playerModel.sprites.idleDown.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
                }
            } else if(keys.w.pressed){
                playerModel.speed.y = -3
                playerModel.width = playerModel.sprites.runUp.width
                playerModel.height = playerModel.sprites.runUp.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runUp.offset.x
                playerModel.offset.y = playerModel.sprites.runUp.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runUp/golem-run-t-0${runCurrentFrame}.png`
                }
            } else if(keys.a.pressed){
                playerModel.speed.x = -3
                playerModel.width = playerModel.sprites.runLeft.width
                playerModel.height = playerModel.sprites.runLeft.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runLeft.offset.x
                playerModel.offset.y = playerModel.sprites.runLeft.offset.y
                playerModel.image.src =  `/dungeondiversprites/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            } else if(keys.s.pressed){
                playerModel.speed.y = 3
                playerModel.width = playerModel.sprites.runDown.width
                playerModel.height = playerModel.sprites.runDown.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runDown.offset.x
                playerModel.offset.y = playerModel.sprites.runDown.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runDown/golem-run-d-0${runCurrentFrame}.png`
                }
            } else if(keys.d.pressed){
                playerModel.speed.x = 3
                playerModel.width = playerModel.sprites.runRight.width
                playerModel.height = playerModel.sprites.runRight.height
                if(!swimming){
                playerModel.offset.x = playerModel.sprites.runRight.offset.x
                playerModel.offset.y = playerModel.sprites.runRight.offset.y
                playerModel.image.src = `/dungeondiversprites/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            }    else {
                moving = false  
            }
        }
}
const idleDirection = () => {
    if(!moving && !attacking && !swimming && !dying && !hurt){
        idleframesElaped++
        // console.log(idleframesElaped % idleframesHold)
        if(idleframesElaped % idleframesHold === 0){  
            if(idleCurrentFrame < idleframesMax - 1){
                // console.log(idleCurrentFrame)
                idleCurrentFrame++
            
            } else {
                idleCurrentFrame = 0
            }
    }

        if(lastKey === 'w'){
            playerModel.width = playerModel.sprites.runUp.width
            playerModel.height = playerModel.sprites.runUp.height
            playerModel.offset.x = playerModel.sprites.idleUp.offset.x
            playerModel.offset.y = playerModel.sprites.idleUp.offset.y
            playerModel.image.src =  `/dungeondiversprites/adventurer/idleUp/golem-idle-t-0${idleCurrentFrame}.png`
        } else if(lastKey === 'a'){    
            playerModel.width = playerModel.sprites.runUp.width
            playerModel.height = playerModel.sprites.runUp.height
            playerModel.offset.x = playerModel.sprites.idleLeft.offset.x
            playerModel.offset.y = playerModel.sprites.idleLeft.offset.y
            playerModel.image.src =  `/dungeondiversprites/adventurer/idleLeft/golem-idle-l-0${idleCurrentFrame}.png`
        } else if(lastKey === 's'|| !moved){   
            playerModel.width = playerModel.sprites.runUp.width
            playerModel.height = playerModel.sprites.runUp.height
            playerModel.offset.x = playerModel.sprites.idleDown.offset.x
            playerModel.offset.y = playerModel.sprites.idleDown.offset.y
            // console.log(idleCurrentFrame)
            playerModel.image.src =  `/dungeondiversprites/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
        } else if(lastKey === 'd'){    
            playerModel.width = playerModel.sprites.runUp.width
            playerModel.height = playerModel.sprites.runUp.height
            playerModel.offset.x = playerModel.sprites.idleRight.offset.x
            playerModel.offset.y = playerModel.sprites.idleRight.offset.y
            playerModel.image.src =  `/dungeondiversprites/adventurer/idleRight/golem-idle-r-0${idleCurrentFrame}.png`
        }
    }
}

let attFramesElaped = 0
let attCurrentFrame = 0
let attFramesMax = 7
let attFramesHold = 6

const attack= () => {
    if(attacking && !swimming && !dying && !hurt){
        attFramesElaped++
            if(attFramesElaped % attFramesHold === 0){  
                if(attCurrentFrame < attFramesMax - 1){
                    attCurrentFrame++
                    playerModel.speed.x = 0
                    playerModel.speed.y = 0
                } else {
                    attCurrentFrame = 0
                    swimFramesElaped = 0
                    attacking = false
            }
        }
    if (lastKey == 'w'){
        playerModel.width = playerModel.sprites.attUp.width
        playerModel.height = playerModel.sprites.attUp.height
        playerModel.offset.x = playerModel.sprites.attUp.offset.x
        playerModel.offset.y = playerModel.sprites.attUp.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/attUp/golem-attack-t-0${attCurrentFrame}.png`
    } else if(lastKey == 'a'){
        playerModel.width = playerModel.sprites.attLeft.width
        playerModel.height = playerModel.sprites.attLeft.height
        playerModel.offset.x = playerModel.sprites.attLeft.offset.x
        playerModel.offset.y = playerModel.sprites.attLeft.offset.y
        playerModel.image.src =  `/dungeondiversprites/adventurer/attLeft/golem-attack-l-0${attCurrentFrame}.png`
    } else if(lastKey == 's'){
        playerModel.width = playerModel.sprites.attDown.width
        playerModel.height = playerModel.sprites.attDown.height
        playerModel.offset.x = playerModel.sprites.attDown.offset.x
        playerModel.offset.y = playerModel.sprites.attDown.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/attDown/golem-attack-d-0${attCurrentFrame}.png`
    } else if(lastKey == 'd'){
        playerModel.width = playerModel.sprites.attRight.width
        playerModel.height = playerModel.sprites.attRight.height
        playerModel.offset.x = playerModel.sprites.attRight.offset.x
        playerModel.offset.y = playerModel.sprites.attRight.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/attRight/golem-attack-r-0${attCurrentFrame}.png`
    }    
  }
}

let swimming = false
let swimFramesElaped = 15
let swimCurrentFrame = 0
let swimFramesMax = 13
let swimFramesHold = 15

let onCooldown = true
let cdBar = 0
let cdY = 23
let diveTimerFramesElaped = 0
let diveTimerCurrentFrame = 0
let diveTimerFramesMax = 23
let diveTimerFramesHold = 15


const diveTimer = (ctx)=>{
    if(onCooldown && !dying){
        diveTimerFramesElaped++
        if(diveTimerFramesElaped % diveTimerFramesHold === 0){  
            if(diveTimerCurrentFrame < diveTimerFramesMax - 1 && cdBar <= 22){
                diveTimerCurrentFrame++
                cdBar += 1
                cdY -= 1
            } else {
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
                onCooldown = false
            }
        }
        
        // console.log('h')
        ctx.fillStyle = 'black'
        ctx.fillRect(playerModel.position.x + playerModel.width + 9, playerModel.position.y -4, 7, 28)
        ctx.fillStyle = 'white'
        ctx.fillRect(playerModel.position.x + playerModel.width + 11, (playerModel.position.y - 2) + cdY, 3, cdBar)
    }
}

const swimFrames = () =>{
    if(swimming === true && !onCooldown){
        hurt = false
        attacking = false
        // attCurrentFrame = 0
        // attFramesElaped = 0
        swimFramesElaped++
            if(swimFramesElaped % swimFramesHold === 0){  
                if(swimCurrentFrame < swimFramesMax - 1){
                    if(playerModel.health === 20){
                        playerModel.health = 20
                    } else{
                        playerModel.health += 1
                    }
                    swimCurrentFrame++
                } else {
                    swimFramesElaped = 0
                    swimCurrentFrame = 0
                    swimming = false
                    onCooldown = true
            }
        }

    
    if(keys.a.pressed && keys.d.pressed){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimUnD.offset.x
        playerModel.offset.y = playerModel.sprites.swimUnD.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/swim/swimD/golem-swim-d-0${swimCurrentFrame}.png`
    } else if (keys.d.pressed ||  lastKey === 'd'){
        playerModel.width = playerModel.sprites.swimRight.width
        playerModel.height = playerModel.sprites.swimRight.height
        playerModel.offset.x = playerModel.sprites.swimRight.offset.x
        playerModel.offset.y = playerModel.sprites.swimRight.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/swim/swimR/golem-swim-r-0${swimCurrentFrame}.png`
    } else if (keys.d.pressed ||  lastKey === 'd'){
        playerModel.width = playerModel.sprites.swimRight.width
        playerModel.height = playerModel.sprites.swimRight.height
        playerModel.offset.x = playerModel.sprites.swimRight.offset.x
        playerModel.offset.y = playerModel.sprites.swimRight.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/swim/swimR/golem-swim-r-0${swimCurrentFrame}.png`
    } else if(keys.a.pressed ||  lastKey === 'a'){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimLeft.offset.x
        playerModel.offset.y = playerModel.sprites.swimLeft.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/swim/swimL/golem-swim-l-0${swimCurrentFrame}.png`
    } else if(keys.w.pressed ||  lastKey === 'w'){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimUnD.offset.x
        playerModel.offset.y = playerModel.sprites.swimUnD.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/swim/swimU/golem-swim-u-0${swimCurrentFrame}.png`
    } else if(keys.s.pressed ||  lastKey === 's'){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimUnD.offset.x
        playerModel.offset.y = playerModel.sprites.swimUnD.offset.y
        playerModel.image.src = `/dungeondiversprites/adventurer/swim/swimD/golem-swim-d-0${swimCurrentFrame}.png`
    } 
  }
}
// const healthChecker = (player) =>{
//     // console.log(player.health)
//     if(player.health == 20){
//         health.style.width = '100%'
//         health.style.backgroundColor = 'green'
//     } else if(player.health == 19){
//         health.style.width = '95%'
//         health.style.backgroundColor = 'green'
//     } else if(player.health == 18){
//         health.style.width = '90%'
//         health.style.backgroundColor = 'green'
//     } else if(player.health == 17){
//         health.style.width = '85%'
//         health.style.backgroundColor = 'green'
//     } else if(player.health == 16){
//         health.style.width = '80%'
//         health.style.backgroundColor = 'green'
//     } else if(player.health == 15){
//         health.style.width = '75%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 14){
//         health.style.width = '70%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 13){
//         health.style.width = '65%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 12){
//         health.style.width = '60%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 11){
//         health.style.width = '55%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 10){
//         health.style.width = '50%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 9){
//         health.style.width = '45%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 8){
//         health.style.width = '40%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 7){
//         health.style.width = '35%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 6){
//         health.style.width = '30%'
//         health.style.backgroundColor = 'orange'
//     } else if(player.health == 5){
//         health.style.width = '25%'
//         health.style.backgroundColor = 'red'
//     } else if(player.health == 4){
//         health.style.width = '20%'
//         health.style.backgroundColor = 'red'
//     } else if(player.health == 3){
//         health.style.width = '15%'
//         health.style.backgroundColor = 'red'
//     } else if(player.health == 2){
//         health.style.width = '10%'
//         health.style.backgroundColor = 'red'
//     } else if(player.health == 1) {
//         health.style.width = '5%'
//         health.style.backgroundColor = 'red'
//     } else if (player.health <= 0){
//         health.style.width = '0%'
//         if(dying){
//             dyingFramesElaped++
//             if(dyingFramesElaped % dyingFramesHold === 0){  
//                 if(dyingCurrentFrame < dyingFramesMax - 1){
//                     dyingCurrentFrame++
//                 } else {
//                     dyingFramesElaped = 0
//                     dyingCurrentFrame = 0
//                     gameLost = true 
//                     player.alive = false
//                 }
//             }
//         }
//         playerModel.speed.x = 0
//         playerModel.speed.y = 0
//         playerModel.width = playerModel.sprites.swimLeft.width
//         playerModel.height = playerModel.sprites.swimLeft.height
//         playerModel.offset.x = playerModel.sprites.swimUnD.offset.x
//         playerModel.offset.y = playerModel.sprites.swimUnD.offset.y
//         playerModel.image.src = `/dungeondiversprites/adventurer/dying/golem-death-d-0${dyingCurrentFrame}.png`
//     }   
// }
const survivorRoomOne = new Entity({
    position: {x: 600, y: 250},
    width: 28,
    height: 40,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '/dungeondiversprites/entities/survivor.png',
    scale: 1.5,
    framesMax: 4,
    offset: {x: 9, y: 9},
    sprites: {
        idle: {
            imageSrc: '/dungeondiversprites/entities/survivor.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 22, y:10}
        }
    }
})

const spikeA = new Entity({
    position: {x: 650, y: 80},
    width: 22,
    height: 20,
    speed: {x: 0, y: 0},
    imageSrc: '/dungeondiversprites/adventurer/spike/spike-u.png',
    scale: .15,
    framesMax: 1,
    offset: {x: 2, y: 1}
    
})
const spikeB = new Entity({
    position: {x: 360, y: 220},
    width: 22,
    height: 20,
    speed: {x: 0, y: 0},
    imageSrc: '/dungeondiversprites/adventurer/spike/spike-u.png',
    scale: .15,
    framesMax: 1,
    offset: {x: 2, y: 1}
})
const spikeC = new Entity({
    position: {x: 620, y: 420},
    width: 22,
    height: 20,
    speed: {x: 0, y: 0},
    imageSrc: '/dungeondiversprites/adventurer/spike/spike-u.png',
    scale: .15,
    framesMax: 1,
    offset: {x: 2, y: 1}
})


const key = new Entity({
    position: {x: 200, y: 224},
    width: 28,
    height: 28,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '/dungeondiversprites/entities/key.png',
    scale: .05,
    framesMax: 1,
    offset: {x: 1, y: 0}
})
const door = new Entity({
    position: {x: 666, y: 200},
    width: 10,
    height: 65,
    speed: {x: 0, y: 0},
    imageSrc: '/dungeondiversprites/entities/door.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 22, y: 15},
    sprites: {openDoor: {
        imageSrc: '/dungeondiversprites/entities/door2.png',
        offset: {x: 18, y: 15},
        scale: 1.25
    },
    door:{
        imageSrc: '/dungeondiversprites/entities/door.png',
        offset: {x: 22, y: 15},
        scale: 1
    }

}
})
const chest = new Entity({
    position: {x: 600, y: 70},
    width: 50,
    height: 40,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '/dungeondiversprites/entities/chest.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 48, y: 46},
    sprites:{open:{imageSrc: '/dungeondiversprites/entities/openChest.png'}}
})


const enemyA = new Entity({
    position:{x: 650, y: 400},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 5,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: '/dungeondiversprites/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: '/dungeondiversprites/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33,
        },
        houndRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndDeathLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndAttackLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
    }
})
const enemyB = new Entity({
    position:{x: 410, y: 300},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 5,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 7, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: '/dungeondiversprites/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: '/dungeondiversprites/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndDeathLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndAttackLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },

    }
})
const enemyC = new Entity({
    position:{x: 400, y: 400},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 4,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 7, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: '/dungeondiversprites/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: '/dungeondiversprites/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndDeathLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndAttackLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },

    }
})
const enemyD = new Entity({
    position:{x: 500, y: 100},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 5,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: '/dungeondiversprites/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: '/dungeondiversprites/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: '/dungeondiversprites/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndDeathLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndAttackLeft: {
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: '/dungeondiversprites/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },

    }
})
const reaper = new Entity({
    position:{x: 100, y: 240},
    width: 20, height: 20,
    speed: {x: 0, y: 0},
    health: 20,
    damage: 3,
    imageSrc: '', 
    scale: .7, 
    framesMax: 1, 
    offset: {x: 12, y: 2},
    sprites: {
            reaperLeft: {
                imageSrc: '/dungeondiversprites/entities/reaper/reaperRunningLeft.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 16, y:10},
                width: 20,
                height: 30
            },
            reaperRight:{    
                imageSrc: '/dungeondiversprites/entities/reaper/reaperRunningRight.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 14, y:10},
                width: 20,
                height: 30
            },
            reaperIdle:{
                imageSrc: '/dungeondiversprites/entities/reaper/reaperIdle.png',
                framesMax: 5,
                framesHold: 7,
                offset: {x: 14, y:10},
                width: 20,
                height: 30
            },
            reaperIdleLeft:{
                imageSrc: '/dungeondiversprites/entities/reaper/reaperIdleLeft.png',
                framesMax: 5,
                framesHold: 7,
                offset: {x: 16, y:10},
                width: 20,
                height: 30
            },
            reaperAttackRight:{
                imageSrc: '/dungeondiversprites/entities/reaper/reaperAttackRight.png',
                framesMax: 10,
                framesHold: 15,
                offset: {x: 14, y: 10},
                width: 20,
                height: 30
            },
            reaperHolsterWeaponLeft:{
                imageSrc: '/dungeondiversprites/entities/reaper/reaperHolsterWeaponLeft.png',
                framesMax: 10,
                framesHold: 10,
                offset: {x: 16, y:10},
                width: 20,
                height: 30
            },
            reaperHolsterWeaponRight:{
                imageSrc: '/dungeondiversprites/entities/reaper/reaperHolsterWeaponRight.png',
                framesMax: 10,
                framesHold: 10,
                offset: {x: 14, y:10},
                width: 20,
                height: 30
            },
    }
})

const mobCollision = (mobOne, mobTwo)=>{    
    const left = mobOne.position.x + mobOne.width >=  mobTwo.position.x
    const right = mobOne.position.x <= mobTwo.position.x + mobTwo.width
    const top = mobOne.position.y + mobOne.height >= mobTwo.position.y
    const bottom = mobOne.position.y <= mobTwo.position.y + mobTwo.height


    if(left && right && top && bottom && mobOne.alive && mobTwo.alive && !mobOne.dying && !mobTwo.dying && !mobOne.hurt){
            mobTwo.waiting = true
    } else {
            mobTwo.waiting = false
    }


}


const houndAttack = (player, enemy)=>{
    enemy.damage = 2

    if(enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndDeathLeft.framesMax
            enemy.width = enemy.sprites.houndDeathLeft.width
            enemy.height = enemy.sprites.houndDeathLeft.height
            enemy.image = enemy.sprites.houndDeathLeft.image 
            enemy.offset.x = enemy.sprites.houndDeathLeft.offset.x
            enemy.offset.y = enemy.sprites.houndDeathLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndDeathRight.framesMax
            enemy.width = enemy.sprites.houndDeathRight.width
            enemy.height = enemy.sprites.houndDeathRight.height
            enemy.image = enemy.sprites.houndDeathRight.image 
            enemy.offset.x = enemy.sprites.houndDeathRight.offset.x
            enemy.offset.y = enemy.sprites.houndDeathRight.offset.y
        }
    } else if(enemy.hurt && !enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndHurtLeft.framesMax
            enemy.width = enemy.sprites.houndHurtLeft.width
            enemy.height = enemy.sprites.houndHurtLeft.height
            enemy.image = enemy.sprites.houndHurtLeft.image 
            enemy.offset.x = enemy.sprites.houndHurtLeft.offset.x
            enemy.offset.y = enemy.sprites.houndHurtLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndHurtRight.framesMax
            enemy.width = enemy.sprites.houndHurtRight.width
            enemy.height = enemy.sprites.houndHurtRight.height
            enemy.image = enemy.sprites.houndHurtRight.image 
            enemy.offset.x = enemy.sprites.houndHurtRight.offset.x
            enemy.offset.y = enemy.sprites.houndHurtRight.offset.y
        }
    } else if (!enemy.hurt && !enemy.dying && enemy.alive && !enemy.waiting){
        if(enemy.position.x <= player.position.x + player.width + 45 && enemy.position.x >= player.position.x + player.width && !player.dying && !enemy.dying){
            setTimeout(()=>{enemy.position.x -= 2; enemy.position.y += 0 }, 1000)
            enemy.image = enemy.sprites.houndAttackLeft.image
            enemy.framesMax = enemy.sprites.houndAttackLeft.framesMax
            enemy.offset.x = enemy.sprites.houndAttackLeft.offset.x
            enemy.offset.y = enemy.sprites.houndAttackLeft.offset.y
            
        } else if(enemy.position.x + enemy.width  >= player.position.x - 45 && enemy.position.x + enemy.width <= player.position.x && !enemy.dying && !player.dying) {
            setTimeout(()=>{enemy.position.x += 2; enemy.position.y += 0}, 1000)
            enemy.image = enemy.sprites.houndAttackRight.image
            enemy.framesMax = enemy.sprites.houndAttackRight.framesMax
            enemy.offset.x = enemy.sprites.houndAttackRight.offset.x
            enemy.offset.y = enemy.sprites.houndAttackRight.offset.y
        } else{
          if(enemy.position.x >= player.position.x + player.width + 35){
           
            enemy.position.x -= .5
            enemy.direction = 'left'
            enemy.width = enemy.sprites.houndLeft.width
            enemy.height = enemy.sprites.houndLeft.height
            enemy.image = enemy.sprites.houndLeft.image
            enemy.framesMax = enemy.sprites.houndLeft.framesMax
            enemy.offset.x = enemy.sprites.houndLeft.offset.x
            enemy.offset.y = enemy.sprites.houndLeft.offset.y
        }
        if(enemy.position.x + enemy.width <= player.position.x - 35){
            enemy.position.x += .5
            enemy.direction = 'right'
            enemy.width = enemy.sprites.houndRight.width
            enemy.height = enemy.sprites.houndRight.height
            enemy.image = enemy.sprites.houndRight.image
            enemy.framesMax = enemy.sprites.houndRight.framesMax
            enemy.offset.x = enemy.sprites.houndRight.offset.x
            enemy.offset.y = enemy.sprites.houndRight.offset.y
        }
        if(enemy.position.y >= player.position.y + 20){
            enemy.position.y -= .5
        }
        if(enemy.position.y <= player.position.y + 20){
            enemy.position.y += .5
        }
    }
  }
}

let intermission = false
const reaperBlink=()=>{
    if(!intermission && reaper.alive){
        console.log('working')
        setInterval(()=>{
            console.log('still working')
            setTimeout(()=>{
                reaper.framesCurrent = 0
                reaper.attacking = true
                reaper.position.x = playerModel.position.x - 22
                reaper.position.y = playerModel.position.y + 20
            }, 5000)
            setTimeout(()=>{
                reaper.damage = 6
                reaper.width = 40
            }, 5400)
            setTimeout(()=>{
                reaper.damage = 3
                reaper.width = 20
            }, 5600)
            setTimeout(()=>{
                reaper.attacking = false
                reaper.framesCurrent = 0
            }, 6000)
        }, 7000)
    }
}


const reaperAttack = (player, enemy)=>{

    enemy.scale = 1
    if(enemy.attacking){
        enemy.direction = 'right'
        enemy.position.x -= 0
        enemy.framesMax = enemy.sprites.reaperAttackRight.framesMax
        enemy.height = enemy.sprites.reaperAttackRight.height
        enemy.image = enemy.sprites.reaperAttackRight.image 
        enemy.offset.x = enemy.sprites.reaperAttackRight.offset.x
        enemy.offset.y = enemy.sprites.reaperAttackRight.offset.y
    } else if(intermission){
        enemy.position.x = 330
        enemy.position.y = 240
        enemy.framesMax = enemy.sprites.reaperIdle.framesMax
        enemy.width = enemy.sprites.reaperIdle.width
        enemy.height = enemy.sprites.reaperIdle.height
        enemy.image = enemy.sprites.reaperIdle.image 
        enemy.offset.x = enemy.sprites.reaperIdle.offset.x
        enemy.offset.y = enemy.sprites.reaperIdle.offset.y
    } else if(enemy.dying){
        if(enemy.direction === 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperHolsterWeaponLeft.framesMax
            enemy.width = enemy.sprites.reaperHolsterWeaponLeft.width
            enemy.height = enemy.sprites.reaperHolsterWeaponLeft.height
            enemy.image = enemy.sprites.reaperHolsterWeaponLeft.image 
            enemy.offset.x = enemy.sprites.reaperHolsterWeaponLeft.offset.x
            enemy.offset.y = enemy.sprites.reaperHolsterWeaponLeft.offset.y
        } if(enemy.direction === 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperHolsterWeaponRight.framesMax
            enemy.width = enemy.sprites.reaperHolsterWeaponRight.width
            enemy.height = enemy.sprites.reaperHolsterWeaponRight.height
            enemy.image = enemy.sprites.reaperHolsterWeaponRight.image 
            enemy.offset.x = enemy.sprites.reaperHolsterWeaponRight.offset.x
            enemy.offset.y = enemy.sprites.reaperHolsterWeaponRight.offset.y
        }
    } else if(enemy.hurt && !enemy.dying){
        if(enemy.direction === 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperIdleLeft.framesMax
            enemy.width = enemy.sprites.reaperIdleLeft.width
            enemy.height = enemy.sprites.reaperIdleLeft.height
            enemy.image = enemy.sprites.reaperIdleLeft.image 
            enemy.offset.x = enemy.sprites.reaperIdleLeft.offset.x
            enemy.offset.y = enemy.sprites.reaperIdleLeft.offset.y
        } if(enemy.direction === 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperIdle.framesMax
            enemy.width = enemy.sprites.reaperIdle.width
            enemy.height = enemy.sprites.reaperIdle.height
            enemy.image = enemy.sprites.reaperIdle.image 
            enemy.offset.x = enemy.sprites.reaperIdle.offset.x
            enemy.offset.y = enemy.sprites.reaperIdle.offset.y
        }
    } else if (!enemy.hurt && !enemy.dying && enemy.alive && !enemy.waiting &&  !enemy.attacking && !intermission){
        if(enemy.position.x >= player.position.x){
            enemy.direction = 'left'
            enemy.position.x -= 1
            enemy.width = enemy.sprites.reaperLeft.width
            enemy.height = enemy.sprites.reaperLeft.height
            enemy.image = enemy.sprites.reaperLeft.image
            enemy.framesMax = enemy.sprites.reaperLeft.framesMax
            enemy.offset.x = enemy.sprites.reaperLeft.offset.x
            enemy.offset.y = enemy.sprites.reaperLeft.offset.y
        }
        if(enemy.position.x <= player.position.x){
            enemy.direction = 'right'
            enemy.position.x += 1
            enemy.width = enemy.sprites.reaperRight.width
            enemy.height = enemy.sprites.reaperRight.height
            enemy.image = enemy.sprites.reaperRight.image
            enemy.framesMax = enemy.sprites.reaperRight.framesMax
            enemy.offset.x = enemy.sprites.reaperRight.offset.x
            enemy.offset.y = enemy.sprites.reaperRight.offset.y           
        }
        if(enemy.position.y >= player.position.y + 20){
            enemy.position.y -= 1
        }
        if(enemy.position.y <= player.position.y + 20){
            enemy.position.y += 1
        }
      }
}

const goblinAttack = (player, enemy)=>{
    enemy.damage = 4
    if(enemy.dying){
        if(enemy.direction === 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinDeathLeft.framesMax
            enemy.width = enemy.sprites.goblinDeathLeft.width
            enemy.height = enemy.sprites.goblinDeathLeft.height
            enemy.image = enemy.sprites.goblinDeathLeft.image 
            enemy.offset.x = enemy.sprites.goblinDeathLeft.offset.x
            enemy.offset.y = enemy.sprites.goblinDeathLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinDeathRight.framesMax
            enemy.width = enemy.sprites.goblinDeathRight.width
            enemy.height = enemy.sprites.goblinDeathRight.height
            enemy.image = enemy.sprites.goblinDeathRight.image 
            enemy.offset.x = enemy.sprites.goblinDeathRight.offset.x
            enemy.offset.y = enemy.sprites.goblinDeathRight.offset.y
        }
    } else if(enemy.hurt && !enemy.dying){
        if(enemy.direction === 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinHurtLeft.framesMax
            enemy.width = enemy.sprites.goblinHurtLeft.width
            enemy.height = enemy.sprites.goblinHurtLeft.height
            enemy.image = enemy.sprites.goblinHurtLeft.image 
            enemy.offset.x = enemy.sprites.goblinHurtLeft.offset.x
            enemy.offset.y = enemy.sprites.goblinHurtLeft.offset.y
        } if(enemy.direction === 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinHurtRight.framesMax
            enemy.width = enemy.sprites.goblinHurtRight.width
            enemy.height = enemy.sprites.goblinHurtRight.height
            enemy.image = enemy.sprites.goblinHurtRight.image 
            enemy.offset.x = enemy.sprites.goblinHurtRight.offset.x
            enemy.offset.y = enemy.sprites.goblinHurtRight.offset.y
        }
    } else if (!enemy.hurt && !enemy.dying && enemy.alive && !enemy.waiting){
        if(enemy.position.x >= player.position.x && !enemy.waiting){
            enemy.direction = 'left'
            enemy.position.x -= .6
            enemy.width = enemy.sprites.goblinLeft.width
            enemy.height = enemy.sprites.goblinLeft.height
            enemy.image = enemy.sprites.goblinLeft.image
            enemy.framesMax = enemy.sprites.goblinLeft.framesMax
            enemy.offset.x = enemy.sprites.goblinLeft.offset.x
            enemy.offset.y = enemy.sprites.goblinLeft.offset.y
        }
        if(enemy.position.x <= player.position.x && !enemy.waiting){
            enemy.direction = 'right'
            enemy.position.x += .6
            enemy.width = enemy.sprites.goblinRight.width
            enemy.height = enemy.sprites.goblinRight.height
            enemy.image = enemy.sprites.goblinRight.image
            enemy.framesMax = enemy.sprites.goblinRight.framesMax
            enemy.offset.x = enemy.sprites.goblinRight.offset.x
            enemy.offset.y = enemy.sprites.goblinRight.offset.y           
        }
        if(enemy.position.y >= player.position.y + 15 && !enemy.waiting){
            enemy.position.y -= .6
        }
        if(enemy.position.y <= player.position.y + 15 && !enemy.waiting){
            enemy.position.y += .6
        }
      }
}


const levelOne = (ctx)=>{
    
    if(enemyA.alive){
        goblinAttack(playerModel, enemyA)
        enemyA.update(ctx)
    }
   
    if(enemyB.alive){
        goblinAttack(playerModel, enemyB)
        enemyB.update(ctx)
    }
    if(enemyC.alive){
        goblinAttack(playerModel, enemyC)
        enemyC.update(ctx)
    }
    if(enemyD.alive){
        goblinAttack(playerModel, enemyD)
        enemyD.update(ctx)
    }
    door.update(ctx)

    if(enemyA.alive === false && enemyB.alive === false && enemyC.alive === false && enemyD.alive === false){
        level = 2
        
        spikeA.alive = true
        enemyA.alive = true
        enemyB.alive = true
        enemyC.alive = true
        enemyD.alive = true
        enemyA.health = 4
        enemyB.health = 4
        enemyC.health = 4
        enemyD.health = 4
        enemyA.position.x = 40
        enemyA.position.y = 70
        enemyB.position.x = 630
        enemyB.position.y = 70
        enemyC.position.x = 40
        enemyC.position.y = 400
        enemyD.position.x = 630
        enemyD.position.y = 400
    }
}

const levelTwo = (ctx) =>{
    if(enemyA.alive){
        houndAttack(playerModel, enemyA)
        enemyA.update(ctx)
    }
   
    if(enemyB.alive){
        houndAttack(playerModel, enemyB)
        enemyB.update(ctx)
    }
    if(enemyC.alive){
        houndAttack(playerModel, enemyC)
        enemyC.update(ctx)
    }
    if(enemyD.alive){
        houndAttack(playerModel, enemyD)
        enemyD.update(ctx)
    }


    if(spikeA.alive){
        spikeA.update(ctx)
    }
    door.update(ctx)

    if(enemyA.alive === false && enemyB.alive === false && enemyC.alive === false && enemyD.alive === false){
        level = 3
        
    }
}
let roomOver = false
const levelThree = (ctx) =>{
    if(spikeA.alive){
        spikeA.update(ctx)
    }
    door.update(ctx)
}
const levelFour = (ctx) =>{
  if(survivorRoomOne.notSafe){
        survivorRoomOne.update(ctx)
    }
    chest.update(ctx)
    door.update(ctx)
    if(spikeB.alive){
        spikeB.update(ctx)
    }
    if(level === 4 && survivorRoomOne.notSafe === false){
        dialogue = true
        // message.classList.remove('hidden')
        // message.innerText = 'Oh my gosh, thank you so much for coming to save me. Here is one gold as a token of my appreciation. Good luck getting that chest full of gold open!'
        // continueButton.classList.remove('hidden')
        // continueButton.innerText = `Press 'Enter' to Continue`
        
        window.addEventListener('keydown', (e)=>{if(e.key === 'Enter' && level === 4){
            dialogue = false
            // message.classList.add('hidden')
            // continueButton.classList.add('hidden')
                        
            level = 5
            reaper.position.x = 100
            reaper.position.y = 240
            intermission = false
            reaper.alive = true
            reaperBlink()
            enemyA.alive = false
            enemyB.alive = false
            enemyC.alive = false
            enemyD.alive = false
            reaper.health = 20
        }})
      
    }
}
const levelFive = (ctx) =>{
    if(reaper.alive){
        reaperAttack(playerModel, reaper)
        reaper.update(ctx)
    }
    chest.update(ctx)
    door.update(ctx)
    if(spikeB.alive){
        spikeB.update(ctx)
    }

    if(reaper.health <= 8){
        level = 6
        intermission = true
        spikeC.alive = true
        enemyA.alive = true
        enemyB.alive = true
        enemyC.alive = true
        enemyD.alive = true
        enemyA.health = 4
        enemyB.health = 4
        enemyC.health = 4
        enemyD.health = 4
        enemyA.position.x = 40
        enemyA.position.y = 70
        enemyB.position.x = 630
        enemyB.position.y = 70
        enemyC.position.x = 40
        enemyC.position.y = 400
        enemyD.position.x = 630
        enemyD.position.y = 400
    }

}
const levelSix = (ctx) =>{

    if(reaper.alive){
        reaperAttack(playerModel, reaper)
        reaper.update(ctx)
    }
    if(enemyA.alive){
        houndAttack(playerModel, enemyA)
        enemyA.update(ctx)
    }
    if(enemyB.alive){
        houndAttack(playerModel, enemyB)
        enemyB.update(ctx)
    }
    if(enemyC.alive){
        houndAttack(playerModel, enemyC)
        enemyC.update(ctx)
    }
    if(enemyD.alive){
        houndAttack(playerModel,enemyD)
        enemyD.update(ctx)
    }
    chest.update(ctx)
    door.update(ctx)
    if(spikeB.alive){
        spikeB.update(ctx)
    }
    if(spikeC.alive){
        spikeC.update(ctx)
    }
   

    if(enemyA.alive === false && enemyB.alive === false && enemyC.alive === false && enemyD.alive === false){
        
        level = 7
        intermission = false
        enemyA.alive = true
        enemyB.alive = true
        enemyC.alive = true
        enemyD.alive = true
        enemyA.health = 5
        enemyB.health = 5
        enemyC.health = 5
        enemyD.health = 5
        enemyA.position.x = 40
        enemyA.position.y = 70
        enemyB.position.x = 630
        enemyB.position.y = 70
        enemyC.position.x = 630
        enemyC.position.y = 400
        enemyD.position.x = 40
        enemyD.position.y = 400

    }
}
const levelSeven = (ctx) =>{

    if(reaper.alive){
        reaperAttack(playerModel, reaper)
        reaper.update(ctx)
    }
    if(enemyA.alive){
        goblinAttack(playerModel, enemyA)
        enemyA.update(ctx)
    }
    if(enemyB.alive){
        goblinAttack(playerModel, enemyB)
        enemyB.update(ctx)
    }
    if(enemyC.alive){
        goblinAttack(playerModel, enemyC)
        enemyC.update(ctx)
    }
    if(enemyD.alive){
        goblinAttack(playerModel,enemyD)
        enemyD.update(ctx)
    }
    chest.update(ctx)
    door.update(ctx)
    if(spikeB.alive){
        spikeB.update(ctx)
    }
    if(spikeC.alive){
        spikeC.update(ctx)
    }
    if(reaper.alive === false && enemyA.alive === false && enemyB.alive === false && enemyC.alive === false && enemyD.alive === false){
        
        level = 8
        bossDead = true
        key.alive = true
        chest.alive = true
    }
}
const levelEight = (ctx)=>{
    chest.update(ctx)
    door.update(ctx)
    if(key.alive){
        key.update(ctx)
    }
    if(chest.alive === false){
        dialogue = true
        // message.classList.remove('hidden')
        // message.innerText = '...it\'s empty...'
        // continueButton.classList.remove('hidden')
        // continueButton.innerText = `Press 'k' to Continue`
        window.addEventListener('keydown', (e)=>{if(e.key === 'Enter'){
            dialogue = false
            // message.classList.add('hidden')
            // continueButton.classList.add('hidden')
            
            level = 9
            enemyA.alive = false
            enemyB.alive = false
            enemyC.alive = false
            enemyD.alive = false
            reaper.alive = false


        }})
    }
}
const levelNine = (ctx)=>{
    // message.classList.add('hidden')
    // continueButton.classList.add('hidden')
    chest.image = chest.sprites.open.image
    chest.offset.x = 55
    chest.offset.y = 60
    chest.update(ctx)
    door.update(ctx)
    
}
const gameState=(ctx)=>{
    if(!gameStart && level === 1){
        window.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter' && level === 1){
                // message.classList.add('hidden')
                // continueButton.classList.add('hidden')
                gameStart = true
                playerModel.alive = true
                enemyA.alive = true
                enemyB.alive = true
                enemyC.alive = true
                enemyD.alive = true
            }
        })
    }
    if(gameLost){
        // message.innerText = 'Looks like you weren\'t strong enough this time, try again?'
        // message.classList.remove('hidden')
        // message.style.backgroundColor = 'red'
        // continueButton.classList.remove('hidden')
        // continueButton.innerText = `Press 'Enter' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter' && gameLost === true){

                level = 1
                enemyA.alive = true
                enemyB.alive = true
                enemyC.alive = true
                enemyD.alive = true
                reaper.position.x = 100
                reaper.position.y = 240
                reaper.alive = false
                reaper.health = 20
                enemyA.health = 5
                enemyB.health = 5
                enemyC.health = 5
                enemyD.health = 5
                enemyA.position.x = 650
                enemyA.position.y = 400
                enemyB.position.x = 410
                enemyB.position.y = 300
                enemyC.position.x = 400
                enemyC.position.y = 400
                enemyD.position.x = 500
                enemyD.position.y = 100
                dying = false
                moved = false
                playerModel.alive = true
                playerModel.position.x = 50
                playerModel.position.y = 70
                playerModel.health = 20
                spikeCount = 5
                                
                // message.classList.add('hidden')
                // continueButton.classList.add('hidden')
                door.image = door.sprites.door.image
                door.scale = 1
                door.position.x = 666
                door.position.y = 200
                door.offset.x = door.sprites.door.offset.x
                door.offset.y = door.sprites.door.offset.y
                gameLost = false
            }})
    }
    if(gameStart){
        if(level === 1){
            // objective.innerText = 'Slay all the goblins!'
            levelOne(ctx)
        } else if (level === 2){
            // objective.innerText = 'Careful, hounds!'
            levelTwo(ctx)
        } else if (level === 3){
            // objective.innerText = 'Go find Bebo!'
            levelThree(ctx)
        } else if (level === 4){
            // objective.innerText = 'Oh, there he is.'
            levelFour(ctx)
        } else if (level === 5){
            // objective.innerText = 'What\'s that????'
            levelFive(ctx)
        } else if (level === 6){
            // objective.innerText = 'More hounds?!?!'
            levelSix(ctx)
        } else if (level === 7){
            // objective.innerText = 'Don\'t die...'
            levelSeven(ctx)
        } else if (level === 8){
            // objective.innerText = 'Collect your prize.'
            levelEight(ctx)
        } else if(level === 9){
            levelNine(ctx)
            // objective.innerText = 'Leave dissappointed'
        }
    }  
    if(gameWon){
        
        // message.innerText = 'Well, you saved Bebo... but you only came out with 1 measely gold. But hey, that\'s 1 more gold than before. Take an extra point on the house!'
        // message.classList.remove('hidden')
        // message.style.backgroundColor = 'skyblue'
        // continueButton.classList.remove('hidden')
        // continueButton.innerText = `Press 'Enter' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter' && gameWon === true){
                level = 1
                enemyA.alive = true
                enemyB.alive = true
                enemyC.alive = true
                enemyD.alive = true
                reaper.alive = false
                reaper.health = 20
                enemyA.health = 5
                enemyB.health = 5
                enemyC.health = 5
                enemyD.health = 5
                enemyA.position.x = 650
                enemyA.position.y = 400
                enemyB.position.x = 410
                enemyB.position.y = 300
                enemyC.position.x = 400
                enemyC.position.y = 400
                enemyD.position.x = 500
                enemyD.position.y = 100
                playerModel.alive = true
                dying = false
                moved = false
                playerModel.position.x = 50
                playerModel.position.y = 70
                playerModel.health = 20
                spikeCount = 5
                                  
                // message.classList.add('hidden')
                // continueButton.classList.add('hidden')
                door.image = door.sprites.door.image
                door.scale = 1
                door.position.x = 666
                door.position.y = 200
                door.offset.x = door.sprites.door.offset.x
                door.offset.y = door.sprites.door.offset.y
                gameWon = false
            }})
    }

}

const lastKeyPressed = ()=>{
    if(!attacking){
    if(keys.a.pressed){
        lastKey = 'a'
    } else if(keys.d.pressed){
        lastKey = 'd'
    }else if(keys.w.pressed){
        lastKey = 'w'
    }  else if (keys.s.pressed){
        lastKey = 's'
    }
    }
}
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w':
            if(!attacking && !dialogue && !hurt){
                keys.w.pressed = true
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'a':
            if(!attacking && !dialogue && !hurt){
                keys.a.pressed = true  
                lastKeyPressed()  
                moving = true
                moved = true
            }
            break
        case 's':
            if(!attacking && !dialogue && !hurt){
                keys.s.pressed = true
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'd':
            if(!attacking && !dialogue && !hurt){
                keys.d.pressed = true 
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'j':
            if(playerModel.alive &&  !bossDead && !dialogue && !attacking && !swimming && !hurt){
                playerModel.attack()
                attacking = true
                
            }
            break
        case 'l': 
        if(playerModel.alive && spikeCount >= 1 && !dialogue && moved && !hurt){
            // spikeDirection()
            spikeCount -= 1
            }
            break
        case 'k':
            if(playerModel.alive && !dialogue && moved && !onCooldown){
                if(swimming === true){
                    swimming = false
                    onCooldown = true
                    swimCurrentFrame = 0
                    swimFramesElaped = 0
                } else{
                    swimming = true
                }
                
                swimFrames()
            }
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'w':
            keys.w.pressed = false 
            lastKeyPressed()
            break
        case 'a':
            keys.a.pressed = false 
            lastKeyPressed()
            break
        case 's':
            keys.s.pressed = false 
            lastKeyPressed()
            break
        case 'd':
            keys.d.pressed = false 
            lastKeyPressed()
            break
    }
})

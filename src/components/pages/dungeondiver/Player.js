export function PlayerMovement(ctx){
    
    movementFrames()
    idleDirection()
    diveTimer(ctx)
    playerModel.update(ctx)

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
        // if(this.isAttacking === true){
        //     ctx.fillStyle = 'black'
        //     if(lastKey === 'w'){  
        //         ctx.fillRect(this.attackBox.up.position.x, this.attackBox.up.position.y -25, this.attackBox.up.width, this.attackBox.up.height)
        //     } else if (lastKey === 'a') {
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

let runFramesElaped = 0
let runCurrentFrame = 0
let runFramesMax = 6
let runFramesHold = 7


let idleframesElaped = 0
let idleCurrentFrame = 0
let idlePrevFrame = 0
let idleframesMax = 5
let idleframesHold = 10
const movementFrames = ()=>{
    if(!attacking && !dying && !hurt){
            runFramesElaped++
            if(runFramesElaped % runFramesHold === 0){  
                if(runCurrentFrame < runFramesMax - 1){
                    runCurrentFrame++
                } else {
                    runCurrentFrame = 0
                }
            }
            idleframesElaped++
            if(idleframesElaped % idleframesHold === 0){  
                if(idleCurrentFrame < idleframesMax - 1){
                    idleCurrentFrame++
                } else {
                    idleCurrentFrame = 0
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
        if(idleframesElaped % idleframesHold === 0){  
            if(idleCurrentFrame < idleframesMax - 1){
                idlePrevFrame = idleCurrentFrame
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
let swimming = false
let swimFramesElaped = 0
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
        playerModel.image.src = `/dungeondiversprites/playerModel/swim/swimD/golem-swim-d-0${swimCurrentFrame}.png`
    } else if (keys.d.pressed ||  lastKey === 'd'){
        playerModel.width = playerModel.sprites.swimRight.width
        playerModel.height = playerModel.sprites.swimRight.height
        playerModel.offset.x = playerModel.sprites.swimRight.offset.x
        playerModel.offset.y = playerModel.sprites.swimRight.offset.y
        // playerModel.image.src = `./images/playerModel/swim/swimR/golem-swim-r-0${swimCurrentFrame}.png`
    } else if (keys.d.pressed ||  lastKey === 'd'){
        playerModel.width = playerModel.sprites.swimRight.width
        playerModel.height = playerModel.sprites.swimRight.height
        playerModel.offset.x = playerModel.sprites.swimRight.offset.x
        playerModel.offset.y = playerModel.sprites.swimRight.offset.y
        // playerModel.image.src = `./images/playerModel/swim/swimR/golem-swim-r-0${swimCurrentFrame}.png`
    } else if(keys.a.pressed ||  lastKey === 'a'){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimLeft.offset.x
        playerModel.offset.y = playerModel.sprites.swimLeft.offset.y
        // playerModel.image.src = `./images/playerModel/swim/swimL/golem-swim-l-0${swimCurrentFrame}.png`
    } else if(keys.w.pressed ||  lastKey === 'w'){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimUnD.offset.x
        playerModel.offset.y = playerModel.sprites.swimUnD.offset.y
        // playerModel.image.src = `./images/playerModel/swim/swimU/golem-swim-u-0${swimCurrentFrame}.png`
    } else if(keys.s.pressed ||  lastKey === 's'){
        playerModel.width = playerModel.sprites.swimLeft.width
        playerModel.height = playerModel.sprites.swimLeft.height
        playerModel.offset.x = playerModel.sprites.swimUnD.offset.x
        playerModel.offset.y = playerModel.sprites.swimUnD.offset.y
        // playerModel.image.src = `./images/playerModel/swim/swimD/golem-swim-d-0${swimCurrentFrame}.png`
    } 
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

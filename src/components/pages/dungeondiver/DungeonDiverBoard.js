import { useEffect, useRef } from "react"
import { PlayerMovement } from "./Player";

export default function DungeonDiverBoard(){
    const canvasRef = useRef(null);
    
    useEffect(()=>{
        const render = () =>{
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            
            ctx.fillStyle = 'gray'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            

            PlayerMovement(ctx)
            // console.log('yo')
            
            requestAnimationFrame(render)
        }
        render()
    }, [])
    return(
        <canvas id="canvas" ref={canvasRef}  height={520} width={700} />
    )
}
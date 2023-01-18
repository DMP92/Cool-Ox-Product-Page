import './style.css'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import Micelle from './Micelle.js'
import { Leva } from 'leva'
import { StrictMode } from 'react'
import { ScrollControls, Scroll } from '@react-three/drei'


console.log(Micelle)

const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>

        <Leva collapsed />

        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 0, 5 ],
                className:"canvas"
            }}
        >

            {/* <Scroll /> */}
            <ScrollControls pages={20}>
                <Scroll>
                    
                </Scroll>
                    <Experience />
            </ScrollControls>
        
        </Canvas>
        
    </StrictMode>
)
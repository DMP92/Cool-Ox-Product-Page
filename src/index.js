import './style.css'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva } from 'leva'
import { StrictMode } from 'react'

const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Leva />
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 0, 5 ]
            }}
        >
            <Experience />
        </Canvas>
    </StrictMode>
)
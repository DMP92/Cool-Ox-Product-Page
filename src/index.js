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
            <ScrollControls pages={10} damping={ 0.15 } >
                <Scroll>
                    {/* <PresentationControls
                        global
                        rotation={ [ 0.13, 0.1, 0] }
                        polar={ [ -0.4, 0.2 ] }
                        azimuth={ [ -1, 0.75 ] }
                        config={ { mass: 2, tension: 400 } }
                        snap={ { mass: 4, tension: 400 } }
                    >
                    </PresentationControls> */}
                </Scroll>
                    <Experience />
            </ScrollControls>
        
        </Canvas>
        
    </StrictMode>
)
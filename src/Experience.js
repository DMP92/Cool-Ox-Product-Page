import { OrbitControls, Sparkles, useGLTF, PresentationControls, Environment, Html, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import Micelle from './Micelle.js'
import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber'
import React, { useState, useRef, useEffect } from 'react'
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing'

export default function Experience()
{
    // Renderer
    const [ render, setRender ] = React.useState(true)
    console.log(render)

    const micelle = useRef()
    const scroll = useScroll()

    useFrame((state, delta) =>
    {
        // Mouseover Parallax Effect
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.3, 0.02)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.5, 0.007)
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, Math.max(5, Math.abs(state.mouse.x * state.mouse.y * 8)), 0.01)
        state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, state.mouse.x * -Math.PI * 0.025, 0.001)
        
        
        scroll.scroll.current >= 1 ? setRender(false) : setRender(true)
        // console.log(mouse)
    })

    return <>
        {/* Debug */}
        <Perf position="top-left"/>

        {/* Lights */}
            <Sparkles 
                scale={ [ 5, 25, 5 ] }
                count={ 500 }
                noise={ [ 0.25, 0.25, 0.25 ]}
                speed={ 0.2}
                size={ 1 }
                color="white"
            />

            <directionalLight intensity={ 1 } position={ [ -5, 1, 8 ] }/>
            <ambientLight intensity={ 0.3 }/>
            <Environment preset='city' />
            
         
                    

            {/* Components */}
            { render && <Micelle /> }
            <EffectComposer>
                <SSAO 
                    samples={7} // amount of samples per pixel (shouldn't be a multiple of the ring count)
                    rings={4} // amount of rings in the occlusion sampling pattern
                    distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
                    distanceFalloff={0.0} // distance falloff. min: 0, max: 1
                    rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
                    rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
                    luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
                    intensity={ 50 }
                    radius={20} // occlusion sampling radius
                    scale={0.5} // scale of the ambient occlusion
                    bias={0.5} // occlusion bias
                    color="red"
                ></SSAO>
                <Bloom intensity={1.25} kernelSize={3} luminanceThreshold={0.5} luminanceSmoothing={0.0} />
            </EffectComposer>
        {/* <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0] }
            polar={ [ -0.4, 0.2 ] }
            azimuth={ [ -1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
        </PresentationControls> */}
        

    </>
}
import { OrbitControls, useGLTF, PresentationControls, Environment, Html, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import Micelle from './Micelle.js'
import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber'
import React, { useState, useRef, useEffect } from 'react'

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
        
        
        console.log(scroll.offset)
        scroll.offset === 1 ? setRender(false) : setRender(true)
        console.log(- scroll.offset)
        // console.log(mouse)
    })

    return <>
        {/* Debug */}
        <Perf position="top-left"/>

        {/* Lights */}
        <directionalLight intensity={ 1 } position={ [ -5, 1, 8 ] }/>
        <ambientLight intensity={ 0.3 }/>
        <Environment preset='city' />

        {/* Components */}
        { render && <Micelle /> }

        

    </>
}
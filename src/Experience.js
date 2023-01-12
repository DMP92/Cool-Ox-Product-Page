import { OrbitControls, useGLTF, PresentationControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import Micelle from './Micelle.js'
import { Perf } from 'r3f-perf'
import useScroll from './stores/useScroll.js'

export default function Experience()
{
    const scroll = useScroll((state) => state)
    console.log(scroll)
    return <>
        <Perf position="top-left"/>
        {/* <OrbitControls /> */}
        <directionalLight intensity={ 1 } position={ [ -5, 1, 8 ] }/>
        <ambientLight intensity={ 0.3 }/>
        <Environment preset='city' />

        {/* <mesh>
            <boxGeometry args={ [ 1, 1 ] } />
            <meshStandardMaterial color={"red"} />
        </mesh> */}

        {/* <Scroll /> */}

        <PresentationControls
             global
            rotation={ [ 0.13, 0.1, 0] }
            polar={ [ -0.4, 0.2 ] }
            azimuth={ [ -1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
            <Micelle />
        </PresentationControls>

    </>
}
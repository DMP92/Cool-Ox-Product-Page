import { OrbitControls, useGLTF, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'
import Micelle from './Micelle.js'
import Scroll from './Scroll.js'

export default function Experience()
{


    return <>
        {/* <OrbitControls /> */}
        <directionalLight intensity={ 1.5 } position={ [ 2, 1, 8 ] }/>
        <ambientLight intensity={ 0.8 }/>

        {/* <mesh>
            <boxGeometry args={ [ 1, 1 ] } />
            <meshStandardMaterial color={"red"} />
        </mesh> */}

        <Scroll />

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
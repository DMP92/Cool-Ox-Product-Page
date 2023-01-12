import { useGLTF, Text, Float } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Micelle()
{
    const { nodes, materials, scene } = useGLTF('./micelleExport.glb')

    const micelle = useRef()
    const standardRotation = 0

    useFrame((state, delta) => 
    {
        const elapsedTime = state.clock.getElapsedTime()

        // micelle controls
        const standardRotation = delta / 3

        // Rotate Micelle
        micelle.current.rotation.y += standardRotation

        return {
            standardRotation
        }
    }, [])

    console.log(nodes, materials)
    return <>
        <Perf />
        <group 
            ref={micelle} 
            position={ [ 0, 0, 0 ] }
            rotation-y={ standardRotation }    
        >
            {/* Micelle Heads */}
            <mesh
                geometry={ nodes.headsLeft.geometry }
                material={ nodes.headsLeft.material}
                scale={ 0.8 }
            >
                {/* <meshStandardMaterial color={ 'purple' } flatShading/> */}
            </mesh>

            <mesh
                geometry={ nodes.headsRight.geometry }
                material={ nodes.headsRight.material}
                scale={ 0.8 }
            >
                {/* <meshStandardMaterial color={ 'purple' } flatShading/> */}
            </mesh>

            {/* Micelle Tails */}
            <mesh
                geometry={ nodes.tailsLeft.geometry }
                material={ nodes.tailsLeft.material}
                scale={ 0.8 }
            >
                {/* <meshStandardMaterial color={ 'purple' } flatShading/> */}
            </mesh>

            <mesh
                geometry={ nodes.tailsRight.geometry }
                material={ nodes.tailsRight.material}
                scale={ 0.8 }
            >
                {/* <meshStandardMaterial color={ 'purple' } flatShading/> */}
            </mesh>

            {/* Contaminant */}
            <mesh
                geometry={ nodes.contaminant.geometry }
                material={ nodes.contaminant.material}
                scale={ 0.8 }
            >
                {/* <meshStandardMaterial color={ 'purple' } flatShading/> */}
            </mesh>
        </group>
    </>
}
import { useGLTF, Text, Float, ScrollControls, Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Micelle()
{
    const { nodes, materials, scene } = useGLTF('./micelleExport.glb')

    const micelle = useRef()
    const standardRotation = 0

    useFrame(({ mouse, camera}) => 
    {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.3, 0.02)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.5, 0.007)
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(5, Math.abs(mouse.x * mouse.y * 8)), 0.01)
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.025, 0.001)
        // const elapsedTime = state.clock.getElapsedTime()

        // // micelle controls
        // const standardRotation = delta / 3

        // // Rotate Micelle
        // micelle.current.rotation.y += standardRotation

        // console.log(state.scene)

        return {
            standardRotation
        }
    }, [])

    console.log(nodes, materials)
    return <>

        <Float
            rotationIntensity={ 0.4 }
        >
            <Text 
                font={"./ClashDisplay-Semibold.woff"}
                fontSize={ 0.2 }
                position={ [ 0.5, 1, 1.25 ] }
                rotation-y={ - 0.0 }
                maxWidth={ 3 }
                textAlign="center"
                lineHeight={ 0.8 }
                color={ "white" }
            >
                Cool-Ox
            </Text>

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
        </Float>
    </>
}
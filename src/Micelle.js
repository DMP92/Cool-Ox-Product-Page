import { useGLTF, Text, Float, ScrollControls, Environment, Html, softShadows, useScroll, Sparkles } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Micelle({ mouse })
{
    const { nodes, materials, scene } = useGLTF('./micelleExport.glb')
   
    const scroll = useScroll()
    console.log(scroll)
    const micelle = useRef()
    const standardRotation = 0

    useFrame((state, delta) => 
    {
       console.log(state.mouse)
       console.log(scroll.horizontal)
        return {
        }
    }, [])

    console.log(nodes, materials)
    return <>

        <Float
            rotationIntensity={ 0.4 }
        >
            <Sparkles 
                scale={ [ 5, 25, 5 ] }
                count={ 1000 }
                noise={ [ 0.25, 0.25, 0.25 ]}
                speed={ 0.2}
            />
            <group>
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

                <Text 
                    font={"./ClashDisplay-Regular.woff"}
                    fontSize={ 0.1 }
                    position={ [ 0.30, 0.85, 1.25 ] }
                    rotation-y={ - 0.0 }
                    maxWidth={ 3 }
                    textAlign="left"
                    lineHeight={ 0.8 }
                    color={ "white" }
                >
                    Cool-Ox
                </Text>
            </group>
            

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
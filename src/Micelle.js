import { useGLTF, Text, Float, ScrollControls, Environment, Html, softShadows, useScroll, Sparkles, useTexture } from "@react-three/drei"
import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import useRefs from 'react-use-refs'

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

export default function Micelle({ mouse })
{
    const { nodes, materials, scene } = useGLTF('./micelleExport.glb')
    const blueMats = useTexture('./heads-matcap.png')
   
    const scroll = useScroll()
    const { width, height } = useThree((state) => state.viewport)

    console.log(scroll)
    const micelle = useRef()
    const standardRotation = 0

    const [ group, right, left, contaminant ] = useRefs()

    useFrame((state, delta) => 
    {
       const r1 = scroll.range(0 / 4, 1 / 4)
        const r2 = scroll.range(1 / 4, 1 / 4)
        const r3 = scroll.visible(4 / 5, 1 / 5)
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (-Math.PI / 5) * r2, 0.01, delta)
        group.current.position.x = THREE.MathUtils.damp(group.current.position.x, (-width / 7) * r2, 0.01, delta)
        group.current.position.y = THREE.MathUtils.damp(group.current.position.y, -height * r2, 4, delta)
        group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 5, delta)
        group.current.rotation.y = - Math.PI + (Math.PI / 2) * rsqw(r1) + r2 * 0.33
        // left.current.rotation.y = Math.PI + (Math.PI / 2) * rsqw(r1) - r2 * 0.39
        // right.current.position.x = (Math.PI + (Math.PI / 2) * rsqw(r1) + r2 * 0.33) / 5
        // left.current.position.x = (Math.PI - (Math.PI / 2) * rsqw(r1) - r2 * 0.39) / 5
        console.log(r2, r1, r3)
    })

    console.log(nodes, materials)
    return <>

        <Float
            rotationIntensity={ 0.4 }
        >
            <Sparkles 
                scale={ [ 5, 25, 5 ] }
                count={ 500 }
                noise={ [ 0.25, 0.25, 0.25 ]}
                speed={ 0.2}
                size={ 1 }
                color="#2a2a2e"
            />
            <group>
                <Text 
                    font={"./ClashDisplay-Semibold.woff"}
                    fontSize={ 0.2 }
                    position={ [ 0.5, 1.15, 1.25 ] }
                    rotation-y={ - 0.0 }
                    maxWidth={ 3 }
                    textAlign="center"
                    lineHeight={ 0.8 }
                    color={ "black" }
                >
                    Cool-Ox
                </Text>

                <Text 
                    font={"./ClashDisplay-Regular.woff"}
                    fontSize={ 0.1 }
                    position={ [ 0.30, 1, 1.25 ] }
                    rotation-y={ - 0.0 }
                    maxWidth={ 3 }
                    textAlign="left"
                    lineHeight={ 0.8 }
                    color={ "black" }
                >
                    Cool-Ox
                </Text>
            </group>
            

            <group 
                ref={ group } 
                rotation-y={ standardRotation } 
                position={ [ 0, -width * 0.7, 0 ] }  
            >
                {/* Micelle Left */}
                <group
                    ref={ left }
                >
                    <mesh
                        geometry={ nodes.headsLeft.geometry }
                        material={ nodes.headsLeft.material}
                        scale={ 0.8 }
                    >
                        {/* <meshStandardMaterial color={ 'purple' }  roughness={ 0.7 } envMapIntensity={ 0.2 } emissive="#135675" map={ blueMats } emissiveIntensity={ 0.05 }/> */}
                    </mesh>

                    <mesh
                        geometry={ nodes.tailsLeft.geometry }
                        material={ nodes.tailsLeft.material}
                        scale={ 0.8 }
                    >
                        {/* <meshStandardMaterial color={ 'purple' } flatShading/> */}
                    </mesh>
                </group>

                {/* Micelle Right */}
                <group 
                    ref={ right }
                >
                    <mesh
                        geometry={ nodes.headsRight.geometry }
                        material={ nodes.headsRight.material}
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
                </group>



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
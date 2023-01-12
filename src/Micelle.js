import { useGLTF, Text, Float, ScrollControls, Environment, Html, softShadows, useScroll, Sparkles, useTexture } from "@react-three/drei"
import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import useRefs from 'react-use-refs'

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

export default function Micelle({ mouse })
{
    const { nodes, materials, scene } = useGLTF('./micelle-export-final.glb')
    const blueMats = useTexture('./heads-matcap.png')
   
    const scroll = useScroll()
    const { width, height } = useThree((state) => state.viewport)

    console.log(scroll)
    const micelle = useRef()
    const text = useRef()

    const standardRotation = 0

    const [ group, right, left, contaminant ] = useRefs()

    const canvas = document.querySelector('canvas')

    useFrame((state, delta) => 
    {
        const r1 = scroll.range(0 / 4, 3.5 / 4)
        const r2 = scroll.range(3.5 / 4, 3.9 / 4)
        const r3 = scroll.visible(4 / 5, 1 / 5)

        const et = state.clock.getElapsedTime
        const offset = 1 - scroll.offset

        // group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (-Math.PI / 5) * r2, 0.01, delta)
        // group.current.position.x = THREE.MathUtils.damp(group.current.position.x, (-width / 7) * r2, 0.01, delta)
        // group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 5, delta)
        // group.current.rotation.y = - Math.PI + (Math.PI / 2) * rsqw(r1) + r2 * 0.33
        // // left.current.rotation.y = Math.PI + (Math.PI / 2) * rsqw(r1) - r2 * 0.39
        group.current.position.y = - scroll.offset * 0.5
        text.current.position.y = - scroll.offset * 0.5

        if (scroll.offset > 0)
        {
            group.current.rotation.y = - THREE.MathUtils.damp(right.current.rotation.y, scroll.offset * 7, 0.1, delta)
            group.current.position.z = THREE.MathUtils.damp(group.current.position.z, scroll.offset * 1.5, 5, delta)

            right.current.rotation.y = THREE.MathUtils.damp(right.current.rotation.y, scroll.offset * 0.85, 4, delta)
            right.current.position.x =  THREE.MathUtils.damp(right.current.position.x, scroll.offset * 1, 4, delta)

            left.current.rotation.y = THREE.MathUtils.damp(left.current.rotation.y, - scroll.offset * 0.85, 4, delta)
            left.current.position.x = THREE.MathUtils.damp(left.current.position.x, - scroll.offset * 1, 4, delta)
            // left.current.position.z = THREE.MathUtils.damp(left.current.position.z, - scroll.offset * 2, 4, delta)

            contaminant.current.position.z = THREE.MathUtils.damp(contaminant.current.position.z, scroll.offset * 1.2, 5, delta)
        }

        // if (scroll.offset >= 0.5) group.current.position.z = THREE.MathUtils.damp(group.current.position.x, scroll.offset * 50, 2, delta)
        
        // right.current.position.x = (Math.PI + (Math.PI / 2) * rsqw(r1) + r2 * 0.33) / 5
        // left.current.position.x = (Math.PI - (Math.PI / 2) * rsqw(r1) - r2 * 0.39) / 5
        console.log('scroll offset', offset)
        // console.log(THREE.MathUtils.damp(group.current.position.y, -height * r2, 4, delta), scroll.offset)
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
            
            <group ref={ text }>
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
                position={ [ 0, -height / 2.65, 0 ] }  
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
                    ref={ contaminant }
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
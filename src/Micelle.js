import { useGLTF, Text, Float, ScrollControls, MeshTransmissionMaterial, Environment, Html, softShadows, useScroll, Sparkles, useTexture } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { useFrame, useThree, Canvas, useLoader } from "@react-three/fiber"
import { useControls } from 'leva'
import * as THREE from 'three'
import useRefs from 'react-use-refs'
import { TextureLoader } from "three/src/loaders/TextureLoader"

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)


export default function Micelle({ mouse })
{
    const { nodes, materials, scene } = useGLTF('./micelle-export-final.glb')
    const { width, height } = useThree((state) => state.viewport)
    const scroll = useScroll()
    
    // References
    const [ group, right, left, contaminant ] = useRefs()
    const micelle = useRef()
    const text = useRef()

    // Micelle Texture - Possibly
    const blueMats = useTexture('heads-matcap.png')
    
    // Contaminant Textures
    // const contaminantColor = useTexture('./RoadDirt017_COL_3k-min-min.png')
    // const contaminantNRM = useTexture('./RoadDirt017_NRM_3k-min (1)-min.png')
    // const contaminantGloss = useTexture('./RoadDirt017_GLOSS_3k-min-min.png')
    // const contaminantAO = useTexture('./RoadDirt017_AO_3k-min-min.png')

    // const contaminantColor = useTexture('RoadDirt017_COL_3k-min.jpg')
    // const contaminantNRM = useTexture('RoadDirt017_NRM_3K-min (1).jpg')
    // const contaminantGloss = useTexture('RoadDirt017_GLOSS_3K-min.jpg')
    // const contaminantAO = useTexture('RoadDirt017_AO_3K-min.jpg')

    // const contaminantColor = useLoader(TextureLoader, 'RoadDirt017_COL_3k-min.jpg')
    // const contaminantNRM = useLoader(TextureLoader, 'RoadDirt017_NRM_3K-min (1).jpg')
    // const contaminantGloss = useLoader(TextureLoader, 'RoadDirt017_GLOSS_3K-min.jpg')
    // const contaminantAO = useLoader(TextureLoader, 'RoadDirt017_AO_3K-min.jpg')

    let meshOpacity = 1

    // Three.js Materials
    const headsMaterial = new THREE.MeshStandardMaterial({
        color: "#243fa8",
        roughness: 0.7,
        envMapIntensity: 0.85, 
        emissive: '#135675', 
        map: blueMats, 
        emissiveIntensity: 0.05,
        opacity: meshOpacity
    })
    
    // const contaminantMaterial = new THREE.MeshStandardMaterial({
    //     color: 'rgba(70, 30, 30, 0.766)',
    //     normalMap: contaminantNRM,
    //     map: contaminantColor,
    //     envMapIntensity: 0.5,
    //     roughnessMap: contaminantGloss,
    //     aoMap: contaminantAO,
    //     roughness: 0.65,
    //     displacementScale: 0.1,
    //     opacity: meshOpacity
    // })

    const config = useControls({
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        samples: { value: 6, min: 1, max: 32, step: 1 },
        resolution: { value: 1024, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.260, min: 0, max: 1, step: 0.01 },
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.13, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0.06, min: 0, max: 1 },
        anisotropy: { value: 0.15, min: 0, max: 1, step: 0.01 },
        distortion: { value: 1.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.55, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        attenuationDistance: { value: 0.61, min: 0, max: 10, step: 0.01 },
        attenuationColor: '#fcdede',
        color: '#ffcece',
        bg: '#000000'
      })



    // console.log(photo)
    const standardRotation = 0
    
    useFrame((state, delta) => 
    {
        const r1 = scroll.range(0, 1 / 10)
        const r2 = scroll.range(1 / 10, 4 / 10)
        const r3 = scroll.range(4 / 10, 6 / 10)
        // const r3 = scroll.visible(4 / 10, 6 / 10)

        const et = state.clock.getElapsedTime
        const offset = 1 - scroll.offset

        contaminant.current.rotation.y += Math.PI * 0.001

        // group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (-Math.PI / 5) * r2, 0.01, delta)
        // group.current.position.x = THREE.MathUtils.damp(group.current.position.x, (-width / 7) * r2, 0.01, delta)
        // group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 5, delta)
        // group.current.rotation.y = - Math.PI + (Math.PI / 2) * rsqw(r1) + r2 * 0.33
        // // left.current.rotation.y = Math.PI + (Math.PI / 2) * rsqw(r1) - r2 * 0.39
        group.current.position.y = - scroll.offset * 0.5
        text.current.position.y = - scroll.offset * 0.5

        if (scroll.offset > 0 )
        {
            // Group Animation
            group.current.rotation.y = - THREE.MathUtils.damp(right.current.rotation.y, r1, 0.1, delta)
            group.current.position.z = THREE.MathUtils.damp(group.current.position.z, r1, 5, delta)
            group.current.position.x = THREE.MathUtils.damp(group.current.position.x, r1 * 0.6, 5, delta)
            // group.current.position.y = THREE.MathUtils.damp(right.current.rotation.y, - r3, 0.1, delta)
            
            // Micelle Right Anim
            right.current.rotation.y = THREE.MathUtils.damp(right.current.rotation.y, r1, 4, delta)
            right.current.position.x =  THREE.MathUtils.damp(right.current.position.x, r1 * 0.4, 4, delta)
            
            // Micelle Left Anim
            left.current.rotation.y = THREE.MathUtils.damp(left.current.rotation.y, - r1, 4, delta)
            left.current.position.x = THREE.MathUtils.damp(left.current.position.x, - r1, 4, delta)
            
            // Micelle Contaminant Anim
            contaminant.current.position.z = THREE.MathUtils.damp(contaminant.current.position.z, r1 * 1.15, 5, delta)
        }

        meshOpacity = offset

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
                color="white"
            />
            
            <group ref={ text }>
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
            
            <Suspense>
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
                            material={ headsMaterial }
                            scale={ 0.8 }
                            roughness={ 0 }
                            metalness={ 1 }
                        >
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
                            material={ headsMaterial }
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
                        scale={ 0.4 }
                        transparent={ true }
                    
                    >
                     <sphereGeometry />
                        <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config }/>
                    </mesh>

                    {/* <mesh
                    position={ [ -1, 0, 1] }
                    >
                        <sphereGeometry />
                        <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config }/>
                    </mesh> */}
                </group>
            </Suspense>
        </Float>
    </>
}
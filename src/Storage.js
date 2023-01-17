// group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.z, (scroll.offset * 4) * - Math.PI * 0.25, 5, delta)
            // group.current.rotation.y = - THREE.MathUtils.damp(right.current.rotation.y, ((scroll.offset * 1.5) * 7) * 4, 0.1, delta)
            // group.current.position.z = THREE.MathUtils.damp(group.current.position.z, ((scroll.offset * 1) * 1.5) * 4, 5, delta)
            // group.current.position.x = THREE.MathUtils.damp(group.current.position.x, ((scroll.offset * 1) * 0.25) * 4, 5, delta)

            // right.current.rotation.y = THREE.MathUtils.damp(right.current.rotation.y, ((scroll.offset * 1) * 1) * 4, 4, delta)
            // right.current.position.x =  THREE.MathUtils.damp(right.current.position.x, ((scroll.offset * 1.2) * 0.5) * 4, 4, delta)

            // left.current.rotation.y = THREE.MathUtils.damp(left.current.rotation.y, - ((scroll.offset * 1) * 0.85) * 4, 4, delta)
            // left.current.position.x = THREE.MathUtils.damp(left.current.position.x, - ((scroll.offset * 1.2) * 1) * 4, 4, delta)
            
            // contaminant.current.position.z = THREE.MathUtils.damp(contaminant.current.position.z, ((scroll.offset * 1.2) * 0.85) * 4, 5, delta)



    /**
     * CONTAMINANT
     */
    
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
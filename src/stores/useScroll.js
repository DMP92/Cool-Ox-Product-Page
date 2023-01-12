import create from 'zustand'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default create((set) =>
{
    return {
        mouse: { x: 0, y: 0 },

        updateMouseX: () =>
        {
            set(() =>
            {
                return console.log('hey')
            })
        },

        updateMouseX: () =>
        {
            set(() =>
            {
                return console.log('hey')
            })
        },
    }
})
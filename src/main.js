import * as THREE from 'three'
import* as dat from 'dat.gui'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import {TimelineMax } from "gsap"

const OrbitControls = require("three-orbit-controls")(THREE)

export default class Sketch {
    constructor(selector) {
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer()
        
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0xeeeeee, 1)

        this.container = document.getElementById(selector)
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.001, 1000)
        this.camera.position.set(0, 0, 2)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.time = 0
        this.paused = false

        this.setupResize()

        this.addObjects()
        
        this.resize()

        this.render()
    }

    settings() {
        this.settings = {
            time: 0
        }
        this.gui = new dat.GUI()
        this.gui.add(this.settings, 'time', 0, 100, 0.01)
    }

    resize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height

        this.camera.updateProjectionMatrix()
    }
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    addObjects() {
        /* // MeshBasicMaterial
        this.material = new THREE.MeshBasicMaterial({
            color: 0xff0f0f,
            side: THREE.DoubleSide
        }) */

        // ShaderMaterial
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                
            }
        })
        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

        this.plane = new THREE.Mesh(this.geometry, this.material)

        this.scene.add(this.plane)
    }

    stop() {
        this.paused = true
    }

    play() {
        this.paused = false
        this.render()
    }

    render() {
        if (this.paused) return
        this.time += 0.05
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
    }
}

new Sketch('container')

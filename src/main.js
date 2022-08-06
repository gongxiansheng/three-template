import * as THREE from 'three'
import * as dat from 'dat.gui'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import { TimelineMax } from "gsap"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import earth from './texture/earth.jpg'

export default class Scene {
    constructor(el) {
        this.canvas = el
        this.width = this.canvas.offsetWidth
        this.height = this.canvas.offsetHeight
        this.time = 0
        this.paused = false

        this.setScene()
        this.setRender()
        this.setCamera()
        this.setControls()

        this.addLight()
        this.addObjects()

        this.setupResize()
        this.resize()

        this.render()
    }

    setScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)
    }
    setRender() {
        this.renderer = new THREE.WebGLRenderer({
            // canvas: this.canvas,
            antialias: true
        })

        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0xeeeeee, 1)

        this.canvas.appendChild(this.renderer.domElement)
    }

    setCamera() {
        const aspectRatio = window.innerWidth / window.innerHeight
        const fieldOfView = 70
        const nearPlane = 0.1
        const farPlane = 10000
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        )
        this.camera.position.set(0, 0, 10)

        this.scene.add(this.camera)
    }

    setControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        // this.controls.autoRotate = true
        // this.controls.autoRotateSpeed = .2
        this.controls.enableDamping = true
    }

    addLight() {
        this.light = new THREE.DirectionalLight(0xffffff, 5)
        this.scene.add(this.light)
    }

    settings() {
        this.settings = {
            time: 0
        }
        this.gui = new dat.GUI()
        this.gui.add(this.settings, 'time', 0, 100, 0.01)
    }

    resize() {
        this.width = this.canvas.offsetWidth
        this.height = this.canvas.offsetHeight
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height

        this.camera.updateProjectionMatrix()
    }
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    addObjects() {
        // ShaderMaterial
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                uColor: { value: new THREE.Color(0x51b1f5) },
                time: { type: 'f', value: this.time },
                earth: { value: new THREE.TextureLoader().load(earth) }
            }
        })
        this.geometry = new THREE.SphereBufferGeometry(5, 30, 30)

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
        this.material.uniforms['time'].value = this.time
        this.controls.update();
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
    }
}

new Scene(document.getElementById('container'))
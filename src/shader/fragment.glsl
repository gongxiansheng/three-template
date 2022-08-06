uniform sampler2D earth;
uniform float time;
uniform vec4 resolution;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec3 color = vec3(vUv, 1.);
    gl_FragColor.xyz = texture2D(earth, vUv).xyz;
    gl_FragColor.a = 1.;
    // gl_FragColor = gl_FragColor * texture2D( earth, gl_PointCoord );

}

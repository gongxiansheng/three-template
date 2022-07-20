uniform sampler2D pointTexture;
uniform float time;
uniform vec4 resolution;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPosition;

void main() {

    gl_FragColor = vec4( uColor, 1.0 );

    // gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

}

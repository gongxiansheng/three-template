uniform sampler2D pointTexture;
uniform vec3 uColor;
varying vec3 vColor;

void main() {

    gl_FragColor = vec4( uColor, 1.0 );

    // gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

}

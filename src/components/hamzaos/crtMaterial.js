// CRT screen material for the 3D monitor.
// Fragment shader adapted from ThreeUI's CRT background (MIT, Meng To,
// github.com/MengTo/threeui): curvature, chromatic offset, phosphor halo,
// scanlines, aperture grille, rolling bar, vignette and flicker. Reworked to
// sample by UV on a mesh instead of gl_FragCoord on a full-screen quad.
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uBulge;
  void main() {
    vUv = uv;
    vec3 p = position;
    vec2 c = uv * 2.0 - 1.0;
    p.z += uBulge * (1.0 - 0.5 * (c.x * c.x + c.y * c.y));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uPower; // 0..1 power-on animation

  float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }

  vec2 curve(vec2 uv){
    uv = uv*2.0-1.0;
    vec2 o = uv.yx*uv.yx;
    uv += uv * o * vec2(0.065, 0.09);
    return uv*0.5+0.5;
  }

  void main(){
    vec2 uv = curve(vUv);
    float t = uTime;

    vec2 inb = step(vec2(0.0), uv) * step(uv, vec2(1.0));
    float inside = inb.x*inb.y;
    vec2 ed = min(uv, 1.0-uv);
    inside *= smoothstep(0.0, 0.02, min(ed.x, ed.y));

    vec2 dir = uv - 0.5;
    float d2 = dot(dir, dir);
    vec2 ao = dir * (0.0007 + 0.005*d2);
    vec3 col;
    col.r = texture2D(uTex, uv + ao).r;
    col.g = texture2D(uTex, uv).g;
    col.b = texture2D(uTex, uv - ao).b;

    float s = 0.0035;
    vec3 wide = texture2D(uTex, uv + vec2( s, 0.0)).rgb + texture2D(uTex, uv + vec2(-s, 0.0)).rgb
              + texture2D(uTex, uv + vec2(0.0,  s)).rgb + texture2D(uTex, uv + vec2(0.0, -s)).rgb;
    col += wide * 0.025;

    float sl = sin(uv.y * 3.14159265 * 340.0 + t * 4.0);
    col *= mix(0.79, 1.0, sl*sl);

    float gx = vUv.x * uRes.x * 6.2831853 / 3.2;
    vec3 grille = 0.8 + 0.2 * cos(gx + vec3(0.0, 2.094, 4.188));
    col *= grille;
    col *= 1.24;

    float bar = fract(uv.y*0.5 - t*0.07);
    bar = smoothstep(0.0,0.05,bar) * smoothstep(0.18,0.05,bar);
    col += bar * 0.04;

    float vig = smoothstep(0.98, 0.30, length((uv-0.5)*vec2(1.05,1.0)));
    col *= mix(0.52, 1.0, vig);
    col *= 1.0 - 0.025*sin(t*8.0);
    col += (hash(vUv + fract(t*0.37)) - 0.5) * 0.02;

    // power-on: a bright horizontal line that opens vertically
    float open = smoothstep(0.0, 1.0, uPower);
    float lineMask = step(abs(uv.y - 0.5), 0.5 * open + 0.004);
    col = mix(vec3(0.85, 1.0, 0.92) * (1.0 - open) * 2.0, col, open) * lineMask;

    vec3 room = vec3(0.012, 0.03, 0.022);
    col = mix(room, col, inside);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function createCrtMaterial(texture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: texture },
      uRes: { value: new THREE.Vector2(1024, 768) },
      uTime: { value: 0 },
      uPower: { value: 0 },
      uBulge: { value: 0.09 },
    },
    vertexShader,
    fragmentShader,
    toneMapped: false,
  });
}

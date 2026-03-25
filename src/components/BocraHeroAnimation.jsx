// BocraHeroAnimation.jsx
// Uses the extracted video frame (bocra-map-frame.png) as the map background
// BOCRA logo animates on top — exact SVG paths, zero pixelation
// White background, white logo, 4 colored dots, looping animation

import { useEffect, useRef, useState } from "react";
import mapFrame from "../assets/bocra-map-frame.png";

const BLUE   = "#0e597e";
const GREEN  = "#215c2b";
const RED    = "#7b1520";
const YELLOW = "#fbc508";
const GRAY   = "#a7a5a6";

// Animation phases in ms
const T = {
  DOTS_IN:   0,       // 0-1400: 4 dots fly in from corners
  LOGO_HOLD: 1400,    // 1400-2400: logo pulses
  EXPLODE:   2400,    // 2400-3200: logo explodes, dots scatter
  MAP_SHOW:  3200,    // 3200-5000: map fades in with orbit
  HOLD:      5000,    // 5000-8000: everything holds
  LOGO_TOP:  8000,    // 8000-10500: logo returns above map
  LOOP:      10500,
};

const lerp    = (a, b, t) => a + (b - a) * Math.min(t, 1);
const easeOut = (t) => 1 - Math.pow(1 - Math.min(t, 1), 3);
const easeIn  = (t) => Math.min(t, 1) ** 2;
const easeIO  = (t) => { t = Math.min(t,1); return t<0.5?2*t*t:1-(-2*t+2)**2/2; };

export default function BocraHeroAnimation({ style = {}, className = "" }) {
  const raf   = useRef(null);
  const start = useRef(null);

  const [s, setS] = useState({
    logoA: 0, logoSc: 0.3,
    mapA: 0,
    orbitAng: 0, orbitA: 0,
    topLogoA: 0,
    dots: [
      { x: -320, y: -200, a: 0, c: BLUE   },
      { x:  320, y: -200, a: 0, c: GREEN  },
      { x: -320, y:  200, a: 0, c: RED    },
      { x:  320, y:  200, a: 0, c: YELLOW },
    ],
  });

  useEffect(() => {
    start.current = performance.now();
    const tick = (now) => {
      const t = (now - start.current) % T.LOOP;
      let ns = {};

      if (t < T.LOGO_HOLD) {
        const p = easeOut(t / T.LOGO_HOLD);
        ns = {
          logoA: p, logoSc: lerp(0.3, 1, p),
          mapA: 0, orbitA: 0, topLogoA: 0,
          dots: [
            { x:lerp(-320,0,p), y:lerp(-200,0,p), a:p, c:BLUE   },
            { x:lerp( 320,0,p), y:lerp(-200,0,p), a:p, c:GREEN  },
            { x:lerp(-320,0,p), y:lerp( 200,0,p), a:p, c:RED    },
            { x:lerp( 320,0,p), y:lerp( 200,0,p), a:p, c:YELLOW },
          ],
        };
      } else if (t < T.EXPLODE) {
        const p  = (t - T.LOGO_HOLD) / (T.EXPLODE - T.LOGO_HOLD);
        const pulse = 1 + Math.sin(p * Math.PI * 5) * 0.03;
        ns = {
          logoA: 1, logoSc: pulse,
          mapA: 0, orbitA: 0, topLogoA: 0,
          dots: [
            {x:0,y:0,a:1,c:BLUE},{x:0,y:0,a:1,c:GREEN},
            {x:0,y:0,a:1,c:RED},{x:0,y:0,a:1,c:YELLOW},
          ],
        };
      } else if (t < T.MAP_SHOW) {
        const p = easeIn((t - T.EXPLODE) / (T.MAP_SHOW - T.EXPLODE));
        ns = {
          logoA: 1 - p, logoSc: 1 + p * 0.5,
          mapA: 0, orbitA: 0, topLogoA: 0,
          dots: [
            {x:lerp(0,-400,p),y:lerp(0,-250,p),a:1-p,c:BLUE  },
            {x:lerp(0, 400,p),y:lerp(0,-250,p),a:1-p,c:GREEN },
            {x:lerp(0,-400,p),y:lerp(0, 250,p),a:1-p,c:RED   },
            {x:lerp(0, 400,p),y:lerp(0, 250,p),a:1-p,c:YELLOW},
          ],
        };
      } else if (t < T.HOLD) {
        const p = easeOut((t - T.MAP_SHOW) / (T.HOLD - T.MAP_SHOW));
        ns = {
          logoA: 0, logoSc: 1,
          mapA: p, orbitA: p,
          orbitAng: ((t - T.MAP_SHOW) / 5000) * Math.PI * 2,
          topLogoA: 0,
          dots: [
            {x:-400,y:-250,a:0,c:BLUE  },{x:400,y:-250,a:0,c:GREEN },
            {x:-400,y: 250,a:0,c:RED   },{x:400,y: 250,a:0,c:YELLOW},
          ],
        };
      } else if (t < T.LOGO_TOP) {
        ns = {
          logoA: 0, mapA: 1, orbitA: 1,
          orbitAng: ((t - T.MAP_SHOW) / 5000) * Math.PI * 2,
          topLogoA: 0,
          dots: [
            {x:-400,y:-250,a:0,c:BLUE  },{x:400,y:-250,a:0,c:GREEN },
            {x:-400,y: 250,a:0,c:RED   },{x:400,y: 250,a:0,c:YELLOW},
          ],
        };
      } else {
        const p = easeIO((t - T.LOGO_TOP) / (T.LOOP - T.LOGO_TOP));
        ns = {
          logoA: 0, mapA: 1, orbitA: 1,
          orbitAng: ((t - T.MAP_SHOW) / 5000) * Math.PI * 2,
          topLogoA: p,
          dots: [
            {x:-400,y:-250,a:0,c:BLUE  },{x:400,y:-250,a:0,c:GREEN },
            {x:-400,y: 250,a:0,c:RED   },{x:400,y: 250,a:0,c:YELLOW},
          ],
        };
      }

      setS((prev) => ({ ...prev, ...ns }));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const W = 900, H = 600, cx = W/2, cy = H/2;
  const ORX = 210, ORY = 210;

  const orbitDots = [BLUE,GREEN,RED,YELLOW].map((color,i)=>{
    const ang = s.orbitAng + (i/4)*Math.PI*2;
    return { color, x: cx+Math.cos(ang)*ORX, y: cy+Math.sin(ang)*ORY };
  });

  return (
    <div
      className={className}
      style={{
        width: "100%",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: 1200, display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── MAP IMAGE from extracted video frame ── */}
        {s.mapA > 0 && (
          <image
            href={mapFrame}
            x={cx - 230}
            y={cy - 290}
            width={460}
            height={580}
            opacity={s.mapA}
            preserveAspectRatio="xMidYMid meet"
          />
        )}

        {/* ── ORBIT RING ── */}
        {s.orbitA > 0 && (
          <ellipse
            cx={cx} cy={cy}
            rx={ORX} ry={ORY}
            fill="none"
            stroke="rgba(180,180,200,0.25)"
            strokeWidth="1"
            opacity={s.orbitA}
          />
        )}

        {/* ── ORBIT DOTS ── */}
        {s.orbitA > 0 && orbitDots.map((d,i)=>(
          <g key={i} opacity={s.orbitA}>
            {[1,2,3].map(tr=>{
              const ta = s.orbitAng+(i/4)*Math.PI*2-tr*0.12;
              return (
                <circle
                  key={tr}
                  cx={cx+Math.cos(ta)*ORX}
                  cy={cy+Math.sin(ta)*ORY}
                  r={8-tr*2}
                  fill={d.color}
                  opacity={(1-tr/4)*0.3}
                />
              );
            })}
            <circle cx={d.x} cy={d.y} r={11} fill={d.color}/>
          </g>
        ))}

        {/* ── CENTER LOGO ── */}
        {s.logoA > 0 && (
          <g
            transform={`translate(${cx},${cy+30}) scale(${s.logoSc})`}
            opacity={s.logoA}
          >
            <BocraLogo/>
          </g>
        )}

        {/* ── FLYING DOTS ── */}
        {s.dots.map((d,i)=>
          d.a > 0 ? (
            <circle key={i} cx={cx+d.x} cy={cy+d.y} r={14} fill={d.c} opacity={d.a}/>
          ) : null
        )}

        {/* ── LOGO TOP (returns above map) ── */}
        {s.topLogoA > 0 && (
          <g
            transform={`translate(${cx},${cy-H*0.36}) scale(0.38)`}
            opacity={s.topLogoA}
          >
            <BocraLogo/>
          </g>
        )}
      </svg>
    </div>
  );
}

// ── Exact BOCRA SVG paths from bocra.svg ──
function BocraLogo() {
  return (
    <g transform="matrix(0.40,0,0,-0.40,-225,157)">
      <g transform="translate(30.019,430.6783)">
        <path fill={GRAY} d="m 0,0 h 73.486 c 29.092,0 51.72,-13.36 51.72,-42.453 0,-11.206 -5.388,-22.628 -15.302,-28.66 13.576,-7.113 20.904,-16.595 20.904,-33.617 0,-7.976 -3.664,-25.645 -22.412,-37.283 -13.576,-7.541 -25.86,-8.622 -48.272,-8.835 l -60.124,0 z m 33.832,-30.169 v -27.797 h 40.299 c 9.267,0 17.025,5.601 17.025,14.65 0,9.485 -8.836,13.147 -17.67,13.147 z m 0,-57.321 v -33.403 h 39.654 c 14.006,0 23.058,6.246 23.058,17.454 0,10.13 -8.404,15.731 -22.628,15.949 z"/>
      </g>
      <g transform="translate(254.5745,277.0282)">
        <path fill={GRAY} d="m 0,0 c -50.212,0 -78.227,33.834 -78.227,78.444 0,45.9 31.248,78.223 78.872,78.223 47.626,0 78.227,-32.11 78.227,-77.578 C 78.872,37.068 52.151,0 0,0 m 0.645,126.284 c -29.308,0 -44.824,-20.043 -44.824,-47.84 0,-25.862 13.579,-48.059 44.824,-48.059 31.032,0 44.179,22.197 44.179,48.704 -0.216,28.661 -16.809,47.195 -44.179,47.195"/>
      </g>
      <g transform="translate(462.1038,376.1603)">
        <path fill={GRAY} d="m 0,0 c -4.74,16.591 -17.456,27.366 -40.083,27.366 -26.721,-0.432 -41.16,-22.196 -41.16,-46.978 0,-28.878 14.439,-49.348 41.16,-49.348 15.731,0 33.618,6.247 39.867,31.677 l 32.756,-10.13 c -8.62,-29.952 -31.461,-51.934 -72.623,-51.934 -50.857,0.431 -75.424,37.928 -75.424,78.659 0,40.081 24.351,78.009 76.071,78.223 C 6.68,57.966 24.352,33.398 32.325,12.929 Z"/>
      </g>
      <g transform="translate(626.7493,276.5955)">
        <path fill={GRAY} d="m 0,0 c -12.929,4.311 -17.885,9.053 -24.565,15.95 -9.052,9.481 -30.387,42.667 -30.387,42.667 H -79.518 V 3.235 h -33.834 v 150.848 h 68.099 c 36.849,0 59.477,-17.022 59.045,-47.194 C 13.362,83.183 -4.093,69.392 -18.964,63.576 -9.697,49.999 0,37.715 3.88,33.621 7.759,29.524 17.456,22.414 24.783,20.043 Z m -79.518,89.434 h 37.281 c 12.284,0 21.765,7.541 21.765,17.455 0,10.561 -8.189,16.811 -22.412,16.811 h -36.634 z"/>
      </g>
      <g transform="translate(811.8707,279.8301)">
        <path fill={GRAY} d="m 0,0 h -37.066 l -10.345,25.862 h -62.71 L -120.25,0 h -36.849 l 63.141,150.848 h 31.032 z m -98.267,55.599 h 39.22 l -19.611,50.643 z"/>
      </g>
      <g transform="translate(380.9156,201.2795)">
        <path fill={BLUE} d="M 0,0 C 0,-21.928 17.776,-39.705 39.705,-39.705 61.634,-39.705 79.41,-21.928 79.41,0 79.41,21.929 61.634,39.706 39.705,39.706 17.776,39.706 0,21.929 0,0"/>
      </g>
      <g transform="translate(498.0971,201.2795)">
        <path fill={GREEN} d="M 0,0 C 0,-21.928 17.776,-39.705 39.705,-39.705 61.634,-39.705 79.41,-21.928 79.41,0 79.41,21.929 61.634,39.706 39.705,39.706 17.776,39.706 0,21.929 0,0"/>
      </g>
      <g transform="translate(615.2792,201.2795)">
        <path fill={RED} d="m 0,0 c 0,-21.928 17.777,-39.705 39.705,-39.705 21.929,0 39.704,17.777 39.704,39.705 0,21.929 -17.775,39.706 -39.704,39.706 C 17.777,39.706 0,21.929 0,0"/>
      </g>
      <g transform="translate(732.4607,201.2795)">
        <path fill={YELLOW} d="M 0,0 C 0,-21.928 17.776,-39.705 39.705,-39.705 61.634,-39.705 79.41,-21.928 79.41,0 79.41,21.929 61.634,39.706 39.705,39.706 17.776,39.706 0,21.929 0,0"/>
      </g>
    </g>
  );
}

// Data Strings — Originkit

"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

const SAMPLES = 28

const BUNDLES = 12
const KNOTS = 3
const ORIGIN_SPREAD = 75
const PINCH = 85
const SEED = 7
const DRAW_IN = true
const DRAW_DURATION = 3
const FLOW_SPEED = 10
const DOT_COLOR = "#FFFFFF"
const SPRING_STIFFNESS = 70
const SPRING_DAMPING = 9
const REPEL_RADIUS = 130
const REPEL_STRENGTH = 45

function mulberry32(a: number) {
    return function () {
        a |= 0
        a = (a + 1831565813) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const colorCache: Record<string, [number, number, number, number]> = {}

function parseColor(color: string): [number, number, number, number] {
    const cached = colorCache[color]
    if (cached) return cached
    if (typeof document === "undefined") return [255, 255, 255, 1]
    const cv = document.createElement("canvas")
    cv.width = 1
    cv.height = 1
    const ctx = cv.getContext("2d")
    if (!ctx) return [255, 255, 255, 1]
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    const d = ctx.getImageData(0, 0, 1, 1).data
    const out: [number, number, number, number] = [d[0], d[1], d[2], d[3] / 255]
    colorCache[color] = out
    return out
}

interface Strand {
    pts: Float32Array; off: Float32Array; vel: Float32Array;
    stroke: string; r: number; g: number; b: number; alpha: number; width: number; delayFrac: number;
}
interface Particle { strand: number; t: number; speed: number; size: number }
interface ModelProps {
    orientation: NonNullable<DataStringsProps["orientation"]>; strands: number; palette: string[];
    focus: number; waist: number; sweep: number; reach: number; curve: number;
    strandOpacity: number; strandWidth: number; flowCount: number;
}

function pointAt(s: Strand, t: number): [number, number] {
    const f = Math.min(1, Math.max(0, t)) * (SAMPLES - 1)
    const i = Math.min(SAMPLES - 2, Math.floor(f))
    const frac = f - i
    const x0 = s.pts[i * 2] + s.off[i * 2]
    const y0 = s.pts[i * 2 + 1] + s.off[i * 2 + 1]
    const x1 = s.pts[(i + 1) * 2] + s.off[(i + 1) * 2]
    const y1 = s.pts[(i + 1) * 2 + 1] + s.off[(i + 1) * 2 + 1]
    return [x0 + (x1 - x0) * frac, y0 + (y1 - y0) * frac]
}

const DEFAULT_PALETTE = ["#2E7DFF", "#2BD9FF", "#F72585", "#FF4FA3", "#FF8A1E"]
const COMET_PALETTE = ["#1E6FE0", "#9FA55C", "#FF8A3D", "#E2397E"]

function buildModel(width: number, height: number, props: ModelProps) {
    const {
        orientation,
        strands: strandCount,
        palette,
        focus,
        waist,
        sweep,
        reach,
        curve,
        strandOpacity,
        strandWidth,
        flowCount,
    } = props

    const rnd = mulberry32(SEED * 7919 + 1)
    const colorList = palette && palette.length > 0 ? palette : DEFAULT_PALETTE
    const parsed = colorList.map(parseColor)

    const vertical = orientation === "down" || orientation === "up"
    const CW = vertical ? height : width
    const CH = vertical ? width : height

    const toX = (x: number, y: number) =>
        orientation === "left" ? width - x : vertical ? y : x
    const toY = (x: number, y: number) =>
        orientation === "down" ? x : orientation === "up" ? height - x : y

    const focusAmt = Math.min(1, Math.max(0, focus / 100))
    const open = 1 - focusAmt
    const sweepAmt = Math.max(0, sweep) / 100
    const reachFrac = Math.min(1, Math.max(0.05, reach / 100))
    const spread = Math.max(0, curve) / 100

    const bend = Math.min(0.55, Math.max(0, sweepAmt * 0.95 - 0.09))

    const mid = CH / 2
    const originSpan = (ORIGIN_SPREAD / 100) * CH
    const originTop = (CH - originSpan) / 2
    const bundleGap = originSpan / BUNDLES
    const bundleHeight = bundleGap * 0.5
    const waistPx = (Math.min(100, Math.max(0, waist)) / 100) * CW
    const loose = Math.max(0, 1 - PINCH / 100) * open

    const bundleY: number[] = []
    const bundleColor: number[] = []
    const colorStart = Math.floor(rnd() * parsed.length)
    for (let i = 0; i < BUNDLES; i++) {
        bundleY.push(originTop + (i + 0.5) * bundleGap + (rnd() - 0.5) * bundleGap * 0.3)
        bundleColor.push((colorStart + i) % parsed.length)
    }

    const knotY: number[] = []
    for (let k = 0; k < KNOTS; k++) {
        const offset = (k - (KNOTS - 1) / 2) * CH * 0.055
        knotY.push(mid + offset * open)
    }

    const strandList: Strand[] = []
    const total = Math.max(10, Math.round(strandCount))

    for (let i = 0; i < total; i++) {
        const bi = Math.floor(rnd() * BUNDLES)
        const [cr, cg, cb] = parsed[bundleColor[bi] % parsed.length]
        const jitter = () => (rnd() - 0.5) * 44

        const bandY = bundleY[bi] + (rnd() - 0.5) * bundleHeight
        const x0 = 0
        const y0 = mid + (bandY - mid) * open + (rnd() - 0.5) * CH * 0.012 * focusAmt

        const side = rnd() < 0.5 ? -1 : 1
        const y1 = mid + side * Math.pow(rnd(), 0.85) * spread * CH * 0.5
        const x1 = CW * (reachFrac + rnd() * (1 - reachFrac) * 0.8)

        const wy =
            knotY[Math.floor(rnd() * KNOTS)] +
            (rnd() - 0.5) * loose * CH * 0.5 +
            (rnd() - 0.5) * CH * 0.012
        const cx1 = Math.min(waistPx, x1 * 0.9)
        const cy1 = wy + (y1 - wy) * bend * 0.12 + (rnd() - 0.5) * loose * CH * 0.2
        const cx2 = cx1 + (x1 - cx1) * sweepAmt
        const cy2 = wy + (y1 - wy) * bend + (rnd() - 0.5) * loose * CH * 0.2

        const pts = new Float32Array(SAMPLES * 2)
        for (let p = 0; p < SAMPLES; p++) {
            const t = p / (SAMPLES - 1)
            const u = 1 - t
            const a = u * u * u
            const b = 3 * u * u * t
            const c = 3 * u * t * t
            const d = t * t * t
            const bx = a * x0 + b * cx1 + c * cx2 + d * x1
            const by = a * y0 + b * cy1 + c * cy2 + d * y1
            pts[p * 2] = toX(bx, by)
            pts[p * 2 + 1] = toY(bx, by)
        }

        const r = Math.min(255, Math.max(0, Math.round(cr + jitter())))
        const g = Math.min(255, Math.max(0, Math.round(cg + jitter())))
        const b2 = Math.min(255, Math.max(0, Math.round(cb + jitter())))
        const alpha = strandOpacity * (0.35 + rnd() * 0.65)

        strandList.push({
            pts,
            off: new Float32Array(SAMPLES * 2),
            vel: new Float32Array(SAMPLES * 2),
            stroke: `rgba(${r},${g},${b2},${alpha})`,
            r,
            g,
            b: b2,
            alpha,
            width: strandWidth * (0.5 + rnd() * 0.7),
            delayFrac: rnd() * 0.6,
        })
    }

    const particles: Particle[] = []
    const particleTotal = Math.max(0, Math.round(flowCount))
    for (let i = 0; i < particleTotal; i++) {
        particles.push({
            strand: Math.floor(rnd() * strandList.length),
            t: rnd(),
            speed: 0.03 + rnd() * 0.07,
            size: 0.8 + rnd() * 1.2,
        })
    }

    return { strands: strandList, particles, width, height }
}

export interface DataStringsProps {
    orientation?: "right" | "left" | "down" | "up"
    colorMode?: "bundles" | "flow"
    palette?: string[]
    background?: string
    strands?: number
    focus?: number
    waist?: number
    sweep?: number
    reach?: number
    curve?: number
    strandWidth?: number
    strandOpacity?: number
    particles?: number
    cursor?: number
    style?: React.CSSProperties
}

export default function DataStrings(props: DataStringsProps) {
    const {
        orientation = "down",
        colorMode = "flow",
        palette = DEFAULT_PALETTE,
        background = "#000000",
        strands = 2000,
        focus = 100,
        waist = 0,
        sweep = 0,
        reach = 100,
        curve = 100,
        strandWidth: rawWidth = 26,
        strandOpacity: rawOpacity = 11,
        particles = 200,
        cursor = 50,
        style,
    } = props

    const strandOpacity = rawOpacity / 100
    const strandWidth = rawWidth / 10
    const flowSpeed = FLOW_SPEED / 10

    const cursorAmount = Math.max(0, cursor) / 50
    const repelRadius = REPEL_RADIUS * Math.max(0.2, cursorAmount)
    const repelStrength = REPEL_STRENGTH * cursorAmount
    const mouseRepel = cursor > 0

    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isStatic = false

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas || typeof window === "undefined") return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dpr = isStatic ? 1 : Math.min(2, window.devicePixelRatio || 1)
        let model: ReturnType<typeof buildModel> | null = null
        let raf = 0
        let started = false
        let elapsed = 0
        let idleFramePainted = false
        let gradients: CanvasGradient[] = []

        let mouseX = -1e5
        let mouseY = -1e5
        let prevMouseX = -1e5
        let prevMouseY = -1e5
        let mouseVX = 0
        let mouseVY = 0
        let mouseInside = false
        let energy = 0

        const reducedMotion =
            window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const dynamic = !isStatic && !reducedMotion

        const modelProps = {
            orientation,
            colorMode,
            strands,
            palette,
            focus,
            waist,
            sweep,
            reach,
            curve,
            strandOpacity,
            strandWidth,
            flowCount: particles,
        }

        const [dr, dg, db] = parseColor(DOT_COLOR)
        const [br, bg, bb, ba] = parseColor(background)
        const duration = Math.max(0.2, DRAW_DURATION)
        const totalDrawTime = duration * 1.6

        const buildGradients = () => {
            gradients = []
            if (!model || colorMode !== "flow") return
            const stops = (palette && palette.length > 1 ? palette : COMET_PALETTE).map(parseColor)
            for (const s of model.strands) {
                const x0 = s.pts[0]
                const y0 = s.pts[1]
                const x1 = s.pts[(SAMPLES - 1) * 2]
                const y1 = s.pts[(SAMPLES - 1) * 2 + 1]
                const grad = ctx.createLinearGradient(x0, y0, x1, y1)
                for (let i = 0; i < stops.length; i++) {
                    const [r, gg, b] = stops[i]
                    const frac = i / (stops.length - 1)
                    const a = Math.min(1, s.alpha * (0.55 + frac * 0.75))
                    grad.addColorStop(frac, `rgba(${r},${gg},${b},${a})`)
                }
                gradients.push(grad)
            }
        }

        const getProgress = (i: number) => {
            if (!DRAW_IN || !dynamic) return 1
            const s = model ? model.strands[i] : null
            if (!s) return 1
            const p = Math.min(1, Math.max(0, (elapsed - s.delayFrac * duration) / duration))
            return 1 - (1 - p) * (1 - p)
        }

        const renderScene = () => {
            if (!model) return
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.globalCompositeOperation = "source-over"
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            if (ba > 0) {
                ctx.fillStyle = `rgba(${br},${bg},${bb},${ba})`
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.globalCompositeOperation = ba > 0 ? "lighter" : "source-over"
            ctx.lineCap = "round"
            const flow = colorMode === "flow" && gradients.length > 0
            const progresses = new Float32Array(model.strands.length)

            for (let si = 0; si < model.strands.length; si++) {
                const s = model.strands[si]
                const progress = getProgress(si)
                progresses[si] = progress
                if (progress <= 0.001) continue
                const segs = progress * (SAMPLES - 1)
                const full = Math.floor(segs)
                const frac = segs - full
                ctx.strokeStyle = flow ? gradients[si] : s.stroke
                ctx.lineWidth = s.width
                ctx.beginPath()
                let hx = s.pts[0] + s.off[0]
                let hy = s.pts[1] + s.off[1]
                ctx.moveTo(hx, hy)
                for (let p = 1; p <= full; p++) {
                    hx = s.pts[p * 2] + s.off[p * 2]
                    hy = s.pts[p * 2 + 1] + s.off[p * 2 + 1]
                    ctx.lineTo(hx, hy)
                }
                if (frac > 0 && full < SAMPLES - 1) {
                    const ax = s.pts[full * 2] + s.off[full * 2]
                    const ay = s.pts[full * 2 + 1] + s.off[full * 2 + 1]
                    const bx = s.pts[(full + 1) * 2] + s.off[(full + 1) * 2]
                    const by = s.pts[(full + 1) * 2 + 1] + s.off[(full + 1) * 2 + 1]
                    hx = ax + (bx - ax) * frac
                    hy = ay + (by - ay) * frac
                    ctx.lineTo(hx, hy)
                }
                ctx.stroke()

                ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${Math.min(1, s.alpha * 2.4)})`
                ctx.fillRect(s.pts[0] - 0.8, s.pts[1] - 0.6, 1.6, 1.2)

                const dotR = 0.9 + s.width * 0.8
                ctx.fillStyle = `rgba(${dr},${dg},${db},0.9)`
                ctx.beginPath()
                ctx.arc(hx, hy, dotR, 0, Math.PI * 2)
                ctx.fill()
            }

            if (dynamic) {
                for (const p of model.particles) {
                    const prog = progresses[p.strand]
                    if (prog <= 0.001) continue
                    const s = model.strands[p.strand]
                    const [x, y] = pointAt(s, p.t * prog)
                    ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},0.3)`
                    ctx.beginPath()
                    ctx.arc(x, y, p.size * 2.2, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.fillStyle = `rgba(${dr},${dg},${db},0.85)`
                    ctx.beginPath()
                    ctx.arc(x, y, p.size * 0.65, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        }

        const physicsStep = (dt: number) => {
            if (!model) return
            energy = 0
            const R = Math.max(1, repelRadius)
            const R2 = R * R
            const k = SPRING_STIFFNESS
            const c = SPRING_DAMPING
            const hasMouse = mouseRepel && mouseInside
            const pushA = repelStrength * 55
            const flingA = 2.5
            const maxVel = 3000
            const maxOff = R * 2.5

            for (const s of model.strands) {
                const pts = s.pts
                const off = s.off
                const vel = s.vel
                for (let p = 0; p < SAMPLES; p++) {
                    const ix = p * 2
                    const iy = ix + 1
                    let ax = -k * off[ix] - c * vel[ix]
                    let ay = -k * off[iy] - c * vel[iy]
                    if (hasMouse) {
                        const x = pts[ix] + off[ix]
                        const y = pts[iy] + off[iy]
                        const dx = x - mouseX
                        const dy = y - mouseY
                        const d2 = dx * dx + dy * dy
                        if (d2 < R2 && d2 > 0.01) {
                            const d = Math.sqrt(d2)
                            const falloff = 1 - d / R
                            const f = pushA * falloff
                            ax += (dx / d) * f + mouseVX * flingA * falloff
                            ay += (dy / d) * f + mouseVY * flingA * falloff
                        }
                    }
                    vel[ix] = Math.max(-maxVel, Math.min(maxVel, vel[ix] + ax * dt))
                    vel[iy] = Math.max(-maxVel, Math.min(maxVel, vel[iy] + ay * dt))
                    off[ix] = Math.max(-maxOff, Math.min(maxOff, off[ix] + vel[ix] * dt))
                    off[iy] = Math.max(-maxOff, Math.min(maxOff, off[iy] + vel[iy] * dt))
                    energy +=
                        vel[ix] * vel[ix] + vel[iy] * vel[iy] + off[ix] * off[ix] + off[iy] * off[iy]
                }
            }
        }

        const rebuild = () => {
            const w = container.clientWidth
            const h = container.clientHeight
            if (w < 4 || h < 4) return
            canvas.width = Math.round(w * dpr)
            canvas.height = Math.round(h * dpr)

            const areaScale = Math.min(1, Math.max(0.3, (w * h) / (1200 * 640)))
            const staticScale = isStatic ? 0.4 : 1
            const effectiveStrands = Math.max(
                60,
                Math.round(Math.min(2000, strands) * areaScale * staticScale)
            )
            const effectiveFlow = isStatic ? 0 : Math.round(Math.min(300, particles) * areaScale)
            model = buildModel(w, h, { ...modelProps, strands: effectiveStrands, flowCount: effectiveFlow })
            buildGradients()
            idleFramePainted = false
            started = false
            elapsed = 0
            renderScene()
        }

        const isInViewport = () => {
            const rect = container.getBoundingClientRect()
            return (
                rect.bottom > 0 &&
                rect.top < window.innerHeight &&
                rect.right > 0 &&
                rect.left < window.innerWidth
            )
        }

        const tick = (dt: number) => {
            if (!model || document.hidden || !isInViewport()) return
            if (!started) {
                if (!isInViewport()) return
                started = true
            }
            elapsed += dt

            if (mouseInside && prevMouseX > -90000 && dt > 0) {
                let ivx = (mouseX - prevMouseX) / dt
                let ivy = (mouseY - prevMouseY) / dt
                const speed = Math.hypot(ivx, ivy)
                if (speed > 8000) {
                    ivx = 0
                    ivy = 0
                } else if (speed > 3000) {
                    ivx *= 3000 / speed
                    ivy *= 3000 / speed
                }
                mouseVX += (ivx - mouseVX) * Math.min(1, dt * 10)
                mouseVY += (ivy - mouseVY) * Math.min(1, dt * 10)
            } else {
                mouseVX *= 0.9
                mouseVY *= 0.9
            }
            prevMouseX = mouseX
            prevMouseY = mouseY
            physicsStep(dt)

            const drawing = DRAW_IN && elapsed < totalDrawTime
            const hasParticles = model.particles.length > 0
            if (hasParticles) {
                for (const p of model.particles) {
                    p.t += p.speed * flowSpeed * dt
                    if (p.t > 1) {
                        p.t -= 1
                        p.strand = (p.strand + 7) % model.strands.length
                    }
                }
            }

            const active = drawing || hasParticles || (mouseRepel && mouseInside) || energy > 1
            if (active) {
                renderScene()
                idleFramePainted = false
            } else if (!idleFramePainted) {
                renderScene()
                idleFramePainted = true
            }
        }

        const startLoop = () => {
            let last = performance.now()
            const loop = (now: number) => {
                raf = window.requestAnimationFrame(loop)
                const dt = Math.min(0.05, (now - last) / 1000 || 0)
                last = now
                tick(dt)
            }
            raf = window.requestAnimationFrame(loop)
        }

        const onPointerMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = event.clientX - rect.left
            mouseY = event.clientY - rect.top
            mouseInside = true
        }

        const onPointerLeave = () => {
            mouseInside = false
        }

        rebuild()
        const resizeObserver = new ResizeObserver(() => rebuild())
        resizeObserver.observe(container)

        if (dynamic) {
            container.addEventListener("pointermove", onPointerMove)
            container.addEventListener("pointerleave", onPointerLeave)
            startLoop()
        }

        return () => {
            resizeObserver.disconnect()
            container.removeEventListener("pointermove", onPointerMove)
            container.removeEventListener("pointerleave", onPointerLeave)
            if (raf) window.cancelAnimationFrame(raf)
        }
    }, [
        orientation,
        colorMode,
        palette,
        background,
        strands,
        focus,
        waist,
        sweep,
        reach,
        curve,
        strandWidth,
        strandOpacity,
        particles,
        repelRadius,
        repelStrength,
        mouseRepel,
        flowSpeed,
        isStatic,
    ])

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 0,
                overflow: "hidden",
                background,
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
                aria-hidden="true"
            />
        </div>
    )
}

DataStrings.displayName = "Data Strings"
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Braces, LockKeyhole, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import DataStrings from "./DataStrings";
import styles from "./OrbitHero.module.css";

const STRING_PALETTE = ["#e84b16", "#ff692b", "#ffad61", "#ffcf9b"];

const BENEFITS = [
    { title: "Private by design", detail: "Your data stays local", icon: LockKeyhole },
    { title: "One place. Every tool.", detail: "Built for your workflow", icon: Braces },
    { title: "Ready when you are", detail: "No sign-up. Always free.", icon: Zap },
];

function RotatingBenefits() {
    const [step, setStep] = useState(0);
    const [paused, setPaused] = useState(false);
    const [interacting, setInteracting] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (paused || interacting || reducedMotion) return;
        const timer = window.setInterval(() => {
            if (!document.hidden) setStep((value) => value + 1);
        }, 3200);
        return () => window.clearInterval(timer);
    }, [paused, interacting, reducedMotion]);

    return (
        <div className={styles.benefitCarousel}
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocus={() => setInteracting(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
            }}
        >
            <div className={styles.benefitTrack}>
                {BENEFITS.map((benefit, index) => {
                    const slot = (index - step % 3 + 3) % 3;
                    const active = slot === 1;
                    const wrapping = slot === 2 && step > 0;
                    const Icon = benefit.icon;
                    return (
                        <motion.div key={benefit.title} initial={false}
                            className={styles.benefitPosition}
                            data-active={active}
                            animate={{
                                y: wrapping ? [-100, -135, 135, 100] : (slot - 1) * 100,
                                opacity: wrapping ? [0.65, 0, 0, 0.65] : active ? 1 : 0.65,
                                scale: active ? 1 : 0.88,
                                x: active ? 0 : 16,
                            }}
                            transition={{ duration: reducedMotion ? 0 : 0.75, ease: "easeInOut", times: wrapping ? [0, 0.3, 0.65, 1] : undefined }}
                        >
                            <Link href="/tools" tabIndex={active ? 0 : -1}
                                className={`${styles.benefitCard} ${active ? styles.benefitActive : ""}`}>
                                <Icon size={25} />
                                <div>{benefit.title}<span>{benefit.detail}{active && <ArrowRight size={14} />}</span></div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
            {!reducedMotion && <button type="button" className={styles.rotationToggle} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume benefit rotation" : "Pause benefit rotation"}>{paused ? "Resume rotation" : "Pause rotation"}</button>}
        </div>
    );
}

export default function OrbitHero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.halo} aria-hidden="true" />
            <div className={styles.content}>
                <p className={styles.eyebrow}><span aria-hidden="true">▸</span> YOUR EVERYDAY DEVELOPER TOOLKIT</p>
                <h1 id="hero-title">Small tasks. Instant answers.<br />More time to build.</h1>
                <p className={styles.description}>Format, convert, debug, and create with free developer tools.<br className="hidden sm:block" /> Everything runs in your browser. Your data stays yours.</p>
                <div className={styles.actions}>
                    <Link href="/tools/json-formatter" className={styles.secondary}>Try JSON formatter</Link>
                    <Link href="/tools" className={styles.primary}>Explore all tools <ArrowRight size={17} /></Link>
                </div>
            </div>
            <div className={styles.diagram}>
            <div className={styles.strings} aria-hidden="true">
                <DataStrings
                    orientation="down"
                    palette={STRING_PALETTE}
                    background="transparent"
                    strands={500}
                    strandWidth={12}
                    strandOpacity={15}
                    particles={65}
                    focus={100}
                    curve={100}
                    cursor={35}
                />
            </div>
                <div className={styles.connector} aria-hidden="true" />
                <div className={styles.inputs}>
                    <Link href="/tools/jwt-decoder" className={styles.quiet}>I need to decode a token...</Link>
                    <Link href="/tools/json-formatter" className={styles.selected}><Sparkles size={19} /><span>I need to format some JSON...</span></Link>
                    <Link href="/tools/regex-tester" className={styles.quiet}>I need to test a regex...</Link>
                </div>
                <div className={styles.orbit} aria-hidden="true">
                    <div className={styles.innerRing}>
                        <Image src="/orange-reactor.svg" alt="" width={256} height={256} className={styles.reactor} priority />
                    </div>
                </div>
                <RotatingBenefits />
            </div>
            <p className={styles.footer}>Less busywork. More building.</p>
        </section>
    );
}

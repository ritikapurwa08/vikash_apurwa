import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Star { id: number; x: number; y: number; r: number; delay: number; dur: number; }
interface Particle { id: number; x: number; y: number; size: number; color: string; delay: number; angle: number; }
interface FloatingHeart { id: number; x: number; size: number; delay: number; dur: number; color: string; }

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

const HEART_COLORS = [
    '#ff6eb4', '#ff2d78', '#ff9de2', '#c084fc',
    '#f472b6', '#fb7185', '#e879f9', '#f9a8d4'
];


const RELATIONSHIP_START = new Date("2024-09-19T00:00:00");

/* ─────────────────────────────────────────────
   UTILS
───────────────────────────────────────────── */


function isInsideHeart(nx: number, ny: number): boolean {
    const term1 = Math.pow(nx * nx + ny * ny - 1, 3);
    const term2 = nx * nx * Math.pow(ny, 3);
    return term1 - term2 <= 0;
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

// ── Twinkling Stars Background ──
const StarField: React.FC<{ count?: number }> = ({ count = 120 }) => {
    const stars = useMemo<Star[]>(() =>
        Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 2 + 0.5,
            delay: Math.random() * 4,
            dur: Math.random() * 3 + 2,
        })), [count]);

    return (
        <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {stars.map(s => (
                <motion.circle
                    key={s.id}
                    cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
                    fill="white"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.9, 0.1] }}
                    transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </svg>
    );
};

// ── Shooting Star ──
const ShootingStar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 80, y: 10 });

    useEffect(() => {
        const fire = () => {
            setPos({ x: Math.random() * 60 + 20, y: Math.random() * 30 + 5 });
            setVisible(true);
            setTimeout(() => setVisible(false), 1200);
        };
        const t = setInterval(fire, 4000 + Math.random() * 3000);
        return () => clearInterval(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed z-10 pointer-events-none"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    initial={{ opacity: 0, x: 0, y: 0, scaleX: 0 }}
                    animate={{ opacity: [0, 1, 0], x: -120, y: 60, scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <div
                        className="w-24 h-[2px] origin-right"
                        style={{ background: 'linear-gradient(90deg, transparent, #fff, #ffd700)' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ── Floating Hearts ──
const FloatingHearts: React.FC = () => {
    const hearts = useMemo<FloatingHeart[]>(() =>
        Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 90 + 5,
            size: Math.random() * 16 + 10,
            delay: Math.random() * 8,
            dur: Math.random() * 6 + 8,
            color: HEART_COLORS[i % HEART_COLORS.length],
        })), []);

    return (
        <>
            {hearts.map(h => (
                <motion.div
                    key={h.id}
                    className="fixed pointer-events-none z-20"
                    style={{ left: `${h.x}%`, bottom: '-40px', fontSize: h.size }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: [0, -(window.innerHeight + 80)],
                        opacity: [0, 0.8, 0.8, 0],
                        x: [0, Math.sin(h.id) * 30, -Math.sin(h.id) * 30, 0],
                    }}
                    transition={{
                        duration: h.dur,
                        delay: h.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 24 24" width={h.size} height={h.size} fill={h.color}>
                        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                    </svg>
                </motion.div>
            ))}
        </>
    );
};

// ── Confetti Rain ──

// ── Heart Bloom (particle heart shape) ──
const HeartBloom: React.FC = () => {
    const particles = useMemo<Particle[]>(() => {
        const result: Particle[] = [];
        const isMobile = window.innerWidth < 768;
        const radius = isMobile ? 70 : 100;
        const count = isMobile ? 280 : 420;
        let attempts = 0;

        while (result.length < count && attempts < count * 12) {
            attempts++;
            const x = (Math.random() * 2 - 1) * radius;
            const y = (Math.random() * 2 - 1) * radius;
            const nx = x / (radius / 1.3);
            const ny = -y / (radius / 1.3);
            if (isInsideHeart(nx, ny)) {
                result.push({
                    id: result.length,
                    x, y,
                    size: Math.random() * 4.5 + 2,
                    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
                    delay: Math.random() * 2.5 + 2,
                    angle: Math.random() * 360,
                });
            }
        }
        return result;
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 0.9, x: p.x, y: p.y, rotate: p.angle }}
                    transition={{ duration: 1.5, delay: p.delay, type: 'spring', stiffness: 50, damping: 10 }}
                    style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 6px ${p.color}, 0 0 12px ${p.color}`,
                    }}
                />
            ))}
        </div>
    );
};

// ── Growing Tree ──
const GrowingTree: React.FC = () => (
    <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible absolute bottom-0 z-10">
        {[
            "M50 200 Q45 160 50 120 Q54 80 32 30 M50 120 Q62 70 85 25",
            "M38 145 Q22 110 8 85 M62 150 Q82 115 95 88",
            "M50 170 Q72 148 88 138 M50 95 Q38 58 44 15 M35 55 Q18 30 8 18",
        ].map((d, i) => (
            <motion.path
                key={i} d={d} fill="none"
                stroke={i === 0 ? '#ffb3c6' : i === 1 ? '#f9a8d4' : '#e879f9'}
                strokeWidth={i === 0 ? 2.8 : 2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.5 + i * 0.3 }}
                style={{ filter: `drop-shadow(0 0 5px rgba(255,179,198,0.9))` }}
            />
        ))}
    </svg>
);



// ── Animated Counter Number ──
const AnimatedNum: React.FC<{ value: number }> = ({ value }) => {
    const mv = useMotionValue(0);
    const rounded = useTransform(mv, v => Math.floor(v));
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(mv, value, { duration: 0.5 });
        return controls.stop;
    }, [value]);

    useEffect(() => rounded.on('change', v => setDisplay(v)), [rounded]);

    return (
        <span
            className="text-3xl font-black text-white block leading-none"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255,110,180,0.7)' }}
        >
            {display}
        </span>
    );
};

// ── Live Timer ──
const LiveTimer: React.FC<{ startDate: Date }> = ({ startDate }) => {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = Date.now() - startDate.getTime();
            if (diff > 0) setTime({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff / 3600000) % 24),
                minutes: Math.floor((diff / 60000) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [startDate]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
            className="mt-4 rounded-2xl p-4 backdrop-blur-md border border-white/10"
            style={{ background: 'rgba(10,5,30,0.55)' }}
        >
            <p
                className="text-center text-pink-300 text-xs tracking-[3px] uppercase mb-3 font-semibold"
                style={{ fontFamily: "'Nunito', sans-serif" }}
            >
                Your friendship matters since
            </p>
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Days', val: time.days },
                    { label: 'Hours', val: time.hours },
                    { label: 'Mins', val: time.minutes },
                    { label: 'Secs', val: time.seconds },
                ].map(({ label, val }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center rounded-xl py-3 px-1"
                        style={{ background: 'rgba(255,110,180,0.12)', border: '1px solid rgba(255,110,180,0.2)' }}
                    >
                        <AnimatedNum value={val} />
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

// ── Glowing Moon ──
const GlowingMoon: React.FC = () => (
    <motion.div
        className="fixed top-6 left-4 z-20 pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
        <div
            className="w-16 h-16 rounded-full"
            style={{
                background: 'radial-gradient(circle at 35% 35%, #fffde7, #ffd700 60%, #e6a800)',
                clipPath: 'ellipse(55% 100% at 70% 50%)',
                boxShadow: '0 0 40px 10px rgba(255,215,0,0.3)',
            }}
        />
    </motion.div>
);

// ── Orbiting Hearts around name ──
const OrbitingHearts: React.FC = () => {
    const count = 6;
    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * 360;
                const r = 70;
                return (
                    <motion.div
                        key={i}
                        className="absolute text-lg"
                        style={{ left: '50%', top: '50%' }}
                        animate={{ rotate: [angle, angle + 360] }}
                        transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.span
                            style={{
                                display: 'block',
                                transform: `translate(-50%, -50%) translateX(${r}px)`,
                            }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        >
                            {['💗', '💖', '💕', '💝', '💓', '💞'][i]}
                        </motion.span>
                    </motion.div>
                );
            })}
        </div>
    );
};

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
    const [phase, setPhase] = useState<'start' | 'reveal' | 'main'>('start');
    const [, setConfettiActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleStart = useCallback(() => {
        audioRef.current?.play().catch(() => { });
        if (audioRef.current) audioRef.current.volume = 0.5;
        setPhase('reveal');
        setTimeout(() => {
            setPhase('main');
            setConfettiActive(true);
            setTimeout(() => setConfettiActive(false), 8000);
        }, 2200);
    }, []);

    return (
        <div
            className="relative w-full min-h-[100dvh] overflow-hidden select-none"
            style={{
                background: 'linear-gradient(160deg, #020318 0%, #0a0a2e 30%, #0d0520 60%, #12021a 100%)',
                fontFamily: "'Nunito', sans-serif",
            }}
        >
            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;600;800&display=swap');
      `}</style>

            <audio ref={audioRef} src="/aud.mp3" loop />

            <StarField count={140} />
            <ShootingStar />

            {/* ── START SCREEN ── */}
            <AnimatePresence>
                {phase === 'start' && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                        style={{ background: 'radial-gradient(ellipse at 50% 60%, #150a3e 0%, #020318 75%)' }}
                        exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.08 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    >
                        <GlowingMoon />

                        {/* Floating balloons on start */}
                        {[
                            { color: 'radial-gradient(circle at 35% 30%,#ffb3d9,#ff2d78)', left: '8%', size: 52, dur: 7, delay: 0 },
                            { color: 'radial-gradient(circle at 35% 30%,#d8b4fe,#7c3aed)', left: '78%', size: 44, dur: 9, delay: 1.5 },
                            { color: 'radial-gradient(circle at 35% 30%,#fef08a,#f59e0b)', left: '50%', size: 36, dur: 8, delay: 3 },
                        ].map((b, i) => (
                            <motion.div
                                key={i}
                                className="fixed rounded-full pointer-events-none"
                                style={{
                                    width: b.size, height: b.size * 1.1,
                                    background: b.color,
                                    left: b.left, bottom: '10%',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                }}
                                animate={{ y: [0, -(window.innerHeight * 1.2)] }}
                                transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        ))}

                        {/* Stars raining down subtly */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="fixed text-yellow-200 pointer-events-none text-xs"
                                style={{ left: `${10 + i * 12}%`, top: 0 }}
                                animate={{ y: '110vh', opacity: [0, 0.7, 0], rotate: 360 }}
                                transition={{ duration: 5 + i, delay: i * 0.8, repeat: Infinity, ease: 'linear' }}
                            >
                                ✦
                            </motion.div>
                        ))}

                        <motion.div
                            className="flex flex-col items-center gap-3 px-8 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <motion.span
                                className="text-5xl"
                                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🎂
                            </motion.span>

                            <p
                                className="text-pink-300/70 text-xs tracking-[4px] uppercase font-semibold"
                            >
                                A special surprise for
                            </p>

                            <h1
                                className="text-5xl font-black text-transparent bg-clip-text leading-tight"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    backgroundImage: 'linear-gradient(135deg, #ff6eb4 0%, #c084fc 50%, #ffd700 100%)',
                                    filter: 'drop-shadow(0 0 20px rgba(255,110,180,0.5))',
                                }}
                            >
                                Khushi
                            </h1>
                            <h2
                                className="text-2xl font-bold text-white/70"
                                style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                            >
                                Bansal
                            </h2>

                            <p className="text-white/40 text-xs mt-1">from Ritik Apurwa 🤍</p>

                            <motion.button
                                onClick={handleStart}
                                className="mt-6 px-10 py-4 rounded-full text-white font-bold text-lg relative overflow-hidden"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    background: 'linear-gradient(135deg, #ff2d78, #c084fc)',
                                    boxShadow: '0 0 40px rgba(255,45,120,0.5), 0 4px 20px rgba(0,0,0,0.4)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                }}
                                whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(255,45,120,0.7)' }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ boxShadow: ['0 0 30px rgba(255,45,120,0.4)', '0 0 60px rgba(255,45,120,0.7)', '0 0 30px rgba(255,45,120,0.4)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="relative z-10">Open Your Gift 🎁</span>
                                {/* shimmer */}
                                <motion.span
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                                />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── REVEAL TRANSITION ── */}
            <AnimatePresence>
                {phase === 'reveal' && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ background: 'radial-gradient(ellipse at center, #ff2d7840 0%, #0a0a2e 70%)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: [0, 1.5, 1], rotate: [0, 20, 0] }}
                            transition={{ duration: 1.5, ease: 'backOut' }}
                            className="text-8xl"
                        >
                            💖
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN SCENE ── */}
            <AnimatePresence>
                {phase === 'main' && (
                    <motion.div
                        className="relative min-h-[100dvh] w-full z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <FloatingHearts />

                        <GlowingMoon />

                        {/* Glowing orbs background */}
                        <div
                            className="fixed top-1/4 right-0 w-64 h-64 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
                        />
                        <div
                            className="fixed bottom-1/4 left-0 w-64 h-64 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
                        />

                        <div className="relative z-10 flex flex-col items-center px-5 pb-16">

                            {/* ── NAME HEADER ── */}
                            <motion.div
                                className="w-full text-center pt-10 pb-2 relative"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <motion.p
                                    className="text-pink-300/60 text-[10px] tracking-[5px] uppercase font-semibold mb-1"
                                >
                                    ✦ Happy Birthday ✦
                                </motion.p>

                                {/* Orbiting hearts */}
                                <div className="relative inline-block">
                                    <div className="relative w-48 h-16 mx-auto">
                                        <OrbitingHearts />
                                        <h1
                                            className="absolute inset-0 flex items-center justify-center text-4xl font-black text-transparent bg-clip-text"
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                backgroundImage: 'linear-gradient(135deg, #ff6eb4, #ffd700 50%, #c084fc)',
                                                filter: 'drop-shadow(0 0 25px rgba(255,110,180,0.6))',
                                            }}
                                        >
                                            Khushi 👑
                                        </h1>
                                    </div>
                                </div>

                                <motion.p
                                    className="text-white/40 text-xs mt-1 italic"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    May your day be as bright as you are
                                </motion.p>
                            </motion.div>

                            {/* ── DIVIDER ── */}


                            {/* ── TREE & HEART BLOOM ── */}
                            <motion.div
                                className="relative w-48 h-60 md:w-64 md:h-72 my-2"
                                style={{ marginTop: '10px' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                <GrowingTree />
                                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
                                    <HeartBloom />
                                </div>
                            </motion.div>

                            {/* ── TIMER ── */}
                            <div className="w-full max-w-sm">
                                <LiveTimer startDate={RELATIONSHIP_START} />
                            </div>

                            {/* ── FOOTER ── */}
                            <motion.div
                                className="mt-8 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 4 }}
                            >
                                <p className="text-white/30 text-xs tracking-widest uppercase mb-1">with all the warmth,</p>
                                <p
                                    className="text-2xl font-black text-transparent bg-clip-text"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        backgroundImage: 'linear-gradient(135deg, #ff6eb4, #c084fc)',
                                    }}
                                >
                                    Ritik Apurwa 🤍
                                </p>
                                <motion.div
                                    className="flex gap-2 justify-center mt-3 text-xl"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    🌸 💖 🌸
                                </motion.div>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
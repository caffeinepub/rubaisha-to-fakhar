import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// --- Types ---
interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  emoji: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

// --- Heart Rain Component ---
function HeartRain() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const emojis = ["❤️", "💕", "🌹", "💖", "✨", "💗", "🌸", "💝"];

    const spawnHeart = () => {
      const id = counterRef.current++;
      const particle: HeartParticle = {
        id,
        x: Math.random() * 100,
        size: 12 + Math.random() * 24,
        duration: 7 + Math.random() * 8,
        delay: Math.random() * 1,
        swayDuration: 3 + Math.random() * 4,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
      setHearts((prev) => [...prev.slice(-40), particle]);
    };

    const interval = setInterval(spawnHeart, 600);
    for (let i = 0; i < 12; i++) {
      setTimeout(spawnHeart, i * 120);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: "105vh", x: `${h.x}vw`, opacity: 0, scale: 0.5 }}
            animate={{
              y: "-10vh",
              x: [
                `${h.x}vw`,
                `${h.x + 4}vw`,
                `${h.x - 4}vw`,
                `${h.x + 3}vw`,
                `${h.x}vw`,
              ],
              opacity: [0, 0.9, 0.9, 0.6, 0],
              scale: [0.5, 1, 1, 0.7, 0.3],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              ease: "linear" as const,
              x: {
                duration: h.swayDuration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
              },
            }}
            onAnimationComplete={() => {
              setHearts((prev) => prev.filter((p) => p.id !== h.id));
            }}
            style={{
              fontSize: h.size,
              position: "fixed",
              userSelect: "none",
            }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Sparkle Field Component ---
function SparkleField({ count = 30 }: { count?: number }) {
  const sparkles = useRef<Sparkle[]>(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    })),
  ).current;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
            ease: "easeInOut" as const,
          }}
        >
          <svg
            width={s.size * 4}
            height={s.size * 4}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            role="presentation"
          >
            <path
              d="M10 0 L10.8 8.5 L18 10 L10.8 11.5 L10 20 L9.2 11.5 L2 10 L9.2 8.5 Z"
              fill="oklch(0.82 0.1 60)"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// --- Decorative Ornament ---
function OrnamentalBorder() {
  return (
    <div
      className="w-full flex items-center justify-center gap-3 my-6"
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear" as const,
        }}
        className="text-gold text-2xl"
      >
        ✦
      </motion.span>
      <span className="text-rose text-xl">❧</span>
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
        }}
        className="text-2xl"
      >
        ❤️
      </motion.span>
      <span className="text-rose text-xl">❧</span>
      <motion.span
        animate={{ rotate: [360, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear" as const,
        }}
        className="text-gold text-2xl"
      >
        ✦
      </motion.span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold to-transparent opacity-60" />
    </div>
  );
}

// Fade up variants — delay baked in via custom index
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut" as const,
      delay: 0.4 + i * 0.35,
    },
  }),
};

// --- Main Proposal Letter ---
function ProposalLetter() {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12 md:py-20"
      data-ocid="proposal.card"
    >
      {/* Outer glow frame */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.16 0.04 350 / 0.92), oklch(0.12 0.03 345 / 0.96))",
          boxShadow:
            "0 0 60px oklch(0.62 0.18 354 / 0.25), 0 0 120px oklch(0.35 0.12 358 / 0.15), inset 0 1px 0 oklch(0.82 0.1 60 / 0.2)",
          border: "1px solid oklch(0.82 0.1 60 / 0.25)",
        }}
      >
        {/* Top ribbon */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.18 354), oklch(0.82 0.1 60), oklch(0.62 0.18 354), transparent)",
          }}
        />

        <div className="p-8 md:p-14">
          {/* To: */}
          <motion.div
            variants={fadeUpVariants}
            custom={0}
            className="text-center mb-2"
          >
            <span
              className="text-muted-foreground text-lg font-body italic tracking-widest"
              style={{ color: "oklch(0.72 0.06 55)" }}
            >
              To My Dearest,
            </span>
          </motion.div>

          {/* Fakhar heading */}
          <motion.h1
            variants={fadeUpVariants}
            custom={1}
            className="font-display text-center mb-2"
            style={{
              fontSize: "clamp(3rem, 10vw, 5.5rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg, oklch(0.78 0.1 55) 0%, oklch(0.95 0.06 72) 40%, oklch(0.78 0.1 55) 70%, oklch(0.95 0.06 72) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px oklch(0.82 0.1 60 / 0.5))",
            }}
            data-ocid="proposal.section"
          >
            Fakhar
          </motion.h1>

          <motion.div variants={fadeUpVariants} custom={2}>
            <OrnamentalBorder />
          </motion.div>

          {/* Opening line */}
          <motion.p
            variants={fadeUpVariants}
            custom={3}
            className="font-body text-center text-xl md:text-2xl leading-relaxed mb-6"
            style={{ color: "oklch(0.90 0.03 60)", fontStyle: "italic" }}
          >
            With every beat of my heart, every quiet thought, every whispered
            prayer — your name has been the answer.
          </motion.p>

          {/* THE acceptance line */}
          <motion.div
            variants={fadeUpVariants}
            custom={4}
            className="my-8 px-4 md:px-8 py-6 rounded-xl text-center relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.06 348 / 0.6), oklch(0.18 0.04 352 / 0.8))",
              border: "1px solid oklch(0.62 0.18 354 / 0.35)",
              boxShadow: "inset 0 0 40px oklch(0.62 0.18 354 / 0.08)",
            }}
          >
            <span
              className="absolute top-3 left-4 text-rose opacity-60 text-lg"
              aria-hidden="true"
            >
              ❧
            </span>
            <span
              className="absolute top-3 right-4 text-rose opacity-60 text-lg"
              aria-hidden="true"
            >
              ❧
            </span>
            <span
              className="absolute bottom-3 left-4 text-rose opacity-60 text-lg rotate-180"
              aria-hidden="true"
            >
              ❧
            </span>
            <span
              className="absolute bottom-3 right-4 text-rose opacity-60 text-lg rotate-180"
              aria-hidden="true"
            >
              ❧
            </span>

            <motion.p
              className="font-display text-center"
              style={{
                fontSize: "clamp(1.3rem, 4vw, 2rem)",
                fontWeight: 600,
                fontStyle: "italic",
                lineHeight: 1.5,
                color: "oklch(0.95 0.04 65)",
                textShadow:
                  "0 0 25px oklch(0.82 0.1 60 / 0.5), 0 0 50px oklch(0.62 0.18 354 / 0.25)",
              }}
              animate={{
                textShadow: [
                  "0 0 25px oklch(0.82 0.1 60 / 0.4), 0 0 50px oklch(0.62 0.18 354 / 0.2)",
                  "0 0 40px oklch(0.82 0.1 60 / 0.8), 0 0 80px oklch(0.62 0.18 354 / 0.4)",
                  "0 0 25px oklch(0.82 0.1 60 / 0.4), 0 0 50px oklch(0.62 0.18 354 / 0.2)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
              }}
            >
              "I am proudly accepting your proposal
              <br />
              from the depth of my heart."
            </motion.p>
          </motion.div>

          {/* Body paragraph 1 */}
          <motion.p
            variants={fadeUpVariants}
            custom={5}
            className="font-body text-center text-lg md:text-xl leading-loose mb-5"
            style={{ color: "oklch(0.88 0.025 55)" }}
          >
            You came into my life and changed the colour of everything. In your
            eyes I found a home, in your voice I found peace, and in your love I
            found myself. There is no one else I would choose — in this life or
            any other.
          </motion.p>

          {/* Body paragraph 2 */}
          <motion.p
            variants={fadeUpVariants}
            custom={6}
            className="font-body text-center text-lg md:text-xl leading-loose mb-5"
            style={{
              color: "oklch(0.88 0.025 55)",
              fontStyle: "italic",
            }}
          >
            My answer is Yes — a thousand times, yes. Let us build a life
            together written in love, sealed with faith, and blessed by
            everything above.
          </motion.p>

          <motion.div variants={fadeUpVariants} custom={7}>
            <OrnamentalBorder />
          </motion.div>

          {/* Floating emoji row */}
          <motion.div
            variants={fadeUpVariants}
            custom={8}
            className="flex justify-center gap-4 my-6 text-3xl"
            aria-hidden="true"
          >
            {(
              [
                { key: "rose-1", emoji: "🌹" },
                { key: "hearts-1", emoji: "💕" },
                { key: "heart", emoji: "❤️" },
                { key: "hearts-2", emoji: "💕" },
                { key: "rose-2", emoji: "🌹" },
              ] as const
            ).map(({ key, emoji }, i) => (
              <motion.span
                key={key}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.25,
                  ease: "easeInOut" as const,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Signed by Rubaisha */}
          <motion.div
            variants={fadeUpVariants}
            custom={9}
            className="text-center mt-8"
          >
            <p
              className="font-body text-lg mb-2"
              style={{ color: "oklch(0.72 0.06 55)", letterSpacing: "0.1em" }}
            >
              With all my love,
            </p>
            <motion.h2
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.1,
                color: "oklch(0.85 0.12 354)",
                textShadow:
                  "0 0 30px oklch(0.62 0.18 354 / 0.5), 0 0 60px oklch(0.62 0.18 354 / 0.25)",
              }}
              animate={{
                textShadow: [
                  "0 0 20px oklch(0.62 0.18 354 / 0.4)",
                  "0 0 40px oklch(0.62 0.18 354 / 0.7), 0 0 80px oklch(0.82 0.1 60 / 0.3)",
                  "0 0 20px oklch(0.62 0.18 354 / 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
                delay: 1,
              }}
              data-ocid="proposal.panel"
            >
              Rubaisha
            </motion.h2>
            <motion.div
              className="flex justify-center mt-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
              }}
            >
              <span className="text-4xl" aria-hidden="true">
                💍
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom ribbon */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.18 354), oklch(0.82 0.1 60), oklch(0.62 0.18 354), transparent)",
          }}
          aria-hidden="true"
        />
      </div>
    </motion.article>
  );
}

// --- App Root ---
export default function App() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, oklch(0.22 0.06 350) 0%, oklch(0.12 0.03 345) 40%, oklch(0.08 0.02 340) 100%)",
      }}
    >
      {/* Background image overlay */}
      <div
        className="fixed inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            "url('/assets/generated/romantic-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px) saturate(1.2)",
        }}
        aria-hidden="true"
      />

      {/* Ambient gradient overlays */}
      <div
        className="fixed inset-0 z-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 10%, oklch(0.35 0.12 358 / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, oklch(0.35 0.12 358 / 0.2) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Particle layers */}
      <SparkleField count={40} />
      <HeartRain />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10">
        {/* Top flourish label */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="text-center mb-4"
        >
          <p
            className="font-body text-base tracking-[0.3em] uppercase mb-1"
            style={{ color: "oklch(0.82 0.1 60 / 0.7)" }}
          >
            ✦ A Letter of the Heart ✦
          </p>
        </motion.div>

        <ProposalLetter />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="relative z-10 text-center mt-4 pb-8"
        >
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.55 0.04 55)" }}
          >
            © {new Date().getFullYear()}. Built with{" "}
            <span aria-label="love" className="text-rose">
              ♥
            </span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
              style={{ color: "oklch(0.60 0.06 55)" }}
              data-ocid="footer.link"
            >
              caffeine.ai
            </a>
          </p>
        </motion.footer>
      </main>
    </div>
  );
}

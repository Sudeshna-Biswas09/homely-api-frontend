/**
 * Homely — static floral welcome page.
 * Purely decorative: no links, no routes, no state, no handlers, no buttons that imply action.
 * A single composed "invitation card" scene rather than a scrolling homepage.
 */

const WelcomePage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FDF8F3] px-6 py-16">
      {/* soft gradient wash, confined to a soothing radial glow rather than the full page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(147,51,234,0.42) 0%, rgba(236,72,153,0.34) 45%, transparent 75%)',
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap');
        .welcome-serif { font-family: 'Playfair Display', serif; }
        .welcome-body { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* faint paper texture / vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(circle at 85% 85%, rgba(255,255,255,0.08), transparent 55%)',
        }}
      />

      {/* ================= corner floral sprigs ================= */}
      <svg
        aria-hidden
        viewBox="0 0 220 220"
        className="pointer-events-none absolute left-0 top-0 h-40 w-40 -translate-x-4 -translate-y-4 opacity-90 sm:h-56 sm:w-56"
      >
        <g fill="none" stroke="#B85C7C" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 10 C 40 30, 55 60, 50 100 C 46 135, 65 160, 95 175" />
          <path d="M50 100 C 75 95, 90 78, 88 55" />
          <path d="M50 100 C 68 112, 88 112, 100 100" />
          <path d="M30 45 C 45 50, 55 42, 55 28" />
        </g>
        <g fill="#D9A5B3">
          <ellipse cx="88" cy="55" rx="9" ry="5" transform="rotate(-30 88 55)" />
          <ellipse cx="55" cy="28" rx="7" ry="4" transform="rotate(20 55 28)" />
        </g>
        <g fill="none" stroke="#6B7A5E" strokeWidth="1.3" strokeLinecap="round">
          <path d="M14 62 C 24 58, 30 66, 26 76 C 22 66, 16 68, 14 62 Z" />
          <path d="M60 130 C 70 126, 76 134, 72 144 C 68 134, 62 136, 60 130 Z" />
        </g>
        <circle cx="95" cy="175" r="6" fill="#8E4162" opacity="0.85" />
        <circle cx="100" cy="100" r="4" fill="#B85C7C" opacity="0.7" />
      </svg>

      <svg
        aria-hidden
        viewBox="0 0 220 220"
        className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 translate-x-4 translate-y-4 rotate-180 opacity-90 sm:h-56 sm:w-56"
      >
        <g fill="none" stroke="#B85C7C" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 10 C 40 30, 55 60, 50 100 C 46 135, 65 160, 95 175" />
          <path d="M50 100 C 75 95, 90 78, 88 55" />
          <path d="M50 100 C 68 112, 88 112, 100 100" />
          <path d="M30 45 C 45 50, 55 42, 55 28" />
        </g>
        <g fill="#D9A5B3">
          <ellipse cx="88" cy="55" rx="9" ry="5" transform="rotate(-30 88 55)" />
          <ellipse cx="55" cy="28" rx="7" ry="4" transform="rotate(20 55 28)" />
        </g>
        <g fill="none" stroke="#6B7A5E" strokeWidth="1.3" strokeLinecap="round">
          <path d="M14 62 C 24 58, 30 66, 26 76 C 22 66, 16 68, 14 62 Z" />
          <path d="M60 130 C 70 126, 76 134, 72 144 C 68 134, 62 136, 60 130 Z" />
        </g>
        <circle cx="95" cy="175" r="6" fill="#8E4162" opacity="0.85" />
        <circle cx="100" cy="100" r="4" fill="#B85C7C" opacity="0.7" />
      </svg>

      {/* mirrored sprigs, top-right / bottom-left, smaller */}
      <svg
        aria-hidden
        viewBox="0 0 220 220"
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 -translate-y-2 translate-x-2 -scale-x-100 opacity-70 sm:h-36 sm:w-36"
      >
        <g fill="none" stroke="#B85C7C" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 10 C 40 30, 55 60, 50 100" />
          <path d="M50 100 C 75 95, 90 78, 88 55" />
        </g>
        <g fill="#D9A5B3">
          <ellipse cx="88" cy="55" rx="8" ry="4.5" transform="rotate(-30 88 55)" />
        </g>
        <g fill="none" stroke="#6B7A5E" strokeWidth="1.3" strokeLinecap="round">
          <path d="M14 62 C 24 58, 30 66, 26 76 C 22 66, 16 68, 14 62 Z" />
        </g>
      </svg>

      <svg
        aria-hidden
        viewBox="0 0 220 220"
        className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 translate-y-2 -translate-x-2 -scale-x-100 rotate-180 opacity-70 sm:h-36 sm:w-36"
      >
        <g fill="none" stroke="#B85C7C" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 10 C 40 30, 55 60, 50 100" />
          <path d="M50 100 C 75 95, 90 78, 88 55" />
        </g>
        <g fill="#D9A5B3">
          <ellipse cx="88" cy="55" rx="8" ry="4.5" transform="rotate(-30 88 55)" />
        </g>
        <g fill="none" stroke="#6B7A5E" strokeWidth="1.3" strokeLinecap="round">
          <path d="M14 62 C 24 58, 30 66, 26 76 C 22 66, 16 68, 14 62 Z" />
        </g>
      </svg>

      {/* ================= center invitation card ================= */}
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        {/* small botanical divider above eyebrow */}
        <svg aria-hidden viewBox="0 0 140 20" className="mb-6 h-4 w-32 opacity-80">
          <path
            d="M2 10 C 30 2, 40 18, 70 10 C 100 2, 110 18, 138 10"
            fill="none"
            stroke="#B85C7C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="70" cy="10" r="3" fill="#8E4162" />
        </svg>

        <p
          className="welcome-body text-sm uppercase tracking-[0.35em] text-[#873056]"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.12)' }}
        >
          Welcome to
        </p>

        <h1
          className="welcome-serif mt-3 text-5xl font-semibold leading-tight text-[#3B2A2E] sm:text-6xl"
          style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.14)',
          }}
        >
          Homely
        </h1>

        <p
          className="welcome-body mt-1 text-lg italic text-[#b13460]"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          a garden of quiet stays
        </p>

        {/* botanical divider below title */}
        <svg aria-hidden viewBox="0 0 200 24" className="my-8 h-5 w-44">
          <path
            d="M4 12 C 50 -2, 70 26, 100 12 C 130 -2, 150 26, 196 12"
            fill="none"
            stroke="#6B7A5E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <ellipse cx="100" cy="12" rx="6" ry="3.5" fill="#D9A5B3" />
        </svg>

        <p
          className="welcome-body max-w-md text-xl leading-relaxed text-[#35292c]"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          Where every room is dressed in soft linen, morning light, and
          the quiet scent of something blooming just outside the window.
        </p>

        {/* decorative, non-interactive label — not a link or button */}
        <div
          className="welcome-body mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#8E4162]"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          <span className="h-px w-8 bg-[#D9A5B3]" />
          Est. for those who linger
          <span className="h-px w-8 bg-[#D9A5B3]" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
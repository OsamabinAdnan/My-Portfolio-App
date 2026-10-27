'use client';

const WHATSAPP_NUMBER = '923022311916';

export function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-[70] group font-mono"
    >
      <span className="relative w-11 h-11 sm:w-12 sm:h-12 bg-[#0a0d18] border border-[#00ff9f] text-[#00ff9f] hover:bg-[#00ff9f] hover:text-black shadow-[0_0_20px_rgba(0,255,159,0.35)] hover:shadow-[0_0_35px_rgba(0,255,159,0.75)] flex items-center justify-center transition-all duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-current transition-colors"
        >
          <path
            fill="currentColor"
            d="M16 3C8.832 3 3 8.52 3 15.308c0 2.68.88 5.19 2.51 7.27L4 29l6.74-1.76c1.63.86 3.5 1.32 5.26 1.32 7.168 0 13-5.52 13-12.308C29 8.52 23.168 3 16 3Zm0 22.385c-1.66 0-3.29-.43-4.72-1.25l-.54-.31-4 .98 1.07-3.73-.36-.55c-1.45-1.93-2.22-4.18-2.22-6.51C5.23 9.99 10.06 5.5 16 5.5c5.94 0 10.77 4.49 10.77 9.998 0 5.507-4.83 9.887-10.77 9.887Zm6.05-7.39c-.33-.16-1.94-.93-2.24-1.03-.3-.11-.52-.16-.74.16-.22.32-.85 1.03-1.04 1.24-.19.21-.38.24-.7.08-.33-.16-1.38-.49-2.62-1.56-.97-.82-1.62-1.83-1.81-2.14-.19-.32-.02-.49.14-.65.14-.14.33-.35.49-.53.16-.18.22-.3.33-.5.11-.21.05-.4-.03-.56-.08-.16-.74-1.75-1.02-2.4-.27-.64-.54-.56-.74-.57h-.63c-.22 0-.56.08-.85.4-.3.32-1.11 1.05-1.11 2.56 0 1.5 1.14 2.95 1.3 3.15.16.21 2.24 3.43 5.43 4.81.76.32 1.35.51 1.81.65.76.23 1.45.2 2 .12.61-.09 1.94-.77 2.21-1.52.27-.75.27-1.4.19-1.52-.08-.12-.3-.19-.63-.35Z"
          />
        </svg>
      </span>
    </a>
  );
}

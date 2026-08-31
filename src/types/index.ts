@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-agent-bg: #FFFFFF;
  --color-agent-ink: #000000;
  --color-agent-muted: #52525B;
  --color-agent-border: #E4E4E7;

  --color-dark-bg: #09090B;
  --color-dark-ink: #FAFAFA;
  --color-dark-muted: #D4D4D8;
  --color-dark-border: #27272A;
}

@layer base {
  body {
    @apply bg-zinc-950 text-zinc-50 font-sans antialiased transition-colors duration-300;
  }
}

@layer components {
  .agent-card {
    @apply border border-zinc-800 rounded-2xl bg-zinc-900/50 transition-all;
  }
  
  .agent-input {
    @apply w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/5 focus:border-white transition-all font-mono text-sm text-zinc-50;
  }

  .agent-button-primary {
    @apply bg-white text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50;
  }

  .agent-button-secondary {
    @apply border border-zinc-800 text-zinc-50 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all active:scale-95;
  }
}

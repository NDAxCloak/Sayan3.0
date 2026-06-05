import { useEffect, useRef } from "react";

export default function CursedBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamically generate drifting sparks in background
    const sparkCount = 24;
    const sparks: HTMLDivElement[] = [];

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("div");
      
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * -15;

      spark.className = "absolute rounded-full pointer-events-none opacity-40 blur-[1px]";
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.top = `${Math.random() * 100}%`;
      
      // JJK themed colors
      const r = Math.random();
      if (r < 0.4) {
        spark.style.backgroundColor = "#06b6d4"; // Cyan Blue
        spark.style.boxShadow = "0 0 8px #06b6d4";
      } else if (r < 0.8) {
        spark.style.backgroundColor = "#a855f7"; // Purple
        spark.style.boxShadow = "0 0 10px #a855f7";
      } else {
        spark.style.backgroundColor = "#ec4899"; // Pink Cursed Energy
        spark.style.boxShadow = "0 0 8px #ec4899";
      }

      spark.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 0 },
          { opacity: 0.6, offset: 0.2 },
          { opacity: 0.6, offset: 0.8 },
          { transform: `translate(${(Math.random() * 100 - 50)}px, ${-(Math.random() * 250 + 100)}px) scale(0.4)`, opacity: 0 }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          delay: delay * 1000,
          easing: "linear"
        }
      );

      container.appendChild(spark);
      sparks.push(spark);
    }

    return () => {
      sparks.forEach(s => s.remove());
    };
  }, []);

  return (
    <div
      id="cursed-layout-background"
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-20 bg-[#050505] overflow-hidden"
    >
      {/* Abstract Domain Blobs from Editorial theme */}
      <div 
        id="bg-domain-glow-1"
        className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
      />
      <div 
        id="bg-domain-glow-2"
        className="absolute bottom-[-50px] left-[20%] w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div 
        id="bg-domain-glow-3"
        className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] rounded-full bg-fuchsia-950/10 blur-[100px] pointer-events-none"
      />

      {/* Grid Pattern with Domain feel */}
      <div 
        id="bg-domain-grid"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"
      />
    </div>
  );
}

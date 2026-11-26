interface WaveDividerProps {
  variant: "hero" | "spotlight";
}

export default function WaveDivider({ variant }: WaveDividerProps) {
  if (variant === "hero") {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden leading-none">
        {/* Back Layer — Deep Crimson Fold */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-layer-back w-[108%] -ml-[4%] h-[210px] sm:h-[290px] md:h-[340px] paper-cut-shadow"
        >
          <path
            fill="#9E1920"
            d="M0,160 C220,270 410,60 720,170 C1020,275 1230,90 1440,180 L1440,320 L0,320 Z"
          />
        </svg>

        {/* Mid Layer — Crisp Gallery White Cutout */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-layer-mid -mt-[150px] sm:-mt-[215px] md:-mt-[255px] w-[108%] -ml-[4%] h-[190px] sm:h-[260px] md:h-[300px] paper-cut-shadow"
        >
          <path
            fill="#FFFFFF"
            d="M0,192 C280,85 520,295 820,160 C1080,45 1290,210 1440,128 L1440,320 L0,320 Z"
          />
        </svg>

        {/* Front Layer — Gallery White Seamless Floor */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="wave-layer-front -mt-[95px] sm:-mt-[125px] w-full h-[110px] sm:h-[145px]"
        >
          <path
            fill="#F8F9FA"
            d="M0,72 C360,145 780,10 1120,88 C1280,124 1380,96 1440,68 L1440,160 L0,160 Z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="w-full h-[90px] sm:h-[130px] paper-cut-shadow"
      >
        <path
          fill="#F8F9FA"
          d="M0,0 L1440,0 L1440,86 C1180,175 880,18 540,104 C280,170 120,76 0,118 Z"
        />
      </svg>
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="spotlight-wave-top -mt-[78px] sm:-mt-[112px] w-[106%] -ml-[3%] h-[82px] sm:h-[115px] paper-cut-shadow-soft"
      >
        <path
          fill="#C8232C"
          opacity="0.92"
          d="M0,45 C310,145 640,12 990,95 C1210,148 1340,65 1440,42 L1440,0 L0,0 Z"
        />
      </svg>
    </div>
  );
}

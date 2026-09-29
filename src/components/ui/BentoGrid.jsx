// Based on Magic UI "Bento Grid" (21st.dev/community/components/s/bento-grid)
// Simplified to JSX; each card takes a `background` visual and free-form children.
export const BentoGrid = ({ children, className = "" }) => (
  <div className={`grid w-full grid-cols-1 lg:grid-cols-3 gap-4 ${className}`}>{children}</div>
);

export const BentoCard = ({ className = "", background, children }) => (
  <div
    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl card-border
      [box-shadow:0_-20px_80px_-20px_#ffffff10_inset] transition-colors duration-300 hover:border-blue-50/30 ${className}`}
  >
    {background && <div className="relative">{background}</div>}
    <div className="relative z-10 flex flex-col gap-3 p-6 md:p-8">{children}</div>
  </div>
);

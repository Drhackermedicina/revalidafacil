
import type { SVGProps } from 'react';

// Interface for the props, allowing width, height, and other SVG attributes
interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  width?: number | string;
  height?: number | string;
}

const Logo = ({ width, height, className, ...rest }: LogoProps) => (
  <svg
    width={width || 32}
    height={height || 32}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Revalida Fácil Logo - Notebook"
    {...rest}
  >
    {/* Base do notebook */}
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.7 20H3.3a1 1 0 0 1-.58-1.45L4 16" />
    {/* Tela do notebook */}
    <rect x="2.5" y="4.5" width="19" height="11" rx="1" ry="1" fill="currentColor" strokeWidth="0" className="opacity-20 dark:opacity-30" />
  </svg>
);

export default Logo;

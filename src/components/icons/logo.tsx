import type { SVGProps } from 'react';

// Interface for the props, allowing width, height, and other SVG attributes
interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  width?: number | string;
  height?: number | string;
}

const Logo = ({ width, height, className, ...rest }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Standard viewBox
    fill="currentColor"
    width={width || 40} // Default width if not provided
    height={height || 40} // Default height if not provided
    className={className}
    aria-label="Revalida Fácil Logo - Capelo de Formando" // For accessibility
    {...rest}
  >
    <title>Revalida Fácil Logo - Capelo de Formando</title>
    {/* Mortarboard (Top Diamond) */}
    <path d="M12 2 L22 7 L12 12 L2 7 Z" />
    {/* Cap Body (Trapezoid that fits under the diamond) */}
    <path d="M5 10 L19 10 L17 17 L7 17 Z" />
    {/* Tassel (hanging left from top-center of mortarboard) */}
    <path d="M12 2 L12 6 L9 6 L9 13 Z" />
  </svg>
);

export default Logo;

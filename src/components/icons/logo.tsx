import type { SVGProps } from 'react';

// Interface for the props, allowing width, height, and other SVG attributes
interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  width?: number | string;
  height?: number | string;
}

const Logo = ({ width, height, className, ...rest }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={width || 36} // Adjusted default size
    height={height || 36} // Adjusted default size
    className={className}
    aria-label="Revalida Fácil Logo - Capelo de Formando"
    {...rest}
  >
    <title>Revalida Fácil Logo - Capelo de Formando</title>
    {/* Mortarboard (Top Diamond) - Refined proportions */}
    <path d="M12 2.5 L22.5 7 L12 11.5 L1.5 7 Z" />
    {/* Cap Body (Trapezoid) - Adjusted to fit the refined top */}
    <path d="M4.5 10.5 L19.5 10.5 L18 17.5 L6 17.5 Z" />
    {/* Tassel (Borla) - Solid, closed shape for better fill rendering */}
    <path d="M12 2.5 L12 6 L9.5 6 L9.5 12 L8 12 L8 13.5 L11 13.5 L11 12 L9.5 12 L9.5 6 Z" />
  </svg>
);

export default Logo;

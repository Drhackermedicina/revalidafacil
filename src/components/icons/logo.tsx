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
    width={width || 40} // Default width if not provided
    height={height || 40} // Default height if not provided
    className={className}
    aria-label="Revalida Fácil Logo - Capelo de Formando" // For accessibility
    {...rest}
  >
    <title>Revalida Fácil Logo - Capelo de Formando</title>
    <path d="M12 3L1 9L12 15L23 9L12 3ZM5 10.47V17L12 21L19 17V10.47L12 14.27L5 10.47Z" />
  </svg>
);

export default Logo;

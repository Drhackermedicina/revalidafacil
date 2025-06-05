import type { SVGProps } from 'react';
import { Laptop } from 'lucide-react';

// Interface for the props, allowing width, height, and other SVG attributes
interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  width?: number | string;
  height?: number | string;
}

const Logo = ({ width, height, className, ...rest }: LogoProps) => (
  <Laptop
    width={width || 36}
    height={height || 36}
    className={className}
    aria-label="Revalida Fácil Logo - Notebook"
    {...rest}
  />
);

export default Logo;

import Image from 'next/image';
import type { ImageProps } from 'next/image';

// Updated to use a placeholder for a graduation cap
const LOGO_IMAGE_SRC = "https://placehold.co/40x40.png";

const Logo = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image
    src={LOGO_IMAGE_SRC}
    alt="Revalida Fácil Logo - Capelo de Formando"
    data-ai-hint="graduation cap"
    width={props.width || 40} // Default width
    height={props.height || 40} // Default height
    priority // Preload the logo
    {...props} // Allow overriding width, height, className, etc.
    unoptimized={LOGO_IMAGE_SRC.startsWith('https://placehold.co')}
  />
);
export default Logo;

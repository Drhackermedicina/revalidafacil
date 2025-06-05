import Image from 'next/image';
import type { ImageProps } from 'next/image';

// Updated to use the Firebase Storage URL
const LOGO_IMAGE_SRC = "https://firebasestorage.googleapis.com/v0/b/appestacoes.firebasestorage.app/o/Gemini_Generated_Image_i9d3fi9d3fi9d3fi.png?alt=media&token=3d5efc89-91be-4954-8a27-c20fd56bcc71";

const Logo = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image
    src={LOGO_IMAGE_SRC}
    alt="Revalida Fácil Logo"
    width={props.width || 40} // Default width
    height={props.height || 40} // Default height
    priority // Preload the logo
    {...props} // Allow overriding width, height, className, etc.
    unoptimized={LOGO_IMAGE_SRC.startsWith('https://firebasestorage.googleapis.com')} // Add unoptimized if it's a remote pattern and you want to avoid Next.js optimization for this specific URL if issues arise, otherwise it's fine.
  />
);
export default Logo;

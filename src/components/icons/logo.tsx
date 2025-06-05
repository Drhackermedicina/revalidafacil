import Image from 'next/image';
import type { ImageProps } from 'next/image';

// Certifique-se de que sua imagem de logo está em 'public/revalida-facil-logo.png'.
// Se usar um nome ou caminho diferente, atualize a constante LOGO_IMAGE_SRC abaixo.
const LOGO_IMAGE_SRC = "/revalida-facil-logo.png";

const Logo = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image
    src={LOGO_IMAGE_SRC}
    alt="Revalida Fácil Logo"
    width={props.width || 40} // Default width
    height={props.height || 40} // Default height
    priority // Preload the logo
    {...props} // Allow overriding width, height, className, etc.
  />
);
export default Logo;

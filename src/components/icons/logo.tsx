import Image from 'next/image';
import type { ImageProps } from 'next/image';

// Você precisará adicionar sua imagem à pasta `public`
// e então atualizar o `src` abaixo para o caminho correto, por exemplo: /revalida-facil-logo.png
const LOGO_IMAGE_SRC = "https://placehold.co/150x150.png?text=Revalida+Fácil"; 

const Logo = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image
    src={LOGO_IMAGE_SRC}
    alt="Revalida Fácil Logo"
    width={props.width || 40} // Default width
    height={props.height || 40} // Default height
    priority // Preload the logo
    data-ai-hint="medical education logo" // Hint for AI image generation if placeholder is used
    {...props} // Allow overriding width, height, className, etc.
  />
);
export default Logo;

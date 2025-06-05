import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    aria-hidden="true"
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="hsl(var(--primary))" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="40"
      fill="hsl(var(--primary-foreground))"
      className="font-headline"
    >
      PR
    </text>
  </svg>
);
export default Logo;

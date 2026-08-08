/// <reference types="vite/client" />

/**
 * Types for image imports.
 *
 * The previous version declared modules like "*?w=*". TypeScript allows only a
 * single "*" in an ambient module name, so those patterns matched nothing and
 * every vite-imagetools import was a type error. A single trailing wildcard
 * after the alias prefix covers the whole specifier including its query string.
 */

declare module "@assets/*" {
  const src: string;
  export default src;
}

declare module "@/assets/*" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

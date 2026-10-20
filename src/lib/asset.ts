/** Resolve a file under public/ against Vite's base path (works at / and under a sub-path). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const COMPONENT_ORIGINS = ["DocsComponent", "ChangelogComponent"];

export function isValidOrigin(origin: string): boolean {
  return COMPONENT_ORIGINS.includes(origin);
}

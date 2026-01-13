export const COMPONENT_ORIGINS = [
  "DocsComponent",
  "ChangelogComponent",
  "NavbarComponent",
  "FooterComponent",
];

export function isValidOrigin(origin: string): boolean {
  return COMPONENT_ORIGINS.includes(origin);
}

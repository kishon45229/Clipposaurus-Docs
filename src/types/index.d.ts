//Docs types
export type ActiveSection = "identifier" | "system-secret" | "user-secret";

export interface CTA {
  id: string;
  title: string;
}

export interface DocsSidebarItem {
  id: string;
  title: string;
  href: string;
}

interface DocsSidebar {
  id: string;
  title: string;
  children: DocsSidebarItem[];
}

export interface DocsPageHeader {
  title: string;
  description: string;
}

export interface DocsPageSection {
  id: string;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface DocsPageFooter {
  nextPage?: CTA;
  previousPage?: CTA;
}

export interface DocsPage {
  id: string;
  header: DocsPageHeader;
  sections: DocsPageSection[];
  footer: DocsPageFooter;
}

export interface DocsComponent {
  title: string;
  defaultPage: string;
  sidebar: DocsSidebar[];
  pages: DocsPage[];
}


//Changelog types
interface ChangelogItem {
  title: string;
  description: string;
}

export interface ChangelogCategory {
  category: string;
  items: ChangelogItem[];
}

interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "patch";
  changes: ChangelogCategory[];
}

export interface ChangelogComponent {
  headline: string;
  description: string;
  releases: ChangelogRelease[];
}

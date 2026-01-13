import { z } from "zod";

// Docs
const CTASchema = z.object({
  id: z.string(),
  title: z.string(),
});

const DocsSidebarItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  href: z.string(),
});

const DocsSidebarSchema = z.object({
  id: z.string(),
  title: z.string(),
  children: z.array(DocsSidebarItemSchema),
});

const DocsPageHeaderSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const DocsPageSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  data: z.any(),
});

const DocsPageFooterSchema = z.object({
  nextPage: CTASchema.optional(),
  previousPage: CTASchema.optional(),
});

const DocsPageSchema = z.object({
  id: z.string(),
  header: DocsPageHeaderSchema,
  sections: z.array(DocsPageSectionSchema),
  footer: DocsPageFooterSchema,
});

export const DocsComponentSchema = z.object({
  title: z.string(),
  defaultPage: z.string(),
  sidebar: z.array(DocsSidebarSchema),
  pages: z.array(DocsPageSchema),
});

// Changelog
const ChangelogItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const ChangelogCategorySchema = z.object({
  category: z.string(),
  items: z.array(ChangelogItemSchema),
});

const ChangelogReleaseSchema = z.object({
  version: z.string(),
  date: z.string(),
  title: z.string(),
  type: z.enum(["major", "minor", "patch"]),
  changes: z.array(ChangelogCategorySchema),
});

export const ChangelogComponentSchema = z.object({
  headline: z.string(),
  description: z.string(),
  releases: z.array(ChangelogReleaseSchema),
});

// Footer
export const FooterComponentSchema = z.object({
  brand: z.object({
    name: z.string(),
    description: z.string(),
  }),
  columns: z.array(
    z.object({
      category: z.string(),
      links: z.array(z.string()),
    })
  ),
  copyrightNote: z.string(),
});

// Navbar
export const NavbarComponentSchema = z.object({
  brand: z.object({
    name: z.string(),
    alt: z.string(),
    ariaLabel: z.string(),
    beta: z.object({
      text: z.string(),
      ariaLabel: z.string(),
    }),
  }),
  links: z.object({
    home: z.string(),
    github: z.string(),
    resources: z.string(),
    help: z.string(),
  }),
  menus: z.object({
    resourcesDropDown: z.object({
      changelog: z.object({
        title: z.string(),
        description: z.string(),
      }),
      terms: z.object({
        title: z.string(),
        description: z.string(),
      }),
      support: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    helpDropDown: z.object({
      faq: z.object({
        title: z.string(),
        description: z.string(),
      }),
      issue: z.object({
        title: z.string(),
        description: z.string(),
      }),
      contact: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    hamburger: z.object({
      openMenu: z.string(),
      home: z.string(),
      faq: z.string(),
      github: z.string(),
      changelog: z.string(),
      reportIssue: z.string(),
      termsOfService: z.string(),
      contactUs: z.string(),
      supportProject: z.string(),
    }),
  }),
  themeToggle: z.object({
    ariaLabel: z.string(),
  }),
  ariaLabels: z.object({
    mainNavigation: z.string(),
  }),
});

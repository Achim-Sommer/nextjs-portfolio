export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTime: number;  // Nicht optional, da es in blog-grid benötigt wird
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
}

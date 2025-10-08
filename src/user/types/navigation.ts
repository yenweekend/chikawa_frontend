export type NavigationItem = {
  title: string;
  href?: string;
  listItems?: NavigationSubItem[];
};

export type NavigationSubItem = {
  title: string;
  href: string;
};

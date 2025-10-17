import { Link } from "react-router-dom";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import type { NavigationItem } from "@/user/types/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface NavigationProps {
  navigation: NavigationItem[];
}

export const Navigation = ({ navigation }: NavigationProps) => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navigation.map((item, index) =>
          item?.href ? (
            <NavigationMenuItem key={`nav-${index}`}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={item.href} className="!text-slate-900 ">
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={`nav-${index}`}>
              <NavigationMenuTrigger className="!bg-none ">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-6 rounded-lg !bg-yellow-200 border-none shadow-none">
                <div className="py-5 px-10 border border-black rounded-lg bg-white">
                  <p className="text-center font-bold text-base">
                    {item.title}
                  </p>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {item.listItems?.map((sub, index) => (
                      <ListItem
                        key={`subnav-${index}`}
                        href={sub.href}
                        title={sub.title}
                      />
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

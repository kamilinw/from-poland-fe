"use client";

import { usePathname } from "next/navigation";
import { navigationConfig } from "./navigation-config";
import { NavigationItem } from "./navigation-item";
import styles from "./navigation.module.scss";

interface MainNavigationProps {
  children: React.ReactNode;
}

export function MainNavigation({ children }: MainNavigationProps) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navigation}>
        {navigationConfig.map(({ href, id, label }) => {
          const isActive = href === pathname;
          return (
            <NavigationItem
              href={href}
              label={label}
              key={id}
              isActive={isActive}
            />
          );
        })}
      </nav>
      {children}
    </div>
  );
}

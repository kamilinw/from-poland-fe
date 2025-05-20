import Link from "next/link";
import styles from "./navigation.module.scss";
import clsx from "clsx";

interface NavigationItemProps {
  href: string;
  label: string;
  isActive: boolean;
}
export const NavigationItem = ({
  href,
  label,
  isActive,
}: NavigationItemProps) => {
  return (
    <Link
      className={clsx(styles.navigationItem, {
        [styles.navigationItemActive]: isActive,
      })}
      href={href}
    >
      {label}
    </Link>
  );
};

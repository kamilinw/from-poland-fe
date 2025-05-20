import "./globals.scss";
import { MainNavigation } from "../components/navigation/main-navigation";
import styles from "./layout.module.scss";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainNavigation>
            <div className={styles.container}>{children}</div>
          </MainNavigation>
        </Providers>
      </body>
    </html>
  );
}

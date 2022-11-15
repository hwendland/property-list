import styles from '../styles/Layout.module.css';
import Image from 'next/image';
import Head from 'next/head';

export interface LayoutProps extends React.HtmlHTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Properties</title>
      </Head>
      <div className={styles.leftNav}>
        <Image
          className={styles.logo}
          src="/E&V_Signet.svg"
          alt="logo"
          width={42}
          height={17}
        ></Image>
      </div>
      <main className={styles.main}>
        <header className={styles.header} />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}

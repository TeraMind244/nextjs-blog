import Head from "next/head";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "Tera Mind";
export const siteTitle = "Tera Mind's blog";

const renderAvatar = (className: string, alt: string) => (
	<img src="/images/profile.jpg" className={className} alt={alt} />
);

export default function Layout({ children, home = false }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Learn how to build a personal website using Next.js" />
				<meta
					property="og:image"
					content={`https://og-image.now.sh/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<header className={styles.header}>
				{home ? (
					<>
						{renderAvatar(`${styles.headerHomeImage} ${utilStyles.borderCircle}`, name)}
						<Link href="/posts/first-post">
							<a>
								<h1 className={utilStyles.heading2Xl}>{name}</h1>
							</a>
						</Link>
					</>
				) : (
					<>
						<Link href="/">
							<a>{renderAvatar(`${styles.headerImage} ${utilStyles.borderCircle}`, name)}</a>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href="/">
								<a className={utilStyles.colorInherit}>{name}</a>
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
}

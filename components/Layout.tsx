import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "Tera Mind";
export const siteTitle = "Tera Mind's blog";

interface IProps {
	home?: boolean;
	children?: React.ReactNode;
}

const Layout = ({ children, home = false }: IProps) => {
	const router = useRouter();
	const handleBackLinkClicked = () => router.back();

	return (
		<div className={styles.container}>
			{renderHeadAttributes()}
			<header className={styles.header}>
				{home ? (
					<>
						{renderAvatar(`${styles.headerHomeImage} ${utilStyles.borderCircle}`, name)}
						<h1 className={utilStyles.heading2Xl}>{name}</h1>
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
					<button onClick={handleBackLinkClicked}>← Back</button>
				</div>
			)}
		</div>
	);
};

const renderAvatar = (className: string, alt: string) => (
	<img src="/images/profile.jpg" className={className} alt={alt} />
);

const renderHeadAttributes = () => (
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
);

export default Layout;

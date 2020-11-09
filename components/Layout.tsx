import Head from "next/head";
import Link from "next/link";
import { authorName, Page, siteTitle } from "../constant";
import buttonStyles from "../styles/button.module.css";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";

interface IProps {
	page?: Page;
}

const Layout: React.FC<IProps> = ({ children, page = Page.HOME }) => {
	return (
		<div className={styles.container}>
			{page !== Page.CREATE && (
				<div>
					<Link href="/create">
						<a>
							<button className={`${buttonStyles.button} ${buttonStyles["button-right"]}`}>Create</button>
						</a>
					</Link>
				</div>
			)}
			{renderHeadAttributes()}
			<header className={styles.header}>
				{page === Page.HOME ? (
					<>
						{renderAvatar(`${styles.headerHomeImage} ${utilStyles.borderCircle}`)}
						<h1 className={utilStyles.heading2Xl}>{authorName}</h1>
						<section className={utilStyles.headingSm}>
							<p>Tomato is love. Tomato is life.</p>
						</section>
					</>
				) : (
					<>
						<Link href="/">
							<a>{renderAvatar(`${styles.headerImage} ${utilStyles.borderCircle}`)}</a>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href="/">
								<a className={utilStyles.colorInherit}>{authorName}</a>
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{page !== Page.HOME && (
				<div className={styles.backToHome}>
					<Link href="/">
						<a>
							<button className={`${buttonStyles.button} ${buttonStyles["button-right"]}`}>← Back</button>
						</a>
					</Link>
				</div>
			)}
		</div>
	);
};

const renderAvatar = (className: string) => <img src="/images/square.jpg" className={className} alt={authorName} />;

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

import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../utils/postsUtils";
import Layout, { siteTitle } from "../components/Layout";
import Date from "../components/Date";
import { IPostData } from "../interfaces/post-data";

interface IProps {
	allPostsData: IPostData[];
}

const Home = ({ allPostsData }: IProps) => {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>I will be back for you! I'm yours, forever!</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>
					.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData
		}
	};
};

export default Home;
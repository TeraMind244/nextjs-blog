import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import Layout from "../components/Layout";
import { siteTitle } from "../constant";
import { IPostData } from "../interfaces";
import { getSortedPostsData } from "../services/BlogService";
import utilStyles from "../styles/utils.module.css";

interface IProps {
	allPostsData: IPostData[];
}

const Home: NextPage<IProps> = ({ allPostsData }) => {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ slug: id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<Date date={date} />
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
	const allPostsData = await getSortedPostsData();
	return {
		props: {
			allPostsData
		},
		revalidate: 10
	};
};

export default Home;

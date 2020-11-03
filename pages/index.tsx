import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import Layout, { siteTitle } from "../components/Layout";
import { IPostData } from "../interfaces/Post";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../utils/PostsUtils";

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
				<p>Tomato is love. Tomato is life.</p>
			</section>
			<section>
				<Link href="/create">
					<a>
						<button>CREATE</button>
					</a>
				</Link>
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
							<Date dateString={date} />
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
		},
		revalidate: 10
	};
};

export default Home;

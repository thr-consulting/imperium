import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
	{
		title: <>Modular Features</>,
		imageUrl: 'img/undraw_docusaurus_mountain.svg',
		description: <>Imperium is designed around the concept of building modular features for large codebases.</>,
	},
	{
		title: <>Inclusive yet Flexible</>,
		imageUrl: 'img/undraw_docusaurus_tree.svg',
		description: <>Imperium provides everything you need to get started right out of the box yet handles customization with ease.</>,
	},
	{
		title: <>Powered by Open Source</>,
		imageUrl: 'img/undraw_docusaurus_react.svg',
		description: <>Centered around Express and React you can easily add GraphQL, React-Router and many other technologies.</>,
	},
];

function Feature({imageUrl, title, description}) {
	const imgUrl = useBaseUrl(imageUrl);
	return (
		<div className={classnames('col col--4', styles.feature)}>
			{imgUrl && (
				<div className="text--center">
					<img className={styles.featureImage} src={imgUrl} alt={title} />
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}

function Home() {
	const context = useDocusaurusContext();
	const {siteConfig = {}} = context;
	return (
		<Layout title={siteConfig.title} description="Imperium Web Framework">
			<header className={classnames('hero hero--primary', styles.heroBanner)}>
				<div className="container">
					{/*<h1 className="hero__title">{siteConfig.title}</h1>*/}
					<img src="img/imperium_w_full.png" width="300rem" alt="Imperium Logo" />
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link className={classnames('button button--outline button--secondary button--lg', styles.getStarted)} to={useBaseUrl('docs/introduction')}>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				{features && features.length && (
					<section className={styles.features}>
						<div className="container">
							<div className="row">
								{features.map((props, idx) => (
									<Feature key={idx} {...props} />
								))}
							</div>
						</div>
					</section>
				)}
			</main>
		</Layout>
	);
}

export default Home;

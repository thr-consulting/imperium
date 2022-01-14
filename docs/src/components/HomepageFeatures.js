import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Modular Features',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Imperium is designed around the concept of building modular features for large codebases.
      </>
    ),
  },
  {
    title: 'Inclusive yet Flexible',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Imperium provides everything you need to get started right out of the box yet handles customization with ease.
      </>
    ),
  },
  {
    title: 'Powered by Open Source',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Centered around Express and React you can easily add GraphQL, React-Router and many other technologies.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

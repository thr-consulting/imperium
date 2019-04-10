# Dependency Issues

There are some dependant packages where upgrading them causes problems.
We will need to fix these:

## react-router > 4.3.1
We are currently pinned to 4.3.1. They released 4.4.0 which broke all sorts of things.
They had to release 5.0.0 to fix things but now I'm getting errors saying `<Redirect>` should not be
outside of `<Router>`, but that is not the case in my code. Not sure why it's giving an error.

## react-apollo > 2.3.3
Upgrading past 2.3.3 breaks my `<Graphql>` component. 

# Dependency Explanation

## `root`
The root package contains devDependencies that are required to develop
the various packages in Imperium.

## `@imperium/core`
The core package contains dependencies and peerDependencies that are
required to run Imperium core.

## `@imperium/babel-preset-imperium`
This package isn't required directly by an Imperium project. It contains
everything required for using the Imperium Babel preset.

## `@imperium/eslint-config-imperium`
This package provides everything required for using eslint with the
Imperium Eslint configuration. It can be added as a devDependency to
any Imperium project.

## `@imperium/dev-deps`
This package is required to develop and build an Imperium project. It should
be added as a devDependency in your Imperium project.

## `@imperium/graphql`
This package adds Apollo graphql functionality to your Imperium project.

## `@imperium/auth`
Opinionated authentication package. Depends on mongo, react, graphql.

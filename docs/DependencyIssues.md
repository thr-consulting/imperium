# Dependency Issues

There are some dependant packages where upgrading them causes problems.
We will need to fix these:

## react-router > 4.3.1
We are currently pinned to 4.3.1. They released 4.4.0 which broke all sorts of things.
They had to release 5.0.0 to fix things but now I'm getting errors saying `<Redirect>` should not be
outside of `<Router>`, but that is not the case in my code. Not sure why it's giving an error.

## react-apollo > 2.3.3
Upgrading past 2.3.3 breaks my `<Graphql>` component. 

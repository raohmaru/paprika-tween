# Contributing to Paprika 🌶

First of all, thanks!  Community contribution is what makes open source great.
If you find a bug or would like to make a feature request, please report it on
the [issue tracker](https://github.com/raohmaru/paprika-tween/issues).  If you
would like to make changes to the code yourself, read on!

## Getting started

To get started with hacking on Shifty, you'll need to get all of the
development dependencies with [npm](https://npmjs.org/) (and, by extension,
[Node](http://nodejs.org/)):

````
$: npm install
````

## Pull Requests and branches

The project maintainer ([@raohmaru](https://github.com/raohmaru)) manages
releases.  `master` contains the latest stable code, and `develop` contains
commits that are ahead of (newer than) `master` that have yet to be officially
released (built and tagged).  When making a Pull Request, please branch off of
`develop` and request to merge back into it.  `master` is only merged into from
`develop`.

## Building

````
$: npm run build
````

## Testing

Please make sure that all tests pass before submitting a Pull Request.

````
$: npm test
````

You can also run the tests in the browser.  They are in `tests/`.  If you are
adding a feature or fixing a bug, please add a test!

## Style

Please try to remain consitent with existing code.  To automatically check for
style issues or other potential problems, you can run:

````
$: npm run lint
````

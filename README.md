Tic-Tac-Toe
===========

This is an implementation of the tic-tac-toe game.

Running Locally
---------------

This project uses `npm` for managing dependencies. After you clone
the repository, install the dependencies by running:

```sh
npm install
```

Bundle and pre-process the JavaScript with:

```sh
npm run-script build
```

(`npm run-script watch` is also available)

Then you can open `build/index.html` in your browser.

The tests can be run with:

```sh
npm test
```

Goals
-----

- [ ] Use CSS to add more detail to the wireframe above

    I will admit the CSS is ugly.

- [X] Demonstrate a solid understanding of MV* and using an MV*
  framework like Backbone, React, Ember or Angular

    I chose React because I like its model of favoring immutable state
    and rendering UI functionally. The `board.js` class holds most of
    the React-based code. Since it is the view, the game logic lives
    separately in `engine.js`.

- [X] Allow for more than one independent tic­tac­toe board to be on the
same page without anything breaking.

    This ability rose naturally because the entire app minimizes
    shared state. Adding another board simply works, as seen in the
    commit that introduced it: e3e7302.

- [X] Add the ability to restart a game after it has ended.

    Again, by not storing any state in the view or globally, adding
    restart functionality was as simple as adding the UI elements and
    asking the engine for a clean game state: 1a5069d.

- [X] Use module loaders like webpack or browserify for dependency
management.

    I chose to give webpack a try, having only dabbled with
    browserify before. It uses `index.js` as the entry point and
    preprocesses the JSX syntax and the babel-polyfill. Output is put
    into `build/bundle.js` via the `npm run-script build` command.

- [X] Write error handling and/or tests.

    The Karma test runner runs the tests in PhantomJS by default, but
    it can be made to run them in Chrome, Firefox, and Safari by
    modifying the `browsers` variable in `karma.config.js`.

    I chose the Jasmine framework for writing the tests because I was
    familiar with it.

    Karma had to be integrated with webpack to compile the JSX and
    bring in the babel-polyfill for ES6 features. This is also
    configured in `karma.config.js`.

    The tests can be run with `npm test`.

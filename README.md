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
npm run-script build-dev
```

(`npm run-script watch` is also available)

Then you can open `build/index.html` in your browser.

The tests can be run with:

```sh
npm test
```

Bonus
-----

- [ ] Use CSS to add more detail to the wireframe above.

    I will admint the styling isn't anything special. I did use
    Flexbox for the board layout, which is probably better than the
    table-based layout I was considering :)

- [X] Demonstrate a solid understanding of MV* and using an MV*
  framework like Backbone, React, Ember or Angular

    I chose React because I like its model of favoring immutable state
    and rendering UI with functions. The `board.js` class holds most of
    the React-based code. Since React mainly concerns itself with
    views, the game logic lives separately in `engine.js`.

- [X] Allow for more than one independent tic­tac­toe board to be on
  the same page without anything breaking.

    Since React encourages minimizing shared state, and `engine.js`
    was written in a functional, stateless, side-effect-free manner,
    the ability to have mulitple boards on the same page came
    for free.

- [X] Add the ability to restart a game after it has ended.

    Not storing any state in the view or globally made adding the
    restart functionality fairly simple. I added the UI elements,
    asked the engine for a clean game state, and let React handle the
    rest:
    [1a5069d6](https://github.com/tlicata/tic-tac-toe/commit/1a5069d648ae770da792f15a2b0b6de60988ad98#diff-b768db34d2b156debfb3871af9cb87d6R52).

- [X] Use module loaders like webpack or browserify for dependency
  management.

    I chose to give webpack a try. I was relatively unfamiliar with
    it, having only dabbled with browserify. I figured there was no
    time like the present to learn. The settings can be found in
    `webpack.config.js`. It configures `index.js` as the entry point,
    preprocesses JSX and SCSS syntax, and provides the babel-polyfill
    for ES6 features. Output is deposited into `build/bundle.js` via
    `npm run-script build-dev`, `npm run-script build-prod`, or `npm
    run-script watch`.

- [X] Write error handling and/or tests.

    I chose Jasmine for writing the tests because I was familiar with
    it.

    I also wanted to drive the tests from the terminal. After doing
    some research, it seemed like the Karma test runner could be a
    good fit.

    `npm test`, via Karma, runs the tests in PhantomJS by
    default. However, if you modify the `browsers` variable in
    `karma.config.js`, the tests can run in Chrome, Firefox, and/or
    Safari.

    Karma also had to be integrated with webpack to compile JSX and
    bring in babel-polyfill for ES6 features. This is also configured
    in `karma.config.js`.

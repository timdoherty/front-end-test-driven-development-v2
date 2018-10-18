
# FETDD - Front End Test Driven Development

### Overview
Your client has commissioned you to build a Youtube player. She likes Youtube but wants her own player built on their API, with just the basics: the ability to search for videos and play them while viewing comments and related videos.

In this tutorial we will build a Youtube player for your client using React and Redux from the ground up using [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD). We will start by writing acceptance criteria for the player, then write test cases and implement the product via TDD.

I've made a few decisions for you, to make your life easier and/or because they help keep the focus on testing, where it belongs:

- The application is scaffolded with [Create React App](https://github.com/facebook/create-react-app) so that you don't have to configure anything in order to start testing.
- Create React App preconfigures [Jest](https://jestjs.io/docs/en/getting-started), a performant and full-featured testing framework from Facebook.
- The tutorial uses the [Enzyme test renderer](http://airbnb.io/enzyme/) from Airbnb. Enzyme has a robust API for rendering components, with some helpful asbtractions for separating behavioral and presentational concerns.
- The tutorial uses [Redux Loop](https://redux-loop.js.org/) for handling asynchronous Redux actions. Aside from other good reasons to recommend Redux Loop, the primary reason for using it here is that it has an excellent [testing story](https://redux-loop.js.org/docs/tutorial/Testing.html).
- The tutorial uses [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/) to reduce the typical boilerplate required for Redux actions and reducers. To soften the introduction, we'll start with vanilla Redux and refactor to Redux Modules with green specs.

### Prerequisites
This tutorial assumes a working knowledge of JavaScript and the [React](https://reactjs.org/) view library, as well as at least a rudimentary understanding of [Redux](https://redux.js.org/)

### Resources
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Loop](https://redux-loop.js.org/)
- [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/)
- [Jest Test Framework](https://jestjs.io/docs/en/getting-started)
- [Enzyme Test Renderer](http://airbnb.io/enzyme/)
- [Youtube Developers Page](https://developers.google.com/youtube/)

### About This Tutorial
This tutorial is about Test Driven Development, so we will be writing and running lots of tests. To start the test runner, simply run "yarn test" from the repository root.

This respository is split into distinct steps. Each step includes the following information in this README file:
- A recap of the previous step (where applicable)
- An objective for the current step, i.e., what you will be trying to achieve.
- A list of resources relevant to the current step (where applicable)
- A list of high-level TODO items for the current step, to help guide your efforts.

Each step also includes a reference implementation for the previous step, where applicable. Your code need not match the reference implementation, which is simply one possible solution to the step at hand. The point here is not to produce any specific implementation, but simply to flex your TDD muscles to produce something that satisfies your acceptance criteria.

When starting a new step, you should kill and restart the test runner, in order to pick up new files added since the last step.

### Getting Started
- Clone this repository
- Run "yarn" from the repository root

### Before We Begin
Take a few minutes to look at [Youtube.com](https://www.youtube.com/) along with the overview above and ask some questions in order to come up with concrete acceptance criteria.

- What high level parts does the search page have?
- What happens when a user enters a search term
- What high level parts does the current video page have?
- What happens when a user clicks on a related video?
- etc.

Write out some acceptance criteria that answer the questions that pertain to your client's requirements. The best starting point for good test cases is a set of verifiable acceptance criteria.

Some example criteria might include:
- The application has a place for a user to enter a search term
- When the user enters a search term and presses the enter key, a list of search results is displayed
- etc.

## Step 1

### Objective
The recommended best practice when building Redux applications is to start by designing your state.

We'll follow this practice using our acceptance criteria and the relevant Youtube APIs to design and build our application state via TDD.

The nice thing about Redux is that reducers are [pure functions](https://en.wikipedia.org/wiki/Pure_function) and thus very easy to test.
We'll start with some simple synchronous actions and reducers, and tackle the actual API requests in a later step

### Resources
- [Youtube Search Endpoint](https://developers.google.com/youtube/v3/docs/search/list)
- [Youtube Search Response](https://developers.google.com/youtube/v3/docs/search/list#response)
- [Youtube Search Resource Representation](https://developers.google.com/youtube/v3/docs/search#resource-representation)
- [Youtube Videos Endpoint](https://developers.google.com/youtube/v3/docs/videos/list)
- [Youtube Videos Response](https://developers.google.com/youtube/v3/docs/videos/list#response)
- [Youtube Video Resource Representation](https://developers.google.com/youtube/v3/docs/videos#resource-representation)

### TODO:
- High level test cases written in plain english (BDD-style)
  - Start with your acceptance criteria
    - ex: "it does a search"
    - ex: "it handles a successful search"
    - ex: "it handles search failure"
    - etc.
- Run the tests and watch them fail
- Make the tests pass by implementing search state
  - Don't worry about making the actual API requests just yet, leave a TODO placeholder for now
- Refactor as needed while keeping the tests green
- Introduction to testing reducers

## Step 2

### Recap: What did we learn?
- Good test cases come from well-defined acceptance criteria
- TDD consists of a short, repeated development cycle
- BDD (Behavior Driven Development) style tests help to decouple the what from the how in your tests
- Testing reducers is relatively straightforward since they're pure functions with no side effects

### Objective
One of the legitimate criticisms of Redux is that it involves a lot of boilerplate code to define your actions and reducers.

Let's introduce a utility function to generate action creators for us, thereby reducing some of the boilerplate code. This will be a stepping stone toward introducing Redux Modules, which will significantly reduce our boilerplate code, and will help explain what that library does. We'll do this while our tests are running and passing, illustrating the "refactor" part of the TDD red/green/refactor cycle.

### TODO:
- Write a "fluxStandardAction" utility function that returns an action creator when given an action constant
- Keep your tests passing while you refactor your code to use the new utility function
- Replace all your named action creator functions with action creators generated by the new utility method

## Step 3

### Recap: What did we learn?
- A suite of passing tests helps us refactor our code with confidence that it still works
- We can change the implementation details of code under test without breaking its public interface 

### Objective
We've written some vanilla Redux actions, action creators, and reducers via TDD, then refactored our action creators to reduce the boilerplate, all the while with passing tests.
In this step we'll introduce Redux Modules and show, bit by bit, how it can further reduce our boilerplate. And as in the previous step, we'll refactor with our tests running and passing.

### Resources
- [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/)

### TODO:
- Add a Redux Modules module definition with the createModule method. createModule takes an object as argument, with the following keys of interest to us:
  - name: a unique namespace for the slice of state this module will manage
  - initialState: an optional hash of key/value pairs with which to intialize this slice of state
  - selector: an optional selector function to read this slice of state
  - transformations: an object who's keys are actions, and who's values describe how the final reducer will behave

  ```js
    const searchModule = createModule({
      name: 'search',
      initialState: {},
      selector: () => {}, // we'll get to this later
      transformations: {}
    });
  ```
- The ouput of createModule is an object with the following keys:
  - actions: corresponding action creators
  - constants: namespaced strings for each action constant
  - reducer: the coalesced reducer resulting from your combined transformations
  - selector: if provided as input, the selector function for reading this slice of state

  ```js
    const { actions, constants, reducer, selector } = searchModule;
  ```

- Add a transformation for one of your existing actions. A transformation can be expressed as an [object](https://mboperator.gitbooks.io/redux-modules/content/docs/basics/the-transformation-object.html)
or with a shorthand method notation 
```js
  transformations: {
    actionCreatorName(state, action) {
      return { /* new state */ };
    },
    // ...
  }
```
  - The shorthand method notation is transformed by Redux Modules into the equivalent of:
    - A namespaced action constant
    ```js 
      const ACTION_CREATOR_NAME = '<namespace>/ACTION_CREATOR_NAME';
    ```
    - An action creator for the same constant
    ```js
      function actionCreatorName(payload, meta, error) {
        return {
          type: ACTION_CREATOR_NAME,
          payload,
          meta,
          error
        };
      }
    ```
    - The case statement for this action in the final reducer's switch statement
    ```js
      function reducer(state, action) {
        switch (action.type) {
          case ACTION_CREATOR_NAME:
            return { /* new state */ };
          // ...
        }
      }
    ```
- Return the new action creator generated by your transformation instead of your existing action creator
  ```js
    actions.actionCreatorName = searchModule.actions.actionCreatorName;
  ```
- Repeat for each of your action creators.
  - Once you've created a transformation for each of your original action creators, you should be able to remove all your boilerplate code and simply return your new Redux Module, with all your tests passing!

## Step 4

### Recap: What did we learn?
- The Redux Modules library provides utilities for reducing the typical boilerplate involved in writing Redux applications
- A suite of passing tests helps us refactor our code with confidence that it still works
- We can change the implementation details of code under test without breaking its public interface 

### Objective
Now that we have one slice of our state mostly complete, we need to be able to read it in a meaningful way. This is where selectors come into play, a selector is like an API for reading your Redux state.
Let's write some selectors for reading our search state, in vanilla JavaScript, via TDD.

### Resources
- [Selectors](https://redux.js.org/introduction/learningresources#selectors)

### TODO:
- High level test cases written in plain english (BDD-style)
  - What do you need to read from state, and in what shape?
    - ex: "it reads the current search term"
- Run the tests and watch them fail
- Make the tests pass by implementing vanilla JS selectors that read the state you give them
- Refactor as needed while keeping your tests green

## Step 5

### Recap: What did we learn?
- Selectors provide an "API" for reading your Redux state
- Repeat the short TDD development cycle

### Objective
We've written our selectors in vanilla JavaScript, but sometimes the computations selectors perform are expensive and should only be performed when the relevant portion of state changes.
For these types of computations we can take advantage of [memoization](https://en.wikipedia.org/wiki/Memoization) to cache the computed results and use the cache when the inputs don't change.
The [Reselect](https://github.com/reduxjs/reselect) library allows us to create memoized selectors with a few straightforward utility methods.

### Resources
- [Computing Derived Data](https://redux.js.org/recipes/computingderiveddata)
- [Reselect](https://github.com/reduxjs/reselect)
- [createSelector](https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc)
- [createStructuredSelector](https://github.com/reduxjs/reselect#createstructuredselectorinputselectors-selectorcreator--createselector)

### TODO:
- With your tests running and passing, refactor your selectors to use Reselect
- Import your finished selector into your Redux Module, and assign it to the "selector" key
  ```js
    import searchSelector from '/selector';

    const searchModule = createSelector({
      name: 'search',
      // ...
      selector: searchSelector
    });
  ```

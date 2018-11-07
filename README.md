
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

    const searchModule = createModule({
      name: 'search',
      // ...
      selector: searchSelector
    });
  ```

## Step 6

### Recap: What did we learn?
- Memoizing selectors with Reselect can improve the performance of computationally expensive selectors
- A suite of passing tests helps us refactor our code with confidence that it still works
- We can change the implementation details of code under test without breaking its public interface 

### Objective
Up to this point, we've concerned ourselves with synchronous interactions with our Redux store. We punted on making the actual Youtube API requests we'll need to do anything useful with our application.
Now we're going to dive into the wonderful world of asynchronous actions. There are a number of solutions in this space, each with its own pros and cons. For the purposes of this tutorial - which is focused on testing - I chose
the library with what I feel is the best testing story, [Redux Loop](https://redux-loop.js.org/).

Redux Loop is a middleware that allows you to treat synchronous and asynchronous action creators the same way. Instead of returning new state from your reducer
you return an instruction - a loop - that tells the middleware:
- The new state resulting from the current action
- What to do next:
  - this might be to dispatch another synchronous action or, in our case, to dispatch an asynchronous action

Since the loop returned from your reducer is just an object, the reducer is still a pure function. This makes testing asynchronous actions as simple as testing pure functions.

```js
import { loop, Cmd, getCmd, getModel } from 'redux-loop';

it('does something', () => {
  const expected = loop(
    /* state transformation */,
    /* command */
  );

  const actual = reducer(<state>, <action>);
  expect(getModel(actual)).toEqual(getModel(expected));
  expect(getCmd(actual)).toEqual(getCmd(expected));
});
```

### Resources
- [Redux Loop](https://redux-loop.js.org/)
- [Testing Loop Reducer Results](https://redux-loop.js.org/docs/tutorial/Testing.html)
- [The "run" Command](https://redux-loop.js.org/docs/api-docs/cmds.html#cmdrunfunc-options)

### TODO:
- Modify the tests for your Youtube API-related actions to assert that loops are returned.
- Make the tests pass by replacing your module's TODO placeholders with loops that schedule the "run" command, i.e., Cmd.run

## Step 7

### Recap: What did we learn?
- Redux Loop lets us test the scheduling of asynchronous actions without a store, and without needed to stub the resulting side effects

### Objective
We've now learned all we need to know about building our Redux state for the purposes of this application via TDD. But, we haven't built out our state
for a now playing page. In this step, we'll use all the skills we've learned so far and repeat the process to build out a "now playing" module and related selectors.

### Resources
- [Youtube Embedded Player]()
- [youtube Comments Endpoint]()
- [Youtube Search for Related Videos]()
- [Youtube Videos Endpoint for Related Videos Metadata]()

### TODO:
- High level test cases written in plain english (BDD-style)
  - What do you need to store in "now playing" state? What asynchronous actions are needed?
    - ex: "it gets the current video"
    - ex: "it handles successful fetching of comments"
    - etc.
- Create a "now playing" Redux Modules module to encaspulate the actions and reducer for this slice of state
- Create a "now playing" reducer to read this slice of state in a meaningful way
- Import the selector into your module via the selector key

## Step 8

### Recap: What did we learn?
- Self-paced practice of all the skills we learned in the previous steps

### Objective
We've now built out the Redux state for our client's Youtube player using Test Driven Development, so we have a high degree of confidence that it works.
Now let's start building out some components to display and interact with our application state. We'll start with a search bar component.

At this point we'll introduce the idea of Test Driven Component Development (TDCD), which is simply allowing tests to drive the implementation of your React components.
The approach emphasizes testing the data and behavior of a component completely agnostic of its presentation. You can verify that a component displays
the right data, and behaves as expected, by testing its public interface and without looking at the rendered component.

The main advantage of this approach is separation of concerns. It allows you to focus on the logic of your component in isolation, then focus on its presentation in isolation.
Both of these concerns can be challenging on their own, but they are exponentially harder when conflated.

We will use some techniques from the [Enzyme Test Renderer](https://airbnb.io/enzyme/docs/api/) that let us make assertions about a component's public interface free from assumptions about its internal structure.

We'll use the TDCD approach throughout the rest of this tutorial, and won't even look at our components in a browser until the final step - when we will then focus solely on look and feel.
We'll be able to drastically change the presentation of our components, all while our tests are green!

### Resources
- [Enzyme Test Renderer](https://airbnb.io/enzyme/docs/api/)
- [React Router withRouter HoC](https://reacttraining.com/react-router/web/api/withRouter)

### TODO:
- High level test cases written in plain english (BDD-style)
  - What should our search bar do?
    - ex: "it has somewhere for a user to enter search terms"
    - ex: "it responds and changes the web address when the user clicks the search button"
- Run the tests and watch them fail
- Make the tests pass by implementing a search bar component using TDCD

## Step 9

### Recap: What did we learn?
- Introduction to the TDCD approach
- We can build a functioning component - and have confidence that it works - without ever looking at it
- Separation of concerns makes component development simpler by letting us focus on one concern at a time

### Objective
Now that we have our search bar component, let's connect it to our Redux store so it can read from and interact with our application state.
First we'll accomplish this with the [React bindings for Redux](https://github.com/reduxjs/react-redux) library, then in the next step we'll see how Redux Modules can reduce the
boilerplate involved in this common task.

We're also going to include client-side routing in our application, to provide an SPA experience for your client. When the search term changes, in addition toi interacting with Redux,
we'll also update the application's URL. To do this, we'll decorate our container with React Router's [withRouter](https://reacttraining.com/react-router/web/api/withRouter) higher order component to get access to the router history.

### Resources
- [Redux - Usage with React](https://redux.js.org/basics/usagewithreact)
- [React Bindings for Redux](https://github.com/reduxjs/react-redux)
- [React Router withRouter HoC](https://reacttraining.com/react-router/web/api/withRouter)

### TODO:
- High level test cases written in plain English (BDD-style)
  - ex: "it has a search term"-
  - ex: "it responds and redirects when the user starts a search"
- Run the tests and watch them fail
- Make the tests pass by connecting your search bar component to Redux with the "connect" method

### Step 10

### Recap: What did we learn?
- Testing connected components requires some new tools and techniques
- Testing routing components requires some new tools and techniques

### Objective
Now that we have a connected component, let's see how Redux Modules can help reduce the boilerplate involved. We'll refactor our
container component to use [connectModule](https://mboperator.gitbooks.io/redux-modules/content/docs/api_reference/) while keeping our specs green.

### Resources
- [connectModule](https://mboperator.gitbooks.io/redux-modules/content/docs/api_reference/)

### TODO
- Replace your connect call with connectModule, while keeping your specs green

## Step11

### Recap: What did we learn?
- Redux Modules can also reduce the boilerplate required to connect React components to Redux
- A suite of passing tests helps us refactor our code with confidence that it still works
- We can change the implementation details of code under test without breaking its public interface 

### Objective
Our next component will be a video preview, which we'll use for both search results and related videos on the now playing page.
We will again use the TDCD approach, focusing solely on data and behavior of the component with no concern for how it looks.

### Resources
- [Enzyme Test Renderer](http://airbnb.io/enzyme/)

### TODO
- High level test cases written in plain English (BDD-style)
  - ex: "it has a thumbnail image"
  - ex: "it displays the author's name"
- Run the tests and watch them fail
- Make the tests pass by implementing a video preview component using TDCD


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
- The tutorial uses [React Router](https://reacttraining.com/react-router/) to produce a Single Page Application (SPA) experience for your client

### Prerequisites
This tutorial assumes a working knowledge of JavaScript and the [React](https://reactjs.org/) view library, as well as at least a rudimentary understanding of [Redux](https://redux.js.org/)

### Resources
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Loop](https://redux-loop.js.org/)
- [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/)
- [React Router](https://reacttraining.com/react-router/)
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

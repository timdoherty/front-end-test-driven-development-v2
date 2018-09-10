
# FETDD - Front End Test Driven Development

### Overview
Your client has commissioned you to build a Youtube player. She likes Youtube but wants her own player built on their API, with just the basics: she wants to search for her favorite videos and play them while viewing comments and related videos.

In this tutorial we will build a Youtube player for your clieht in React+Redux from the ground up using Test Driven Development (TDD). We will start by writing acceptance criteria for the player together as a group, then split into smaller groups of 2-3 to write test cases and implement the product via TDD.

I've made a few decisions for you, to make your life easier and/or because they help keep the focus on testing, where it belongs:

- The application is scaffolded with [Create React App](https://github.com/facebook/create-react-app) so that you don't have to configure anything in order to start testing. Create React App also preconfigures [Jest](https://jestjs.io/docs/en/getting-started) which is arguably the best test framework around.
- The tutorial uses the [Enzyme test renderer](http://airbnb.io/enzyme/) from Airbnb. Enzyme has a robust API for testing components, with some helpful asbtractions for separating behavioral and presentational concerns.
- The tutorial uses [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/) to reduce the typical boilerplate required for Redux actions and reducers.
- The tutorial uses [Redux Loop](https://redux-loop.js.org/) for handling asynchronous Redux actions. Aside from other good reasons to recommend Redux Loop, the primary reason for using it here is that it has an excellent [testing story](https://redux-loop.js.org/docs/tutorial/Testing.html).

### Prerequisites
This tutorial assumes a working knowledge of JavaScript and the [React](https://reactjs.org/) view library, as well as at least a rudimentary understanding of [Redux](https://redux.js.org/)

### Getting Started
- Clone this repository
- Run "yarn" from the repository root

### Resources
- [Youtube Developers Page](https://developers.google.com/youtube/) 
- [Jest Test Framework](https://jestjs.io/docs/en/getting-started)
- [Enzyme Test Renderer](http://airbnb.io/enzyme/)
- [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/)
- [Redux Loop](https://redux-loop.js.org/)

### About This Course
This tutorial is about Test Driven Development, so we will be writing and running lots of tests. To start the test runner, simply run "yarn test" from the repository root.

This respository is split into distinct steps. Each step includes the following information in this README file:
- A recap of the previous step (where applicable)
- An objective for the current step, i.e., what you will be trying to achieve.
- A list of high-level TODO items for the current step, to help guide your efforts.

Each step also includes the completed code for the previous step, where applicable.

When starting a new step, you should kill and restart the test runner, in order to pick up new files added since the last step.

## Step 1

### Objective
The first thing we're going to need is a search bar. What does a search bar do? How will we know if it's done? Hopefully we've answered these questions while building our acceptance criteria, and we'll use those throughout the tutorial to start writing our test cases. 

Recommended best practice when building Redux applications is to start by designing your state. We'll follow this practice and break our state design process down into areas of responsibility, starting with our search bar state.

The nice thing about testing Redux reducers and selectors is that they are pure functions and thus very easy to test.

### TODO:
- High level test cases written in plain english (BDD-style)
- Run the tests and watch them fail
- Make the tests pass by implementing search bar state
- Introduction to Redux Modules
- Refactor as needed




# FETDD - Front End Test Driven Development

### Overview
Your client has commissioned you to build a Youtube player. She likes Youtube but wants her own player built on their API, with just the basics: the ability to search for videos and play them while viewing comments and related videos.

In this tutorial we will build a Youtube player for your client using React and Redux from the ground up using Test Driven Development (TDD). We will start by writing acceptance criteria for the player, then write test cases and implement the product via TDD.

I've made a few decisions for you, to make your life easier and/or because they help keep the focus on testing, where it belongs:

- The application is scaffolded with [Create React App](https://github.com/facebook/create-react-app) so that you don't have to configure anything in order to start testing. Create React App also preconfigures [Jest](https://jestjs.io/docs/en/getting-started) which is arguably the best test framework around.
- The tutorial uses the [Enzyme test renderer](http://airbnb.io/enzyme/) from Airbnb. Enzyme has a robust API for testing components, with some helpful asbtractions for separating behavioral and presentational concerns.
- The tutorial uses [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/) to reduce the typical boilerplate required for Redux actions and reducers.
- The tutorial uses [Redux Loop](https://redux-loop.js.org/) for handling asynchronous Redux actions. Aside from other good reasons to recommend Redux Loop, the primary reason for using it here is that it has an excellent [testing story](https://redux-loop.js.org/docs/tutorial/Testing.html).

### Prerequisites
This tutorial assumes a working knowledge of JavaScript and the [React](https://reactjs.org/) view library, as well as at least a rudimentary understanding of [Redux](https://redux.js.org/)

### Resources
- [Youtube Developers Page](https://developers.google.com/youtube/) 
- [Jest Test Framework](https://jestjs.io/docs/en/getting-started)
- [Enzyme Test Renderer](http://airbnb.io/enzyme/)
- [Redux Modules](https://mboperator.gitbooks.io/redux-modules/content/)
- [Redux Loop](https://redux-loop.js.org/)

### About This Tutorial
This tutorial is about Test Driven Development, so we will be writing and running lots of tests. To start the test runner, simply run "yarn test" from the repository root.

This respository is split into distinct steps. Each step includes the following information in this README file:
- A recap of the previous step (where applicable)
- An objective for the current step, i.e., what you will be trying to achieve.
- A list of high-level TODO items for the current step, to help guide your efforts.

Each step also includes the completed code for the previous step, where applicable.

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

## Step 1

### Objective
The first thing we're going to need is a search bar. What does a search bar do? How will we know if it's done? Hopefully we've answered these questions while building our acceptance criteria, and we'll use those throughout the tutorial to start writing our test cases. 

Recommended best practice when building Redux applications is to start by designing your state. We'll follow this practice in miniature by designing the relevant portions of state as we go, starting with our search bar state.

The nice thing about testing Redux reducers and selectors is that they are pure functions and thus very easy to test.

### TODO:
- High level test cases written in plain english (BDD-style)
- Run the tests and watch them fail
- Make the tests pass by implementing search bar state
- Refactor as needed while keeping the tests green
- Introduction to Redux Modules

## Step 2

### Recap: What did we learn?
- Good test cases come from well-defined acceptance criteria
- TDD consists of a short, repeated development cycle
- BDD (Behavior Driven Development) style tests help to decouple the what from the how in your tests
- Testing reducers and selectors is relatively straightforward since they're pure functions with no side effects

### Objective
Now that we've designed and built our Redux state for our search bar feature, let's write a search bar component. 
In this step we'll introduce some new tools and concepts for testing React components, as well as an approach for building components via TDD.

### TODO:
- High level test cases written in plain english (BDD-style)
- Introduction to the Enzyme test renderer for React
- Introduction to mocks
- Write a search bar component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle from step 1

## Step 3

### Recap: What did we learn?
- Testing React components involves some new tools and concepts 
- Basic Enzyme concepts including event simulation
- Clear separate of concerns eases component development
- Mocks can help simplify testing

### Objective
Now that we have both state and a component to present our search bar feature, we need to connect them together. We'll write a container component the connects our search bar to redux via Redux Modules.

### TODO:
- High level test cases written in plain english (BDD-style)
- Introduction to container testing
- Verify that your state is correctly mapped to your component props
- Verify that the correct action(s) are dispatched in response to user activities
- Repeat the TDD cycle

## Step 4

### Recap: What did we learn?
- Testing containers requires additional plumbing
- Component tests should only rely on the public contracts of immediate children

### Objective
Now that we can search for videos we need somewhere to store our search results. Let's design and build out our state for these results. We'll need to refer to the relevant [Youtube Search API](https://developers.google.com/youtube/v3/docs/search) in order to understand the request(s) we'll need to make and the shape of the returned data.

### TODO:
- High level test cases written in plain english (BDD-style)
- Introduction to testing asynchronous Redux side effects with Redux-loop
- Repeat the TDD cycle

## Step 5

### Recap: What did we learn?
- Testing asynchronous side effects with Redux-loop
- Testing a module's public interface vs. its private implementation

### Objective
We now have search results in state, and a selector to read them. Let's build some components to display the results. We'll start with a thumbnail preview.

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a thumbnail preview component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle 

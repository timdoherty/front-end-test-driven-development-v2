# FETDD - Front End Test Driven Development

### Overview
Your client has commissioned you to build a Youtube player. She likes Youtube but wants her own player built on their API, with just the basics: she wants to search for her favorite videos and play them while viewing comments and related videos.

In this course we will build a Youtube player for your clieht in React+Redux from the ground up using Test Driven Development (TDD). We will start by writing acceptance criteria for the player together as a class, then split into groups of 2-3 to write test cases and implement the product via TDD.

### Getting Started
- Clone this repository
- Run "yarn" from the repository root

### Resources
- [Youtube Developers Page](https://developers.google.com/youtube/) 
- [Jest Test Framework](https://jestjs.io/docs/en/getting-started)
- [Enzyme Test Renderer](http://airbnb.io/enzyme/)

### About This Course
This course is about Test Driven Development, so we will be writing and running lots of tests. To start the test runner, simply run "yarn test" from the repository root.

This respository is split into distinct steps. Each step includes the following information in this README file:
- A recap of the previous step (where applicable)
- An objective for the current step, i.e., what you will be trying to achieve.
- A list of high-level TODO items for the current step, to help guide your efforts.

Each step also includes the completed code for the previous step, where applicable.

When starting a new step, you should kill and restart the test runner, in order to pick up new files added since the last step.


## Step 1

### Objective
The first thing we're going to need is a search bar. What does a search bar do? How will we know if it's done?

Recommended best practice when building Redux applications is to start by designing your state.
The nice thing about testing Redux reducers and selectors is that they are pure functions and thus very easy to test.
But first, we will need to write some acceptance criteria.

### TODO:
- Search bar acceptance criteria, written as if the feature is done
- High level test cases written in plain english (BDD-style)
- Run the tests and watch them fail
- Make the tests pass by implementing search bar state
- Refactor as needed

## Step 2

### Recap: What did we learn?
- Good test cases come from well-defined acceptance criteria
- TDD consists of a short, repeated development cycle
- BDD (Behavior Driven Development) style tests help to decouple the what from the how in your tests

### Objective
Now that we've designed and built our Redux state for our search bar feature, let's write a search bar component. 
In this step we'll introduce some new tools and concepts for testing React components.

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a search bar component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle from step 1

## Step 3

### Recap: What did we learn?
- Testing React components involves some new tools and concepts 
- Clear separate of concerns eases component development

### Objective
Now that we have both state and a component to present our search bar feature, we need to connect them together.

### TODO:
- High level test cases written in plain english (BDD-style)
- Verify that your state is correctly mapped to your component props
- Verify that the correct action(s) are dispatched in response to user activities
- Repeat the TDD cycle

## Step 4

### Recap: What did we learn?
- Testing containers requires additional plumbing
- Introduction to mocks

### Objective
Now that we can search for videos we need somewhere to store our search results. Let's design and build out our state for these results

### TODO:
- High level test cases written in plain english (BDD-style)
- Make the tests pass by implementing search results state
- Repeat the TDD cycle


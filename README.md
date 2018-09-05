# Sample application for the FETDD Dev Academy course

In this course we will build a Youtube viewer in React+Redux from the ground up using Test Driven Development (TDD). We will look at 
the Youtube site and ask ourselves, as we build each part of the viewer, what constitutes valid acceptance criteria. From these,
we'll write out in plain english our high-level test cases, and work backwards from there.

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

## Step 5

### Recap: What did we learn?
- Testing a module's interface vs. it's implementation

### Objective
We have search results in state, and a selector to read them. Let's build some components to display the results. We'll start with a thumbnail preview.

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a thumbnail preview component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle 

## Step 6

### Recap: What did we learn?
- Reinforcement of the TDCD approach to building React components

### Objective
Let's wrap our thumbnail preview in a search result wrapper that displays metadata about the video

### TODO:
- High level test cases written in plain english (BDD-style)
- Reuse our previously built thumbnail component
- Add metadata
- Repeat the TDD cycle

## Step 7

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns
- Validating textual content agnostic of presentational concerns

### Objective
Now that we have thumbnail and search result components, we need to be able to display a list of search results.

### TODO:
- High level test cases written in plain english (BDD-style)
- Repeate the TDD cycle

## Step 8

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns

### Objective
Now that we have a list of search results, we need to design state for the currently playing video when a search result is clicked

### TODO:
- High level test cases written in plain english (BDD-style)
- Make the tests pass by implementing now playing state
- Repeat the TDD cycle

## Step 9

### Recap: What did we learn?
- 

### Objective
Now that we have state for our now playing feature, let's start building our components, starting with the video player

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a video player component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle

## Step 10

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns

### Objective
Let's continue building out our now playing components. Next up is a comment component to display a single comment

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a comment component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle

## Step 11

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns

### Objective
Now that we have a Comment component, let's build a connected list container for multiple comments

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a connected comment list component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle

## Step 12

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns

### Objective
Now let's reuse our thumbnail preview in a related video component

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a comment component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle

## Step 13

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns

### Objective
Now that we've refactored our original search result component into a reusable preview component, let's build a connected list container for related videos

### TODO:
- High level test cases written in plain english (BDD-style)
- Write a connected related videos list component using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle

## Step 14

### Recap: What did we learn?
- Component behavior and logic can be built using TDD agnostic of presentational concerns
- We can refactor components to be DRY when needed, vs prematurely optimizing

### Objective
Let's start putting things together by building our our application component and verifying that everything works when connected together

### TODO:
- High level test cases written in plain english (BDD-style)
- Write an application component using "Test Driven Component Development" (TDCD)
- Write an integration test using "Test Driven Component Development" (TDCD)
- Repeat the TDD cycle

## Step 15

### Recap: What did we learn?
- Mocking components with Jest
- Stubbing API requests
- Integration testing with a complete Redux store
- Testing async code

### Objective
In our final step we'll put sit and finish on our fully tested application and make it look like a Youtube player

### TODO
- CSS and markup adjustments for fit and finish
- Try to refactor the look and feel of your application while keeping your tests green!

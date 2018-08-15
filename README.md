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

# Interview Scheduler

A react application that allows users to book and cancel interviews.

This project built technical skills for React, Axios, Storybook, Jest, Webpack Dev Server, Testing Library, Cypress, and API integration with a PostgreSQL server via axios for managing realtime data updates.

## Features

- A host of different components successfully compiled to create the functional UI required for the Interview Scheduler App to be not only functional, but intuitive.
- Interview Scheduler is a well-tested project. Storybook was used to ensure all components are individually functioning as desired. Unit and integration tests via Jest, and End-to-End tests for full user journeys via Cypress.
- Seamless Single Page Application design with interactive UI achieved through  through encapsualted components that manage their own state via custom hooks.
- Integration of an API via axios to manage realtime data update via state and custom hooks.

## Final Product

Desktop version of website, default view of the web app on desktop browsers.
!["Desktop version of website"](https://raw.githubusercontent.com/christopherdegroot/tweeter/master/docs/Desktop.PNG)

Mobile-ready, responsive design. Page automatically re-arranges content of web page when below 1024 pixels, changing the layout to an improved format for mobile users.
!["Mobile Version"](https://raw.githubusercontent.com/christopherdegroot/tweeter/master/docs/Mobile.PNG)

Friendly UX through jQuery and CSS - Character counter (turns red when over the limit!), Tweet container event listeners to add box-shadow when mouse is over an element, and icons change colours.
!["Features"](https://raw.githubusercontent.com/christopherdegroot/tweeter/master/docs/features.png)

Error Handling - Tweets that are too long or empty are flagged for the user - Character counter also helps know how many characters you are at, or over the limit
!["Error Handling - Tweets that are too long or empty are flagged for the user - Character counter also helps know how many characters you are at, or over the limit"](https://raw.githubusercontent.com/christopherdegroot/tweeter/master/docs/ErrorHandling.PNG)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

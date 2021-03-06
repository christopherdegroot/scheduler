# Interview Scheduler

A react application that allows users to book and cancel interviews.

This project built technical skills for React, Axios, Storybook, Jest, Webpack Dev Server, Testing Library, Cypress, and API integration with a PostgreSQL server via axios for managing realtime data updates.

## Features

- A host of different components successfully compiled to create the functional UI required for the Interview Scheduler App to be not only functional, but intuitive.
- Interview Scheduler is a well-tested project. Storybook was used to ensure all components are individually functioning as desired. Unit and integration tests via Jest, and End-to-End tests for full user journeys via Cypress.
- Seamless Single Page Application design with interactive UI achieved through  through encapsualted components that manage their own state via custom hooks.
- Integration of an API via axios to manage realtime data update via state and custom hooks.

## Final Product

Full demo of all React component functions: navigating days, selecting days, adding, editing, and deleting appointments. All changes update state and persist through refreshes.

!["Desktop version of website"](https://raw.githubusercontent.com/christopherdegroot/scheduler/master/docs/Scheduler.gif)


## Setup

Install dependencies with `npm install`.

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory, then follow the README.md instructions within.

## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer

## Running Webpack Development Server

```sh
npm start
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Jest Test Framework

```sh
npm test
```

## Running Cypress Test Framework

```sh
npm run cypress
```



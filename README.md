# Todo App

Welcome to the Todo App! This is a simple application that helps you manage your tasks using three lists: "Todo," "Doing," and "Done." You can easily add or delete tasks from these lists. When you check off a task, it will be moved to the top of the "Done" list after 3 seconds. If you uncheck a task, it will be moved to the top of the "Todo" list. Additionally, you can edit each task by clicking on it and making changes.

## Features

- Three task lists: Todo, Doing, and Done.
- Add, delete, and edit tasks.
- Automatic task reordering based on task status.
- Tasks are saved using localStorage, ensuring persistence across page refreshes and browser closures.
- Comes pre-loaded with 7 tasks for first-time users.

## Getting Started

To use the Todo App, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your command prompt or terminal.
3. Run the following command to build the project: `npm run build`
4. Next, navigate to the `dist` directory.
5. If you haven't already, install the http-server package globally: `npm install -g http-server`
6. Finally, run this command to start the server: `http-server`

You are now ready to start managing your tasks with the Todo App!

# Documentation Guidelines

## How to Prepare Documentation for a Component

### Title and Introduction

Begin by providing a clear and succinct title for the proposed React component.

### Props and State

Explain the properties (props) and state that the component will utilize.

### Component Hierarchy

If the component is part of a larger application or system, elucidate how it integrates into the overall component hierarchy.

### Data Flow

Elaborate on how data will traverse into and out of the component. Describe any data sources, API calls, or parent-child component relationships.

## Collaborative Development Practices

### Version Control System

Employ a version control system like GitHub to effectively track changes.

### Code Review Process

Implement a systematic code review process where team members evaluate each other's code changes before merging them into the primary codebase.

## Personal Git and GitHub Experience

Proficiency Level: Intermediate

## Requirements for This Project

- Node: v16.17.0
- React: 18.2.0
- react-dnd: 16.0.1
- react-dnd-html5-backend: 16.0.1
- react-dom: 18.2.0
- uuid: 9.0.0
- Other devDependencies like webpack that are in package.json

## Time Spent on Each Task

- Create project and configure webpack: 30 minutes
- Body: 4 hours and 30 minutes
- Button: 15 minutes
- Constants: 2 minutes
- Header: 15 minutes
- Task: 9 hours
- TodoContainer: 8 hours

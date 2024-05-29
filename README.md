# Task and Project Management

## Description

This application is designed to facilitate the management of tasks and projects. It allows users to create, modify, delete, and retrieve projects and their associated tasks. All operations are logged for record-keeping purposes.

## Key Features

- **Project Management**: Create and manage multiple projects, each with a unique description and lifecycle.
- **Task Management**: Assign and manage tasks within projects, each with specific details and deadlines.
- **CRUD Operations**: Full support for Create, Read, Update, and Delete operations on both projects and tasks.
- **Database Persistence**: Projects and tasks are stored in a relational database for persistent storage.
- **Modular Design**: The application is designed with modular components to facilitate deployment in containers using Kubernetes.

## Diagrams

```mermaid
erDiagram
    PROJECT {
        int ID PK "Primary Key"
        varchar Name "Not Null"
        text Description
        datetime CreationDate "Not Null"
        datetime TerminationDate
    }
    
    TASK {
        int ID PK "Primary Key"
        int ProjectID FK "Foreign Key"
        varchar Name "Not Null"
        text Description
        datetime CreationDate "Not Null"
        datetime TerminationDate
    }
    
    LOG {
        int ID PK "Primary Key"
        Operation Operation "Not Null"
        Entity Entity "Not Null"
        int EntityID "Not Null"
        datetime Timestamp "Not Null"
    }

    PROJECT ||--o{ TASK : has
    TASK }o--|| PROJECT : references
```

### Endpoints

### Project

The project module provides the following endpoints:

- **GET /projects**: Retrieve all projects.
  - This endpoints doesn't need any parameters.

  This endpoint returns a list of projects with the following fields:
  - *ID*: The unique identifier of the project.
  - *Name*: The name of the project.
  - *Description*: A brief description of the project.
  - *CreationDate*: The date when the project was created.
  - *TerminationDate*: The date when the project is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `GET`
  - *Entity*: `Project`
  - *EntityID*: `All`


- **GET /projects/{id}**: Retrieve a specific project by ID.
  - This endpoint needs the *ID of the project* to be retrieved.

  This endpoint returns a project with the following fields:
  - *ID*: The unique identifier of the project.
  - *Name*: The name of the project.
  - *Description*: A brief description of the project.
  - *CreationDate*: The date when the project was created.
  - *TerminationDate*: The date when the project is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `GET`
  - *Entity*: `Project`
  - *EntityID*: `ID`

- **POST /new-project**: Create a new project.
  - This endopints needs the following parameters:
    - *Name*: The name of the project.
    - *Description*: A brief description of the project.

  This endpoint returns the created project with the following fields:
  - *ID*: The unique identifier of the project.
  - *Name*: The name of the project.
  - *Description*: A brief description of the project.
  - *TerminationDate?*: The date when the project is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:

- **PUT /update-project/{id}**: Update an existing project by ID.
  - This endpoint needs the *ID of the project* to be updated.
  - This endpoint needs the following parameters:
    - *Name*: The name of the project.
    - *Description*: A brief description of the project.
    - *TerminationDate?*: The date when the project is terminated.

  This endpoint returns the updated project with the following fields:
  - *ID*: The unique identifier of the project.
  - *Name*: The name of the project.
  - *Description*: A brief description of the project.
  - *CreationDate*: The date when the project was created.
  - *TerminationDate*: The date when the project is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `PUT`
  - *Entity*: `Project`
  - *EntityID*: `ID`

- **DELETE /delete-project/{id}**: Delete a project by ID.
  - This endpoint needs the *ID of the project* to be deleted.

  This endpoint doen't return any value.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `DELETE`
  - *Entity*: `Project`
  - *EntityID*: `ID`

### Task

The task module provides the following endpoints:

- **GET /tasks/{id_project}**: Retrieve all tasks of a specific project.
  - This endpoint needs the *ID of the project* to be retrieved.

  This endpoint returns a list of tasks with the following fields:

  - *ID*: The unique identifier of the task.
  - *ProjectID*: The ID of the project to which the task belongs.
  - *Name*: The name of the task.
  - *Description*: A brief description of the task.
  - *CreationDate*: The date when the task was created.
  - *TerminationDate*: The date when the task is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `GET`
  - *Entity*: `Task`
  - *EntityID*: `ProjectID`

- **GET /tasks/{id}**: Retrieve a specific task by ID.
  - This endpoint needs the *ID of the task* to be retrieved.

  This endpoint returns a task with the following fields:
  - *ID*: The unique identifier of the task.
  - *ProjectID*: The ID of the project to which the task belongs.
  - *Name*: The name of the task.
  - *Description*: A brief description of the task.
  - *CreationDate*: The date when the task was created.
  - *TerminationDate*: The date when the task is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `GET`
  - *Entity*: `Task`
  - *EntityID*: `ID`

- **POST /new-task/{id_project}**: Create a new task.
  - This endpoint needs the *ID of the project* to which the task belongs.
  - This endpoint needs the following parameters:
    - *Name*: The name of the task.
    - *Description*: A brief description of the task.
    - *TerminationDate?*: The date when the task is terminated.

  This endpoint returns the created task with the following fields:
  - *ID*: The unique identifier of the task.
  - *ProjectID*: The ID of the project to which the task belongs.
  - *Name*: The name of the task.
  - *Description*: A brief description of the task.
  - *CreationDate*: The date when the task was created.
  - *TerminationDate*: The date when the task is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `POST`
  - *Entity*: `Task`
  - *EntityID*: `ID`

- **PUT /update-task/{id}**: Update an existing task by ID.
  - This endpoint needs the *ID of the task* to be updated.
  - This endpoint needs the following parameters:
    - *ProjectID*: The ID of the project to which the task belongs.
    - *Name*: The name of the task.
    - *Description*: A brief description of the task.

  This endpoint returns the updated task with the following fields:
  - *ID*: The unique identifier of the task.
  - *ProjectID*: The ID of the project to which the task belongs.
  - *Name*: The name of the task.
  - *Description*: A brief description of the task.
  - *CreationDate*: The date when the task was created.
  - *TerminationDate*: The date when the task is terminated.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `PUT`
  - *Entity*: `Task`
  - *EntityID*: `ID`

- **DELETE /delete-task/{id}**: Delete a task by ID.
  - This endpoint needs the *ID of the task* to be deleted.

  This endpoint doen't return any value.

  Also, this endpoint have to do and enpoint to logging the operation with the following fields:
  - *Operation*: `DELETE`
  - *Entity*: `Task`
  - *EntityID*: `ID`

### Logging

The logging module provides the following endpoints:

- **GET /logs**: Retrieve all logs.
  - This endpoints doesn't need any parameters.

  This endpoint returns a list of logs with the following fields:
  - *ID*: The unique identifier of the log.
  - *Operation*: The operation performed.
  - *Entity*: The entity affected by the operation.
  - *EntityID*: The ID of the entity affected by the operation.
  - *Timestamp*: The date and time when the operation was performed.

- **POST /new-log**: Create a new log.
  - This endopints needs the following parameters:
    - *Operation*: The operation performed.
    - *Entity*: The entity affected by the operation.
    - *EntityID*: The ID of the entity affected by the operation.

  This endpoint returns the created log with the following fields:
  - *ID*: The unique identifier of the log.
  - *Operation*: The operation performed.
  - *Entity*: The entity affected by the operation.
  - *EntityID*: The ID of the entity affected by the operation.
  - *Timestamp*: The date and time when the operation was performed.
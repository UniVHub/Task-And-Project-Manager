# Backend petitions

## Logs

### Get all logs

```
GET /api/logs
```

### Get a log by its ID

```
GET /api/logs/{id}
```

## Projects

### Get all projects

```
GET /api/projects
```

#### Log (get all projects)

- `operation`: `"GET"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"all"`.

### Get a project by its ID

```
GET /api/projects/{id}
```

#### Log (get a project by its ID)

- `operation`: `"GET"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"ID: <project ID>"`.

### Create a project

```
POST /api/project
```

- `name`: the name of the project.

- `description`: a brief description of the project.

#### Log (project creation)

- `operation`: `"POST"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"ID: <project ID>"`.

#### Example (project creation)

```JSON
{
    "name": "project name",
    "description": "project description"
}
```

### Update a project

```
POST /api/projects/{id}
```

- `name`: the name of the project.

- `description`: a brief description of the project.

- `creation_date`: the date when the project was created.

- `termination_date`: the date when the project is terminated.

#### Log (project update)

- `operation`: `"POST"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"ID: <project ID>"`.

#### Example (project update)

```JSON
{
    "name": "new project name",
    "description": "new project description",
    "creation_date": "2022-12-31T23:59:59",
    "termination_date": "2023-12-31T23:59:59"
}
```

### Delete a project

```
DELETE /api/projects/{id}
```

#### Log (project deletion)

- `operation`: `"DELETE"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"ID: <project ID>"`.

### Delete all project

```
DELETE /api/projects
```

#### Log (all project deletion)

- `operation`: `"DELETE"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"all"`.

### Get the pages of a search

```
GET /api/projects/pages/{name}/{page_size}
```

#### Log (get the pages of a search)

- `operation`: `"GET"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"Name: <name>" Page size: <page_size>`.

### Search a project by its name

```
GET /api/projects/search/{name}/{page_size}/{page}
```

#### Log (search a project by its name)

- `operation`: `"GET"`.

- `entity`: `"PROJECT"`.

- `entity_id`: `"Name: <name>" Page size: <page_size> Page: <page>`.

## Tasks

### Get all tasks associated with a project

```
GET /api/tasks/by_project/{project_id}
```

#### Log (Get all tasks associated with a project)

- `operation`: `"GET"`.

- `entity`: `"TASK"`.

- `entity_id`: `"Entity: all Project ID: <project ID>"`.

### Get a task by its ID

```
GET /api/tasks/{id}
```

#### Log (get a task by its ID)

- `operation`: `"GET"`.

- `entity`: `"TASK"`.

- `entity_id`: `"ID: <task ID>"`.

### Create a task associated with a project

```
POST /api/tasks/{id}
```

- `name`: the name of the task.

- `description`: a brief description of the task.

#### Log (create a task associated with a project)

- `operation`: `"POST"`.

- `entity`: `"TASK"`.

- `entity_id`: `"ID: <task ID>"`.

#### Example (task creation)

```JSON
{
    "name": "task name",
    "description": "task description",
}
```

### Update a task

```
PUT /api/tasks/{id}
```

- `id`: the ID of the task to be updated.

- `name`: the name of the task.

- `description`: a brief description of the task.

- `creation_date`: the date when the task was created.

- `termination_date`: the date when the task was terminated.

#### Log (update a task)

- `operation`: `"PUT"`.

- `entity`: `"TASK"`.

- `entity_id`: `"ID: <task ID>"`.

#### Example (task update)

```JSON
{
    "name": "name",
    "description": "description",
    "creation_date": "2022-12-31T23:59:59",
    "termination_date": "2023-12-31T23:59:59"
}
```

### Delete a task

```
DELETE /api/tasks/{id}
```

#### Log (delete a task)

- `operation`: `"DELETE"`.

- `entity`: `"TASK"`.

- `entity_id`: `"ID: <task ID>"`.

### Delete all tasks associated with a project

```
DELETE /api/tasks/by_project/{project_id}
```

#### Log (delete all tasks associated with a project)

- `operation`: `"DELETE"`.

- `entity`: `"TASK"`.

- `entity_id`: `"Entity: all Project ID: <project ID>"`.

### Search a task by its name

```
GET /api/tasks/search/{project_id}/{name}
```

#### Log (search a task by its name)

- `operation`: `"GET"`.

- `entity`: `"TASK"`.

- `entity_id`: `"Entity: all Project ID: <project ID> Name: <name>"`.

## Doing a petition with `curl`

```BASH
curl -X <TYPE OF PETITION> -H "Content-Type: application/json" -d @petition.json <URL>
```

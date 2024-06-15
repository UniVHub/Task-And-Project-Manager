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

- `entity`: `"project"`.

- `entity_id`: `"all"`.

### Get a project by its ID

```
GET /api/projects/{id}
```

#### Log (get a project by its ID)

- `operation`: `"GET"`.

- `entity`: `"project"`.

- `entity_id`: `"<project ID>"`.

### Create a project

- `name`: the name of the project.

- `description`: a brief description of the project.

#### Log (project creation)

- `operation`: `"POST"`.

- `entity`: `"project"`.

- `entity_id`: `"<project ID>"`.

#### Example (project creation)

```JSON
{
    "name": "name",
    "description": "description"
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

- `entity`: `"project"`.

- `entity_id`: `"<project ID>"`.

#### Example (project update)

```JSON
{
    "name": "name",
    "description": "description",
    "creation_date": "2022-12-31T23:59:59",
    "termination_date": "2023-12-31T23:59:59"
}
```

### Delete a project

```
DELTE /api/projects/{id}
```

#### Log (project deletion)

- `operation`: `"DELETE"`.

- `entity`: `"project"`.

- `entity_id`: `"<project ID>"`.

### Delete all project

```
DELTE /api/projects
```

#### Log (all project deletion)

- `operation`: `"DELETE"`.

- `entity`: `"project"`.

- `entity_id`: `"all"`.

### Get a projects page

```
GET /api/projects/get_page/{page}
```

### Search a project by its name

```
GET /api/projects/search/{name}
```

## Tasks

### Get all tasks associated with a project

```
GET /api/tasks/by_project_id/{id}
```

#### Log (Get all tasks associated with a project)

- `operation`: `"GET"`.

- `entity`: `"task"`.

- `entity_id`: `"all tasks associate with the project with the ID: <project ID>"`.

### Get a task by its ID

```
GET /api/tasks/{id}
```

#### Log (get a task by its ID)

- `operation`: `"GET"`.

- `entity`: `"task"`.

- `entity_id`: `"<task ID>"`.

### Create a task associated with a project

```
POST /api/tasks/{id}
```

- `name`: the name of the task.

- `description`: a brief description of the task.

#### Log (create a task associated with a project)

- `operation`: `"POST"`.

- `entity`: `"task"`.

- `entity_id`: `"<task ID>"`.

#### Example (task creation)

```JSON
{
    "name": "name",
    "description": "description",
}
```

### Update a task

- `id`: the ID of the task to be updated.

- `name`: the name of the task.

- `description`: a brief description of the task.

- `creation_date`: the date when the task was created.

- `termination_date`: the date when the task was terminated.

#### Log (update a task)

- `operation`: `"PUT"`.

- `entity`: `"task"`.

- `entity_id`: `"<task ID>"`.

#### Example (task update)

```JSON
{
    "name": "name",
    "description": "description",
    "creation_date": "2022-12-31T23:59:59",
    "termination_date": "2023-12-31T23:59:59"
}
```

### Delete all tasks

```
DELTE /api/tasks
```

## Doing a petition with `curl`

```BASH
curl -X <TYPE OF PETITION> -H "Content-Type: application/json" -d @petition.json <URL>
```

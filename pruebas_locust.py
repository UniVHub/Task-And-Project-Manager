from locust import HttpUser, TaskSet, task, between

# Define una clase que hereda de TaskSet y define las tareas que ejecutará el usuario
# para casos donde las tareas deben ejecutarse en un orden específico.
class ProjectTasks(TaskSet):

    # El decorador @task se utiliza para marcar métodos como tareas que Locust ejecutará durante las pruebas de carga

    # Create project
    @task(1)
    def create_project(self):
        self.client.post("/api/project", json={
            "name": "Test Project",
            "description": "Description of test project"
        })
        
    # Get all projects
    @task(1)
    def get_all_projects(self):
        self.client.get("/api/projects")

    # Get all projects wrong
    @task(1)
    def get_all_projects(self):
        self.client.get("/api/projectss")

    # Get project by ID
    @task(1)
    def get_project_by_id(self):
        self.client.get("/api/projects/1")  # Cambia el ID según sea necesario

    # Update project
    @task(1)
    def update_project(self):
        self.client.put("/api/projects/1", json={
            "name": "Updated Project",
            "description": "Updated description",
            "termination_date": "2025-01-01"
        })

    # Delete project
    @task(1)
    def delete_project(self):
        self.client.delete("/api/projects/1")  # Cambia el ID según sea necesario

# class TaskTasks(TaskSet):

#     @task(1)
#     def get_all_tasks(self):
#         self.client.get("/tasks/1")  # Cambia el ID del proyecto según sea necesario

#     @task(1)
#     def get_task_by_id(self):
#         self.client.get("/tasks/1")  # Cambia el ID según sea necesario

#     @task(1)
#     def create_task(self):
#         self.client.post("/new-task/1", json={
#             "name": "Test Task",
#             "description": "Description of test task"
#         })

#     @task(1)
#     def update_task(self):
#         self.client.put("/update-task/1", json={
#             "projectID": 1,
#             "name": "Updated Task",
#             "description": "Updated description"
#         })

#     @task(1)
#     def delete_task(self):
#         self.client.delete("/delete-task/1")  # Cambia el ID según sea necesario

# class LoggingTasks(TaskSet):

#     @task(1)
#     def get_all_logs(self):
#         self.client.get("/logs")

#     @task(1)
#     def create_log(self):
#         self.client.post("/new-log", json={
#             "operation": "POST",
#             "entity": "Task",
#             "entityID": 1
#         })

class WebsiteUser(HttpUser):
    # Define la clase de tareas que ejecutará el usuario
    tasks = [ProjectTasks]
    # Define que el usuario esperará entre 1 y 5 segundos entre la ejecución de cada tarea
    wait_time = between(1, 5)

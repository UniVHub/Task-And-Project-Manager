from locust import HttpUser, task, between, SequentialTaskSet
import itertools
from utils import execute_functions, create_entity, get_last_project_id

# Crear un nuevo proyecto para las pruebas
new_project_for_testing = create_entity("api/projects")
id_project = get_last_project_id("api/projects/last_created_id")

# Obtener el último ID de tarea creada antes de ejecutar las pruebas
last_task_id = execute_functions(f"api/tasks/{id_project}","api/tasks/last_created_id","api/tasks")
task_counter = itertools.count(last_task_id + 1)

class ProjectTasks(SequentialTaskSet):

    def __init__(self, parent):
        super().__init__(parent)
        self.task_id = None

    def on_start(self):
        """ Esta función se ejecuta al inicio de cada usuario para crear su propia tarea """
        task_id = next(task_counter)
        task_name = f"Test Task {task_id}"
        response = self.client.post(f"/api/tasks/{id_project}", json={
            "name": task_name,
            "description": f"Description of {task_name}"
        })
        self.task_id = response.json().get('id')
        
    @task(1)
    def get_all_tasks(self):
        self.client.get(f"/api/tasks/by_project/{id_project}")  # Cambia el ID del proyecto según sea necesario

    @task(1)
    def get_task_by_id(self):
        if self.task_id:
            self.client.get(f"/api/tasks/{self.task_id}")  

    # Update task
    @task(1)
    def update_task(self):
        if self.task_id:
            self.client.put(f"/api/tasks/{self.task_id}", json={
            "name": f"Updated Task {self.task_id}",
            "description": "description",
            "creation_date": "2022-12-31T23:59:59",
            "termination_date": "2023-12-31T23:59:59"
            })

    # Delete task
    @task(1)
    def delete_task(self):
        if self.task_id:
            self.client.delete(f"/api/tasks/{self.task_id}")
            self.task_id = None

class WebsiteUser(HttpUser):
    # Define la clase de tareas que ejecutará el usuario
    tasks = [ProjectTasks]
    # Define que el usuario esperará entre 1 y 5 segundos entre la ejecución de cada tarea
    wait_time = between(1, 5)


from locust import HttpUser, task, between, SequentialTaskSet
import itertools
from utils import execute_functions

# Obtener el último ID de proyecto creado antes de ejecutar las pruebas
last_project_id = execute_functions("api/projects","api/projects/last_created_id","api/projects")
project_counter = itertools.count(last_project_id + 1)

# Define una clase que hereda de SequentialTaskSet y define las tareas que ejecutará el usuario
# para casos donde las tareas deben ejecutarse en un orden específico.
class Projects(SequentialTaskSet):
    def __init__(self, parent):
        super().__init__(parent)
        self.project_id = None

    # El decorador @task se utiliza para marcar métodos como tareas que Locust ejecutará durante las pruebas de carga
    # Create project
    def on_start(self):
        """ Esta función se ejecuta al inicio de cada usuario para crear su propio proyecto """
        project_id = next(project_counter)
        project_name = f"Test Project {project_id}"
        response = self.client.post("/api/projects", json={
            "name": project_name,
            "description": f"Description of {project_name}"
        })
        self.project_id = response.json().get('id')
        
    # Get all projects
    @task(1)
    def get_all_projects(self):
        self.client.get("/api/projects")

    # Get project by ID
    @task(1)
    def get_project_by_id(self):
        if self.project_id:
            self.client.get(f"/api/projects/{self.project_id}")

    # Update project
    @task(1)
    def update_project(self):
        if self.project_id:
            self.client.put(f"/api/projects/{self.project_id}", json={
                "name": f"Updated Project {self.project_id}",
                "description": "Updated description",
                "creation_date": "2022-12-31T23:59:00",
                "termination_date": "2023-12-31T23:59:00"
            })

    # Delete project
    @task(1)
    def delete_project(self):
        if self.project_id:
            self.client.delete(f"/api/projects/{self.project_id}")
            self.project_id = None

class WebsiteUser(HttpUser):
    # Define la clase de tareas que ejecutará el usuario
    tasks = [Projects]
    # Define que el usuario esperará entre 1 y 5 segundos entre la ejecución de cada tarea
    wait_time = between(1, 5)





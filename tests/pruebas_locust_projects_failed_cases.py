from locust import HttpUser, task, between, SequentialTaskSet
import itertools
from utils import execute_functions

# Obtener el último ID de proyecto creado antes de ejecutar las pruebas
last_project_id = execute_functions("api/projects","api/projects/last_created_id","api/projects")
project_counter = itertools.count(last_project_id + 1)

# Define una clase que hereda de SequentialTaskSet y define las tareas que ejecutará el usuario
# para casos donde las tareas deben ejecutarse en un orden específico.
class ProjectsWrong(SequentialTaskSet):
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

    def handle_response(self, response):
        if response.status_code == 404:
            error = response.text
            if not response.text:
                error = "Wrong ID"
            response.failure(f"Error: {response.status_code} - {error}")
        elif response.status_code == 500:
            response.failure(f"Error: {response.status_code} - Internal Server Error")
        elif response.status_code != 200:
            response.failure(f"Unexpected status code: {response.status_code} - {response.text}")

    @task(1)
    def get_all_projects_wrong(self):
        with self.client.get("/api/projectsX", catch_response=True) as response:
            self.handle_response(response)

    @task(1)
    def get_all_projects(self):
        with self.client.get("/api/projects", catch_response=True) as response:
            self.handle_response(response)

    @task(1)
    def get_project_by_id_wrong(self):
        if self.project_id:
            with self.client.get(f"/api/projects/11", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def get_project_by_id(self):
        if self.project_id:
            with self.client.get(f"/api/projects/{self.project_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def get_project_by_wrong_path(self):
        if self.project_id:
            with self.client.get(f"/api/projects/-{self.project_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def update_project_wrong_data_type(self):
        if self.project_id:
            with self.client.put(f"/api/projects/{self.project_id}", json={
                "name": f"Updated Project {self.project_id}",
                "description": 10,  # Incorrect data type
                "creation_date": "2022-12-31T23:59:00",
                "termination_date": "2023-12-31T23:59:00"
            }, catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def update_project(self):
        if self.project_id:
            with self.client.put(f"/api/projects/{self.project_id}", json={
                "name": f"Updated Project {self.project_id}",
                "description": "Updated description",
                "creation_date": "2022-12-31T23:59:00",
                "termination_date": "2023-12-31T23:59:00"
            }, catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def update_project_wrong_date_format(self):
        if self.project_id:
            with self.client.put(f"/api/projects/{self.project_id}", json={
                "name": f"Updated Project {self.project_id}",
                "description": "Updated description",
                "creation_date": "2022-12-31T23:59:00",
                "termination_date": "2023-12-31"  # Incorrect date format
            }, catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_project_wrong_id(self):
        if self.project_id:
            with self.client.delete(f"/api/projects/23", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_project_negative_id(self):
        if self.project_id:
            with self.client.delete(f"/api/projects/{-self.project_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_project(self):
        if self.project_id:
            with self.client.delete(f"/api/projects/{self.project_id}", catch_response=True) as response:
                if response.status_code == 200:
                    self.project_id = None
                else:
                    self.handle_response(response)

    @task(1)
    def get_logs(self):
        if self.task_id:
            with self.client.get(f"/api/logs", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def get_logs_by_id(self):
        if self.task_id:
            with self.client.get(f"/api/logs/{self.project_id}", catch_response=True) as response:
                self.handle_response(response)

class WebsiteUser(HttpUser):
    # Define la clase de tareas que ejecutará el usuario
    tasks = [ProjectsWrong]
    # Define que el usuario esperará entre 1 y 5 segundos entre la ejecución de cada tarea
    wait_time = between(1, 5)




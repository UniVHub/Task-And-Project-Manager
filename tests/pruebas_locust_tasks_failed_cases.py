from locust import HttpUser, task, between, SequentialTaskSet
import itertools
from utils import execute_functions, create_entity, get_last_project_id

# Crear un nuevo proyecto para cada usuario virtual
new_project_for_testing = create_entity("api/projects")
id_project = get_last_project_id("api/projects/last_created_id")

# Obtener el último ID de tarea creada antes de ejecutar las pruebas
last_task_id = execute_functions(f"api/tasks/{id_project}","api/tasks/last_created_id","api/tasks")
task_counter = itertools.count(last_task_id + 1)

class ProjectTasksFailedCases(SequentialTaskSet):

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
    def get_all_tasks_wrong_path(self):
        with self.client.get(f"/api/tasks/by_projectX/{id_project}", catch_response=True) as response:
            self.handle_response(response)

    @task(1)
    def get_all_tasks(self):
        with self.client.get(f"/api/tasks/by_project/{id_project}", catch_response=True) as response:
            self.handle_response(response)

    @task(1)
    def get_all_tasks_wrong_project(self):
        with self.client.get(f"/api/tasks/by_project/90000000", catch_response=True) as response:
            self.handle_response(response)

    @task(1)
    def get_task_by_id(self):
        if self.task_id:
            with self.client.get(f"/api/tasks/{self.task_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def get_task_by_negative_id(self):
        if self.task_id:
            with self.client.get(f"/api/tasks/-{self.task_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def update_task_wrong_format(self):
        if self.task_id:
            with self.client.put(f"/api/tasks/{self.task_id}", json={
                "name": f"Updated Task {self.task_id}",
                "description": "description",
                "creation_date": "2022-12-31T23:59:59",
                "termination_date": "2023-12-"
            }, catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def update_task(self):
        if self.task_id:
            with self.client.put(f"/api/tasks/{self.task_id}", json={
                "name": f"Updated Task {self.task_id}",
                "description": "description",
                "creation_date": "2022-12-31T23:59:59",
                "termination_date": "2023-12-31T23:59:59"
            }, catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_task_wrong_path(self):
        if self.task_id:
            with self.client.delete(f"/api/tasks/-{self.task_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_task_negative_id(self):
        if self.task_id:
            negative_task_id = -self.task_id
            with self.client.delete(f"/api/tasks/{negative_task_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_task_wrong_id(self):
        if self.task_id:
            with self.client.delete(f"/api/tasks/30000000", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_task(self):
        if self.task_id:
            with self.client.delete(f"/api/tasks/{self.task_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def delete_task(self):
        if self.task_id:
            with self.client.delete(f"/api/tasks/{self.task_id}", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def get_logs(self):
        if self.task_id:
            with self.client.get(f"/api/logs", catch_response=True) as response:
                self.handle_response(response)

    @task(1)
    def get_logs_by_id(self):
        if self.task_id:
            with self.client.get(f"/api/logs/{self.task_id}", catch_response=True) as response:
                self.handle_response(response)

class WebsiteUser(HttpUser):
    tasks = [ProjectTasksFailedCases]
    wait_time = between(1, 5)



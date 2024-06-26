from locust import HttpUser, task, between, SequentialTaskSet
import itertools

# Contador global para generar nombres únicos de proyectos
id_first_project = 68 # Debe ser el número donde va el contador de id de la base de datos
project_counter = itertools.count(id_first_project)

# Define una clase que hereda de SequentialTaskSet y define las tareas que ejecutará el usuario
# para casos donde las tareas deben ejecutarse en un orden específico.
class ProjectsWrong(SequentialTaskSet):

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

    # Get all projects wrong
    @task(1)
    def get_all_projects_wrong(self):
        response = self.client.get("/api/projectsX")
        if response.status_code != 200:
            print(f"Error: {response.status_code} - {response.text}")

    # Get project by ID wrong
    @task(1)
    def get_project_by_id_wrong(self):
        if self.project_id:
            response = self.client.get(f"/api/projects/11")
            if response.status_code != 200:
                print(f"Error: {response.status_code} - {response.text}")

    # Update project wrong with incorrect data type
    @task(1)
    def update_project_wrong_data_type(self):
        if self.project_id:
            response = self.client.put(f"/api/projects/{self.project_id}", json={
                "name": f"Updated Project {self.project_id}",
                "description": 10,  # Incorrect data type
                "creation_date": "2022-12-31T23:59:00",
                "termination_date": "2023-12-31T23:59:00"
            })
            if response.status_code != 200:
                print(f"Error: {response.status_code} - {response.text}")

    # Update project wrong with incorrect date format
    @task(1)
    def update_project_wrong_date_format(self):
        if self.project_id:
            response = self.client.put(f"/api/projects/{self.project_id}", json={
                "name": f"Updated Project {self.project_id}",
                "description": "Updated description",
                "creation_date": "2022-12-31T23:59:00",
                "termination_date": "2023-12-31"  # Incorrect date format
            })
            if response.status_code != 200:
                print(f"Error: {response.status_code} - {response.text}")

    # Delete project wrong ID
    @task(1)
    def delete_project_wrong_id(self):
        if self.project_id:
            response = self.client.delete(f"/api/projects/23")  # Non-existent ID
            if response.status_code != 200:
                print(f"Error: {response.status_code} - {response.text}")

    # Delete project with negative ID
    @task(1)
    def delete_project_negative_id(self):
        if self.project_id:
            response = self.client.delete(f"/api/projects/{-self.project_id}")  # Negative ID
            if response.status_code != 200:
                print(f"Error: {response.status_code} - {response.text}")    

class WebsiteUser(HttpUser):
    # Define la clase de tareas que ejecutará el usuario
    tasks = [ProjectsWrong]
    # Define que el usuario esperará entre 1 y 5 segundos entre la ejecución de cada tarea
    wait_time = between(1, 5)


# locust -f pruebas_locust_projects.py --host http://192.168.59.107:31648 -u 50 -r 5 --run-time 3m
# http://192.168.59.107:31648 es la URL del back de la aplicación
# -u 50: 50 usuarios concurrentes
# -r 5: 5 usuarios por segundo
# --run-time 1m: tiempo de ejecución de 3 minuto


# 1. Pruebas de carga con Locust
# locust -f pruebas_locust_projects.py --host http://192.168.59.107:31648 -u 100 -r 10 --run-time 10m
# locust -f pruebas_locust_tasks.py --host http://192.168.59.107:31648 -u 100 -r 10 --run-time 10m
# 2. Pruebas de Estrés con Locust
# locust -f pruebas_locust_projects.py --host http://192.168.59.107:31648 -u 1000 -r 50 --run-time 20m
# locust -f pruebas_locust_tasks.py --host http://192.168.59.107:31648 -u 1000 -r 50 --run-time 20m
# 3. Pruebas de Pico
# locust -f pruebas_locust_projects.py --host http://192.168.59.107:31648 -u 500 -r 100 --run-time 5m
# locust -f pruebas_locust_tasks.py --host http://192.168.59.107:31648 -u 500 -r 100 --run-time 5m
# 4. Pruebas de Soak
# locust -f pruebas_locust_projects.py --host http://192.168.59.107:31648 -u 200 -r 10 --run-time 24h
# locust -f pruebas_locust_tasks.py --host http://192.168.59.107:31648 -u 200 -r 10 --run-time 24h

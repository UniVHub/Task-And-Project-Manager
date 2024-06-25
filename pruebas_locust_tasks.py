from locust import HttpUser, task, between, SequentialTaskSet
import itertools

# Contador global para generar nombres únicos de proyectos
id_project = 4
id_first_task = 54 # Debe ser el número donde va el contador de id de la base de datos
project_counter = itertools.count(id_first_task)

class ProjectTasks(SequentialTaskSet):

    def on_start(self):
        """ Esta función se ejecuta al inicio de cada usuario para crear su propia tarea """
        task_id = next(project_counter)
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


# locust -f pruebas_locust_tasks.py --host http://192.168.59.107:31648 -u 50 -r 5 --run-time 3m
# http://192.168.59.107:31648 es la URL del back de la aplicación
# -u 50: 50 usuarios concurrentes
# -r 5: 5 usuarios por segundo
# --run-time 1m: tiempo de ejecución de 3 minuto
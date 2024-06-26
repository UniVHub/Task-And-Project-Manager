import requests
from constants import server_url

# Función para crear un proyecto
def create_entity(path):
    entidad_data = {
        "name": "Initial Test Project",
        "description": "Description of Initial Test Project"
    }
    try:
        response = requests.post(f"{server_url}/{path}", json=entidad_data)
        response.raise_for_status()  # Esto lanzará una excepción si el código de estado no es 200
    except requests.RequestException as e:
        print(f"Error al crear el entidad: {e}")
        raise

# Obtener el último ID de tarea creado antes de ejecutar las pruebas
def get_last_project_id(path):
    try:
        response = requests.get(f"{server_url}/{path}")
        response.raise_for_status()  # Esto lanzará una excepción si el código de estado no es 200
        last_id = int(response.text)
        return last_id
    except requests.RequestException as e:
        print(f"Error en la solicitud: {e}")
        raise
    except ValueError as e:
        print(f"Error en el valor: {e}")
        raise
    
def delete_entity(project_id, path):
    try:
        response = requests.delete(f"{server_url}/{path}/{project_id}")
        response.raise_for_status()  # Esto lanzará una excepción si el código de estado no es 200
    except requests.RequestException as e:
        print(f"Error al eliminar el proyecto: {e}")
        raise

def execute_functions(path_create_entity, path_last_created_id, path_delete_entity):
    # Inicializar el contador global con el último ID más uno
    try:
        create_entity(path_create_entity)
        project_id = get_last_project_id(path_last_created_id)
        delete_entity(str(project_id), path_delete_entity)
        return project_id
    except Exception as e:
        print(f"No se pudo inicializar el contador de proyectos: {e}")
from constants import server_url
import subprocess
import sys

# Agregar una función principal
def main(test_file):
    command = [
        "locust",
        "-f", test_file,
        "--host", f"{server_url}",
        "--users", "15",
        "-r", "3",
        "--run-time", "1m"
    ]
    subprocess.run(command)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python run_tests.py, debe proporcionar el archivo de pruebas locust como argumento")
        sys.exit(1)
    
    test_file = sys.argv[1]
    main(test_file)

# --host server_url es la URL del back de la aplicación
# -u 50: 50 usuarios concurrentes
# -r 5: 5 usuarios por segundo
# --run-time 1m: tiempo de ejecución de 3 minuto


# 1. Pruebas de carga con Locust (Posibles valores)
# -u 100 -r 10 --run-time 10m
# -u 100 -r 10 --run-time 10m
# 2. Pruebas de Estrés con Locust
# -u 1000 -r 50 --run-time 20m
# -u 1000 -r 50 --run-time 20m
# 3. Pruebas de Pico
# -u 500 -r 100 --run-time 5m
# -u 500 -r 100 --run-time 5m
# 4. Pruebas de Soak
# -u 200 -r 10 --run-time 24h
# -u 200 -r 10 --run-time 24h    
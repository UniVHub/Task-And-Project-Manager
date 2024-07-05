from constants import server_url
import subprocess
import sys

# Agregar una función principal
def main(test_file):
    command = [
        "locust",
        "-f", test_file,
        "--host", f"{server_url}",
        "--users", "100",
        "-r", "10",
        "--run-time", "2m"
    ]
    try:
        subprocess.run(command, timeout=1000)  
    except subprocess.TimeoutExpired:
        print("\nEl proceso ha excedido el tiempo límite.")
    except KeyboardInterrupt:
        print("\nEjecución interrumpida por el usuario. Limpiando y cerrando el programa.")
        sys.exit(0)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python run_tests.py, debe proporcionar el archivo de pruebas locust como argumento")
        sys.exit(1)
    
    test_file = sys.argv[1]
    main(test_file)


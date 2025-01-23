# Examen Segundo Parcial - Aplicaciones Móviles  

**Autores:**  
- Daniel Armas  
- Josué Merino  

## Descripción  
Este proyecto es parte del examen del segundo parcial de la materia **Aplicaciones Móviles**. Consiste en un **CRUD** implementado en una aplicación móvil desarrollada con **Flutter**, que interactúa con un backend en **Express**.  

El backend utiliza un **archivo JSON alojado en GitHub** como base de datos, que se actualiza cada vez que se realiza una operación del CRUD (Create, Read, Update, Delete). Para garantizar el acceso seguro al archivo JSON, se implementó el uso de un **Token de GitHub**.  

## Tecnologías Utilizadas  

### Frontend  
- **Flutter**  
  - Lenguaje: Dart  
  - Estructura: Modelo-Vista-Controlador (MVC)  

### Backend  
- **Node.js**  
  - Framework: Express  
  - Archivo JSON en GitHub para persistencia de datos  

### Integraciones  
- **GitHub API**:  
  - Token de acceso personal para gestionar el archivo JSON.  

## Funcionalidades  
1. **Crear**: Permite agregar un nuevo registro al archivo JSON en GitHub.  
2. **Leer**: Muestra todos los registros almacenados en el archivo JSON.  
3. **Actualizar**: Edita un registro existente en el archivo JSON.  
4. **Eliminar**: Borra un registro del archivo JSON.  

## Requisitos Previos  
1. Tener instalado:  
   - Flutter SDK  
   - Node.js y npm  
2. Clonar este repositorio:  
   ```bash
   git clone <[URL del repositorio](https://github.com/ejmerino/crud-verduras)>

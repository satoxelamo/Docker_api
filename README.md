# 🌍 Proyecto: Consulta de Países con Análisis

Aplicación web full-stack que permite consultar información de países y registrar estadísticas de uso. Desarrollada con **React (frontend)**, **Laravel 12 (backend)** y **MariaDB (base de datos)**.

---

## 📑 Índice

1. [Tecnologías utilizadas](#-tecnologías-utilizadas)  
2. [Características del proyecto](#-características-del-proyecto)  
3. [Arquitectura del sistema](#-arquitectura-del-sistema)  
4. [Documentación API](#-documentación-api)  
5. [Instalación y despliegue](#-instalación-y-despliegue)  
6. [Licencia](#-licencia)

---

## 🛠 Tecnologías utilizadas

- **Frontend**: React, Axios
- **Backend**: Laravel 12
- **Base de datos**: MariaDB
- **Estilo**: CSS personalizado
---

## ✨ Características del proyecto

- Consulta de países por nombre, continente, idioma y población
- Registro automático de cada consulta (tipo, parámetro, IP, fecha)
- Interfaz clara y responsive

---

## 🧱 Arquitectura del sistema

```txt
[ Cliente React ]
       ↓ axios
[ API Laravel ]
       ↓ ORM
[ MariaDB ]

```
---
## Documentacion API
### POST
Registra las consultas

```
[ "tipo":"pais" ]
[ "parametro":"España" ]
```
### GET /estadisticas
Devuelve estadisticas de uso 

### GET /consultas 
Devuelve un listado completo de las búsquedas

---
## Instalación

1. Clona el repositorio
   
   ```
   
   git clone https://github.com/satoxelamo/Docker_api
   
   ```






















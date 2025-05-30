import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
/**
 * Singleton para manejar la API de países.
 * Utiliza el patrón Singleton para asegurar que solo haya una instancia de la API.
 * Permite obtener la lista de países y manejar errores de conexión.
 * Utiliza la API de restcountries.com para obtener datos de países.
 * @returns {Object} Instancia de la API con el método fetchCountries.
 * @example
 * const api = ApiSingleton.getInstance();
 * api.fetchCountries().then(countries => console.log(countries));
 * @throws {Error} Si hay un error al conectar con la API.
 * @throws {Error} Si hay un error al cargar los datos de países.
 * @description Este singleton se encarga de manejar la conexión a la API de países,
 * proporcionando un método para obtener la lista de países. Si hay un error al conectar
 * o al cargar los datos, se muestra un mensaje de alerta al usuario. 
 */
const ApiSingleton = (() => {
  /**
   * Instancia única de la API.
   * @type {Object}
   */
  let instance;
/**
 * 
 * @returns {Object} Instancia de la API con el método fetchCountries.
 * @description Crea una instancia de la API que permite obtener la lista de países.
 * Utiliza la API de restcountries.com para obtener datos de países.
 * Maneja errores de conexión y carga de datos, mostrando alertas al usuario.
 * @example
 * const api = ApiSingleton.getInstance();
 * api.fetchCountries().then(countries => console.log(countries));
 * @throws {Error} Si hay un error al conectar con la API.
 * @throws {Error} Si hay un error al cargar los datos de países.
 * @description Este singleton se encarga de manejar la conexión a la API de países,
 * proporcionando un método para obtener la lista de países. Si hay un error al conectar
 * o al cargar los datos, se muestra un mensaje de alerta al usuario.
 * @see https://restcountries.com/v3.1/all para más información sobre la API utilizada.
 */
  const createInstance = () => {
    const apiUrl = "https://restcountries.com/v3.1/all";
    const fetchCountries = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Error al conectar con la API");
        return await response.json();
      } catch (error) {
        alert("Error cargando datos: " + error.message);
        return [];
      }
    };
    return { fetchCountries };
  };
/**
 * Obtiene la instancia única de la API.
 * Si la instancia no existe, la crea.
 * @returns {Object} Instancia de la API con el método fetchCountries.
 * @description Este método asegura que solo haya una instancia de la API,
 * creando una nueva si no existe. Permite acceder a los métodos de la API de manera
 * controlada y evita la creación de múltiples instancias innecesarias. 
 */
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const LaravelAPI = (() => {
  let instance;
/**
 * 
 * @returns {Object} Instancia de la API de Laravel con métodos para registrar consultas y obtener estadísticas.
 * @description Crea una instancia de la API de Laravel que permite registrar consultas y obtener estadísticas.
 * Utiliza axios para realizar peticiones HTTP a un servidor Laravel.
 * Maneja errores de conexión y carga de datos, mostrando mensajes en la consola.
 */
  const createInstance = () => {
    const baseUrl = "http://localhost/api";
    
/**
 * 
 * @param {*} tipo 
 * @param {*} parametro 
 * @returns 
 * @description Registra una consulta en el servidor Laravel.
 * Envía una petición POST al endpoint /consultas con el tipo y parámetro de la consulta.
 * @throws {Error} Si hay un error al registrar la consulta, se muestra un mensaje en la consola.
 */
    const registrarConsulta = async (tipo, parametro) => {
      try {
        const response = await axios.post(`${baseUrl}/consultas`, {
          tipo,
          parametro
        });
        return response.data;
      } catch (error) {
        console.error("Fallo al registrar consulta:", error);
      }
    };
/**
 * 
 * @returns {Promise<Object>} Devuelve las estadísticas de consultas del servidor Laravel.
 * @description Obtiene las estadísticas de consultas desde el servidor Laravel.
 * Envía una petición GET al endpoint /estadisticas y devuelve los datos obtenidos.
 * @throws {Error} Si hay un error al obtener las estadísticas, se muestra un mensaje en la consola.
 */
    const obtenerEstadisticas = async () => {
      try {
        const response = await axios.get(`${baseUrl}/estadisticas`, {
        });
        return response.data;
      } catch (error) {
        console.error("Fallo al obtener estadísticas:", error);
        return null;
      }
    };

    return { registrarConsulta, obtenerEstadisticas };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
/**
 * 
 * @param {*} param0 
 * @returns 
 * @description Componente que representa una tarjeta de país.
 * Muestra la bandera, nombre, capital, población, continente e idiomas del país.
 */
const CountryCard = ({ country }) => (
  <div className="country-card">
    <img className="country-flag" src={country.flags.svg} alt={`Bandera de ${country.name.common}`} />
    <h3>{country.name.common}</h3>
    <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
    <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
    <p><strong>Continente:</strong> {country.continents[0]}</p>
    <p><strong>Idiomas:</strong> {Object.values(country.languages || {}).join(", ")}</p>
  </div>
);
/**
 * 
 * @returns {JSX.Element} Componente principal de la aplicación.
 * Maneja la carga de países, filtros y estadísticas.
 * Permite al usuario buscar países por nombre, continente, población e idioma.
 * Muestra los resultados filtrados y las estadísticas de consultas.
 * @description Este componente es el corazón de la aplicación, donde se gestionan los estados,
 * se aplican los filtros y se muestran los resultados. Utiliza hooks de React para manejar el estado
 * y los efectos secundarios, como la carga inicial de datos y la aplicación de filtros.
 * Utiliza el singleton ApiSingleton para obtener la lista de países y LaravelAPI para registrar consultas y obtener estadísticas.
 */
function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filters, setFilters] = useState({ name: "", continent: "", minPop: 0, maxPop: Infinity, lang: "" });
  const [stats, setStats] = useState(null);
/**
 * * Efecto para cargar los países al montar el componente.
 * * Utiliza el singleton ApiSingleton para obtener la lista de países.
 * * Almacena los países en el estado y los filtra inicialmente.
 * @description Este efecto se ejecuta una vez al montar el componente, cargando la lista de países desde la API.
 * * Si hay un error al cargar los datos, se muestra un mensaje de alerta al usuario.
 * * Utiliza el método fetchCountries del singleton ApiSingleton para obtener los datos.
 * @see ApiSingleton para más información sobre la API utilizada.
 */
  useEffect(() => {
    const loadCountries = async () => {
      const data = await ApiSingleton.getInstance().fetchCountries();
      setCountries(data);
      setFilteredCountries(data);
    };
    loadCountries();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };
/**
 * * Maneja el reinicio de los filtros.
 * * Resetea los filtros a sus valores por defecto y actualiza el estado de los países filtrados.
 * * @description Este método se llama cuando el usuario hace clic en el botón "Todos los países".
 * * Limpia los campos de entrada y restablece los filtros a sus valores iniciales.
 * * Actualiza el estado de los países filtrados para mostrar todos los países disponibles.
 * @see handleChange para más información sobre cómo se manejan los cambios en los filtros.
 * @param {Event} e - El evento de clic del botón.
 * @returns {void}
 * @description Este método se encarga de restablecer los filtros a sus valores por defecto,
 * permitiendo al usuario ver todos los países disponibles sin ningún filtro aplicado.
 * * Limpia los campos de entrada y actualiza el estado de los países filtrados para mostrar todos los países.
 */
  const handleReset = () => {
    setFilters({ name: "", continent: "", minPop: 0, maxPop: Infinity, lang: "" });
    document.getElementById("name").value = "";
    document.getElementById("continent").value = "";
    document.getElementById("minPop").value = "";
    document.getElementById("maxPop").value = "";
    document.getElementById("lang").value = "";
    setFilteredCountries(countries);
  };
/**
 * * Aplica los filtros seleccionados por el usuario a la lista de países.
 * * Filtra los países por nombre, continente, población e idioma.
 * * Registra la consulta en el servidor Laravel y actualiza las estadísticas.
 * @description Este método se llama cuando el usuario hace clic en el botón "Buscar".
 * * Filtra la lista de países según los criterios especificados en los filtros.
 * * Utiliza el estado de los filtros para determinar qué países mostrar.
 * * Registra la consulta en el servidor Laravel y actualiza las estadísticas de consultas.
 * @returns {Promise<void>} No devuelve nada, pero actualiza el estado de los países filtrados y las estadísticas.
 * @throws {Error} Si hay un error al registrar la consulta o al obtener las estadísticas, se muestra un mensaje en la consola.
 */
  const applyFilters = async () => {
    const filtered = countries.filter(c => {
      const nameMatch = filters.name ? c.name.common.toLowerCase().includes(filters.name.toLowerCase()) : true;
      const contMatch = filters.continent
        ? (
            filters.continent === "America"
              ? c.continents.includes("North America") || c.continents.includes("South America")
              : c.continents.includes(filters.continent)
          )
        : true;
      const pop = c.population || 0;
      const popMatch = pop >= (parseInt(filters.minPop) || 0) && pop <= (parseInt(filters.maxPop) || Infinity);
      const langMatch = filters.lang
        ? Object.values(c.languages || {}).some(l => l.toLowerCase().includes(filters.lang.toLowerCase()))
        : true;
      return nameMatch && contMatch && popMatch && langMatch;
    });

    let tipo = "global";
    let parametro = "todos";

    if (filters.name) {
      tipo = "pais";
      parametro = filters.name;
    } else if (filters.continent) {
      tipo = "continente";
      parametro = filters.continent;
    } else if (filters.lang) {
      tipo = "idioma";
      parametro = filters.lang;
    } else if (filters.minPop || filters.maxPop) {
      tipo = "poblacion";
      if (filters.minPop && filters.maxPop) {
        parametro = `${filters.minPop}-${filters.maxPop}`;
      } else if (filters.minPop) {
        parametro = `>${filters.minPop}`;
      } else if (filters.maxPop) {
        parametro = `<${filters.maxPop}`;
      }
    }

    await LaravelAPI.getInstance().registrarConsulta(tipo, parametro);

    setFilteredCountries(filtered);
    const estadisticas = await LaravelAPI.getInstance().obtenerEstadisticas();
    setStats(estadisticas);
  };
/**
 * Renderiza la aplicación principal.
 * Incluye un encabezado, controles para filtros, una sección de resultados y estadísticas.
 * Muestra tarjetas de países filtrados y estadísticas de consultas.
 * @returns {JSX.Element} Componente principal de la aplicación.
 * @description Este componente es el punto de entrada de la aplicación, donde se renderizan todos los elementos  de la interfaz de usuario.
 * Utiliza el estado para manejar los países, los filtros y las estadísticas, y proporciona una interfaz interactiva para el usuario.
 * Permite buscar países por nombre, continente, población e idioma, y muestra los resultados filtrados junto con las estadísticas de consultas.
 */
  return (
    <div className="app-container">
      <header>
        <h1>🌎 Consulta de Países</h1>
        <p>Explora la información de todos los países del mundo</p>
      </header>
      <section className="controls-filters">
        <input id="name" type="text" placeholder="Nombre del país" onChange={handleChange} />
        <select id="continent" onChange={handleChange}>
          <option value="">Todos los continentes</option>
          <option value="Africa">África</option>
          <option value="America">América</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>
        <input id="minPop" type="number" placeholder="Población mínima" onChange={handleChange} />
        <input id="maxPop" type="number" placeholder="Población máxima" onChange={handleChange} />
        <input id="lang" type="text" placeholder="Idioma (ej: Spanish)" onChange={handleChange} />
        <button className="main-btn" onClick={applyFilters}>Buscar</button>
        <button className="main-btn" onClick={handleReset}>Todos los paises</button>
      </section>
      <section className="results-container">
        {filteredCountries.map((country, i) => (
          <CountryCard key={i} country={country} />
        ))}
      </section>
      {stats && (
        <section className="results-container">
          <div className="country-card">
            <h3>Estadísticas</h3>
            <p><strong>Consultas por tipo:</strong></p>
            <ul>
              {stats.total_por_tipo.map((item, i) => (
                <li key={i}>{item.tipo}: {item.total}</li>
              ))}
            </ul>
            <p><strong>Más consultado:</strong> {stats.mas_consultado?.parametro || "N/A"} ({stats.mas_consultado?.total || 0})</p>
            <p><strong>Consultas por día:</strong></p>
            <ul>
              {stats.por_dia.map((item, i) => (
                <li key={i}>{item.dia}: {item.total}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;

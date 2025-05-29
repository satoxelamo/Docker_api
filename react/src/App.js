import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const ApiSingleton = (() => {
  let instance;

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

  const createInstance = () => {
    const baseUrl = "http://192.168.0.101/api";
    const auth = {
      username: "admin",
      password: "secret"
    };

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

    const obtenerEstadisticas = async () => {
      try {
        const response = await axios.get(`${baseUrl}/estadisticas`, {
          auth
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

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filters, setFilters] = useState({ name: "", continent: "", minPop: 0, maxPop: Infinity, lang: "" });
  const [stats, setStats] = useState(null);

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

  const handleReset = () => {
    setFilters({ name: "", continent: "", minPop: 0, maxPop: Infinity, lang: "" });
    document.getElementById("name").value = "";
    document.getElementById("continent").value = "";
    document.getElementById("minPop").value = "";
    document.getElementById("maxPop").value = "";
    document.getElementById("lang").value = "";
    setFilteredCountries(countries);
  };

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

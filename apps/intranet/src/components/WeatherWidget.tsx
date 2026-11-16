import React, { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  city: string;
  timezone: string;
}

const DEFAULT_CITY = 'Luís Eduardo Magalhães';
const DEFAULT_LAT = -12.09;
const DEFAULT_LON = -45.79;

const WEATHER_ICONS: Record<number, string> = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌦️',
  55: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  71: '🌨️',
  73: '🌨️',
  75: '🌨️',
  80: '🌦️',
  81: '🌧️',
  82: '⛈️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
};

const WEATHER_LABELS: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Principalmente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Nevoeiro',
  48: 'Nevoeiro com geada',
  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa densa',
  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  71: 'Neve leve',
  73: 'Neve moderada',
  75: 'Neve forte',
  80: 'Pancadas leves',
  81: 'Pancadas moderadas',
  82: 'Pancadas fortes',
  95: 'Tempestade',
  96: 'Tempestade com granizo',
  99: 'Tempestade forte',
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
      );
      if (!res.ok) throw new Error('Falha ao buscar clima');
      const data = await res.json();
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        city: cityName,
        timezone: data.timezone,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar clima');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(DEFAULT_LAT, DEFAULT_LON, DEFAULT_CITY);
    const interval = setInterval(() => {
      if (weather) fetchWeather(DEFAULT_LAT, DEFAULT_LON, weather.city);
    }, 10 * 60 * 1000); // 10 min
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=1&language=pt&format=json`
      );
      if (!res.ok) throw new Error('Falha ao buscar cidade');
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setError('Cidade não encontrada');
        setSearching(false);
        return;
      }
      const result = data.results[0];
      const cityLabel = `${result.name}${result.admin1 ? `/${result.admin1}` : ''}`;
      await fetchWeather(result.latitude, result.longitude, cityLabel);
      setShowSearch(false);
      setSearchQuery('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na busca');
    } finally {
      setSearching(false);
    }
  };

  if (loading && !weather) {
    return <div className="intra-weather intra-weather--loading">Carregando clima…</div>;
  }

  if (error && !weather) {
    return <div className="intra-weather intra-weather--error">{error}</div>;
  }

  return (
    <div className="intra-weather">
      <button
        type="button"
        className="intra-weather__display"
        onClick={() => setShowSearch((s) => !s)}
        title="Clique para consultar outra cidade"
      >
        <span className="intra-weather__icon">
          {weather ? WEATHER_ICONS[weather.weatherCode] ?? '🌡️' : '🌡️'}
        </span>
        <div className="intra-weather__info">
          <span className="intra-weather__temp">{weather?.temperature ?? '--'}°C</span>
          <span className="intra-weather__city">{weather?.city ?? '—'}</span>
        </div>
      </button>

      {showSearch && (
        <div className="intra-weather__search">
          <form onSubmit={handleSearch} className="intra-weather__form">
            <input
              type="text"
              className="intra-weather__input"
              placeholder="Buscar cidade…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="intra-weather__search-btn"
              disabled={searching}
            >
              {searching ? '…' : '🔍'}
            </button>
          </form>
          {error && <div className="intra-weather__error-msg">{error}</div>}
          <button
            type="button"
            className="intra-weather__reset"
            onClick={() => {
              setShowSearch(false);
              setError(null);
              fetchWeather(DEFAULT_LAT, DEFAULT_LON, DEFAULT_CITY);
            }}
          >
            Voltar para Luís Eduardo Magalhães
          </button>
        </div>
      )}
    </div>
  );
}

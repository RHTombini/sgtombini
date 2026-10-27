export function VacationDashboardPage() {
  return (
    <div className="emp-page">
      <h1>Férias — painel</h1>
      <p>
        Os indicadores serão exibidos aqui quando o Worker `sgt-employees-api` expuser o
        endpoint de férias. Nesta fase, a página existe para reservar a rota e o layout.
      </p>

      <div className="emp-cards">
        {['A vencer', 'Próximas do limite', 'Vencidas (verificar)', 'Programadas', 'Pendentes de dados'].map((label) => (
          <div key={label} className="ds-card">
            <h3>{label}</h3>
            <p>—</p>
          </div>
        ))}
      </div>
    </div>
  );
}

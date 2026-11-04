import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tjkoywwwqknysdccwzvx.supabase.co', 'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2');

export function CalendarSection() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('intra_events').select('*').order('event_date', { ascending: true }).then(({ data }) => setEvents(data || []));
  }, []);

  return (
    <div className="intra-block">
      <h3 className="intra-block__title">CALENDÁRIO DE EVENTOS</h3>
      <p className="intra-block__desc">Fique por dentro das próximas datas importantes.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {events.length === 0 ? (
          <div className="intra-event-card" style={{ borderLeftColor: '#65A70A' }}>
            <div className="intra-event-card__date">
              <span>15</span>
              <span>NOV</span>
            </div>
            <div className="intra-event-card__info">
              <strong>Reunião Geral</strong>
              <span>Apresentação dos resultados do trimestre.</span>
            </div>
          </div>
        ) : (
          events.map(ev => {
            const date = new Date(ev.event_date);
            return (
              <div key={ev.id} className="intra-event-card">
                <div className="intra-event-card__date">
                  <span>{date.getUTCDate()}</span>
                  <span>{date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase()}</span>
                </div>
                <div className="intra-event-card__info">
                  <strong>{ev.title}</strong>
                  <span>{ev.description}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

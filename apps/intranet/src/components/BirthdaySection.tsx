import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

export function BirthdaySection() {
  const [birthdays, setBirthdays] = useState<any[]>([]);
  const currentMonth = new Date().getMonth() + 1; // 1 a 12

  useEffect(() => {
    // Busca funcionários ativos e filtra pelo mês de nascimento no frontend
    // (Em um sistema maior, isso seria uma função SQL específica)
    supabase.from('emp_employees').select('full_name, birth_date').eq('status', 'active')
      .then(({ data }) => {
        if (data) {
          const filtered = data
            .filter(emp => {
              if (!emp.birth_date) return false;
              const month = new Date(emp.birth_date).getUTCMonth() + 1;
              return month === currentMonth;
            })
            .map(emp => ({
              name: emp.full_name.split(' ')[0], // Pega só o primeiro nome
              day: new Date(emp.birth_date).getUTCDate()
            }))
            .sort((a, b) => a.day - b.day);
          setBirthdays(filtered);
        }
      });
  }, [currentMonth]);

  return (
    <div className="intra-block">
      <div className="intra-block__header">
        <div className="intra-block__icon intra-block__icon--pink">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <div>
          <h3 className="intra-block__title">ANIVERSARIANTES DO MÊS</h3>
          <p className="intra-block__desc">Celebramos a vida de quem faz parte da nossa história.</p>
        </div>
      </div>

      <ul className="intra-birthdays" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {birthdays.length === 0 ? (
          <li style={{ gridColumn: 'span 2', fontSize: 13, color: '#6E6869' }}>Nenhum aniversariante este mês.</li>
        ) : (
          birthdays.map((b, i) => (
            <li key={i} className="intra-birthday" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#FFF5F8', borderRadius: 8, fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: '#E94F87' }}>{String(b.day).padStart(2, '0')}</span>
              <span style={{ color: '#4F484A', fontWeight: 500 }}>{b.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

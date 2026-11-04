import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co', 
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

interface Employee {
  full_name: string;
  birth_date: string;
}

export function BirthdaySection() {
  const [birthdays, setBirthdays] = useState<any[]>([]);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    supabase.from('emp_employees').select('full_name, birth_date').eq('status', 'active')
      .then(({ data }) => {
        if (data) {
          const employees = data as Employee[];
          const filtered = employees
            .filter((emp) => {
              if (!emp.birth_date) return false;
              const month = new Date(emp.birth_date).getUTCMonth() + 1;
              return month === currentMonth;
            })
            .map((emp) => ({
              name: emp.full_name.split(' ')[0],
              day: new Date(emp.birth_date).getUTCDate()
            }))
            .sort((a, b) => a.day - b.day);
          setBirthdays(filtered);
        }
      });
  }, [currentMonth]);

  return (
    <div className="intra-block">
      <h3 className="intra-block__title">CELEBRANDO A VIDA</h3>
      <p className="intra-block__desc">
        Celebramos as histórias e as conexões que construímos todos os dias. 
        Desejamos a todos que celebram mais um ciclo, muita saúde, paz e realizações!
      </p>

      <div className="intra-birthdays-carousel">
        {birthdays.length === 0 ? (
          <p style={{ fontSize: 13, color: '#6E6869' }}>Nenhum aniversariante este mês.</p>
        ) : (
          birthdays.map((b, i) => (
            <div key={i} className="intra-birthday-card">
              <span className="intra-birthday-card__day">{String(b.day).padStart(2, '0')}</span>
              <span className="intra-birthday-card__name">{b.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

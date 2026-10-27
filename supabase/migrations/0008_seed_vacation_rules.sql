-- 0008 — Seed inicial de regras de férias
-- ATENÇÃO: valores provisórios. Validar com o Departamento Pessoal
-- antes de usar em cálculo real.

insert into public.emp_vacation_rules
  (source, version, valid_from, valid_to, accrual_months, concessive_months, alert_days_before, active)
values
  ('CLT', 'v1-provisorio', '1943-05-01', null, 12, 12, 90, true)
on conflict (source, version) do nothing;

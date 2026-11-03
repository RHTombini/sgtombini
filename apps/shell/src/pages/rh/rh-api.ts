import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tjkoywwwqknysdccwzvx.supabase.co',
  'sb_publishable_h7GUSrDnqPziAmzUDJf6Lw_7NrE1zT2'
);

// API de Atestados
export const medicalCertificatesApi = {
  async list() {
    const { data, error } = await supabase
      .from('rh_medical_certificates')
      .select('*')
      .order('certificate_date', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },
  async create(certificate: any) {
    const { data, error } = await supabase
      .from('rh_medical_certificates')
      .insert([certificate])
      .select();
    if (error) throw new Error(error.message);
    return data;
  }
};

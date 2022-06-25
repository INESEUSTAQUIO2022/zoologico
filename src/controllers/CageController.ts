import sql from './../config/db';

import Caretaker from './../types/Caretaker';
import Cage, { parseCage } from './../types/Cage';

export const getCageByCode = async (code: string): Promise<Cage> => {
  const response = await sql`
    SELECT * FROM jaula WHERE codigo LIKE ${code};
  `;

  const cages = response.map(async (jsonObject) => await parseCage(jsonObject));

  return cages[0];
}

export const getCagesByCaretaker = async (caretaker: Caretaker): Promise<Cage[]> => {
  const response = await sql`
    SELECT jaula.codigo, jaula.area FROM jaula
      INNER JOIN jaula_zelador ON jaula.codigo = jaula_zelador.id_jaula
      INNER JOIN zelador ON zelador.matricula = jaula_zelador.id_zelador
      WHERE matricula LIKE ${caretaker.matriculation};
  `;

  const cages = response.map(async (jsonObject) => await parseCage(jsonObject));

  return await Promise.all(cages);
}
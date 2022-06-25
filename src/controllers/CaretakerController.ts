import sql from './../config/db';

import Species from './../types/Species';
import Caretaker, { parseCaretaker } from './../types/Caretaker';

export const getCaretakerByMatriculation = async (matriculation: string): Promise<Caretaker> => {
  const response = await sql`
    SELECT * FROM zelador WHERE matricula LIKE ${matriculation};
  `;

  const caretakers = response.map((jsonObject) => parseCaretaker(jsonObject));

  return caretakers[0];
}

export const getCaretakersBySpecies = async (species: Species): Promise<Caretaker[]> => {
  const response = await sql`
    SELECT zelador.matricula, zelador.nome, zelador.data_nascimento
      FROM zelador
      INNER JOIN jaula_zelador ON zelador.matricula = jaula_zelador.id_zelador
      INNER JOIN especime ON especime.id_jaula = jaula_zelador.id_jaula
      INNER JOIN especie ON especie.id = especime.id_especie
      WHERE especie.id = ${species.id}
      GROUP BY zelador.matricula;
  `;

  const caretakers = response.map((jsonObject) => parseCaretaker(jsonObject));

  return caretakers;
}

export const getCaretakersByCageCode = async (code: string): Promise<Caretaker[]> => {
  const response = await sql`
    SELECT zelador.matricula, zelador.nome, zelador.data_nascimento
      FROM zelador
      INNER JOIN jaula_zelador ON zelador.matricula = jaula_zelador.id_zelador
      WHERE id_jaula = ${code}
      GROUP BY zelador.matricula;
  `;
  
  const caretakers = response.map((jsonObject) => parseCaretaker(jsonObject));

  return caretakers;
}

export const getCaretakersBySpecimenId = async (specimenId: number): Promise<Caretaker[]>  => {
  const response = await sql`
    SELECT zelador.matricula, zelador.nome, zelador.data_nascimento
      FROM zelador
      INNER JOIN jaula_zelador ON zelador.matricula = jaula_zelador.id_zelador
      INNER JOIN especime ON jaula_zelador.id_jaula = especime.id_jaula
      WHERE especime.id = ${specimenId}
      GROUP BY zelador.matricula;
  `;
  
  const caretakers = response.map((jsonObject) => parseCaretaker(jsonObject));

  return caretakers;
}
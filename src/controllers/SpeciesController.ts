import sql from './../config/db';

import Species, { parseSpecies } from './../types/Species';

export const getSpeciesByHabitat = async (habitat: string): Promise<Species[]> => {
  const search = '%' + habitat + '%';

  const response = await sql`
    SELECT * FROM especie WHERE habitat ILIKE ${search};
  `;

  const species = response.map((jsonObject) => parseSpecies(jsonObject));

  return species;
}

export const getSpeciesByScientificName = async (scientificName: string): Promise<Species> => {
  const response = await sql`
    SELECT * FROM especie WHERE nome_cientifico ILIKE ${scientificName};
  `;

  const species = response.map((jsonObject) => parseSpecies(jsonObject));

  return species[0];
}

export const getSpeciesById = async (id: number): Promise<Species> => {
  const response = await sql`
    SELECT * FROM especie WHERE id = ${id};
  `;

  const species = response.map((jsonObject) => parseSpecies(jsonObject));

  return species[0];
}
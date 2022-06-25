import sql, { clearData, createTables, loadInitialData } from './config/db'

import {
  getCageByCode,
  getCagesByCaretaker
} from './controllers/CageController';

import {
  getCaretakersBySpecies,
  getCaretakerByMatriculation
} from './controllers/CaretakerController';

import {
  getSpeciesByHabitat,
  getSpeciesByScientificName
} from './controllers/SpeciesController';

import {
  getSpecimenByCage,
  getSpecimenBySpecies,
  getSpecimenByCaretaker
} from './controllers/SpecimenController';

const run = async () => {
  await createTables()
  await clearData()
  await loadInitialData()

  /**
   * Execute as funções responsáveis pelas consultas aqui!
   */
  let firstCage = await getCageByCode('00001');
  let cunhaAlvezJoao = await getCaretakerByMatriculation('12001'); 
  
  const especiesFlorestais = await getSpeciesByHabitat('floresta');
  const especieGato = await getSpeciesByScientificName('Felis silvestris catus');
  const gatos = await getSpecimenBySpecies(especieGato);
  const especimesPrimeiraJaula = await getSpecimenByCage(firstCage);
  const especimesCuidadosPeloJoao = await getSpecimenByCaretaker(cunhaAlvezJoao);
  const jaulasCuidadasPeloJoao = await getCagesByCaretaker(cunhaAlvezJoao);
  const zeladoresCuidadoresDeGatos = await getCaretakersBySpecies(especieGato);

  console.table(especiesFlorestais);
  console.table(especieGato);
  console.table(gatos);
  console.table(especimesPrimeiraJaula);
  console.table(especimesCuidadosPeloJoao);
  console.table(jaulasCuidadasPeloJoao);
  console.table(zeladoresCuidadoresDeGatos);
  /**
   * Fim das consultas
   */

  await sql.end()
  console.log('Mal feito desfeito')
}

run()

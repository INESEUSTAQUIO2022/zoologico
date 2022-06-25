import Species from './Species';
import Caretaker from './Caretaker';

import { getSpeciesById } from './../controllers/SpeciesController';
import { getCaretakersBySpecimenId } from './../controllers/CaretakerController';

type Specimen = {
  id?: number;
  serialNumber: number;
  surname: string;
  species: Species;
  caretakers: Caretaker[];
};

export const parseSpecimen = async (jsonObject) => {
  const { id, nro_de_serie, apelido, id_especie } = jsonObject;

  const species = await getSpeciesById(id_especie);
  const caretakers = await getCaretakersBySpecimenId(id);

  const specimen: Specimen = {
    id,
    serialNumber: nro_de_serie,
    surname: apelido,
    species,
    caretakers
  };

  return specimen;
}

export default Specimen;
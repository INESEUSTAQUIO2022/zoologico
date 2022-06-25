import Caretaker from './Caretaker';

import { getCaretakersByCageCode } from './../controllers/CaretakerController';

type Cage = {
  code: string;
  area: number;
  caretakers: Caretaker[]
};

export const parseCage = async (jsonObject: any): Promise<Cage> => {
  const { codigo, area } = jsonObject;

  const caretakers = await getCaretakersByCageCode(codigo);

  const cage: Cage = {
    code: codigo,
    area: parseFloat(area),
    caretakers
  };

  return cage;
}

export default Cage;
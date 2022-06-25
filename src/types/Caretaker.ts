type Caretaker = {
  matriculation: string;
  name: string;
  birthDate: Date;
};

export const parseCaretaker = (jsonObject: any) => {
  const { matricula, nome, data_nascimento } = jsonObject;

  const caretaker: Caretaker = {
    matriculation: matricula,
    name: nome,
    birthDate: data_nascimento
  };

  return caretaker;
}

export default Caretaker;
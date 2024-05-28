export type Curso = {
  id: number;
  usercourseid: number;
  name: string;
  description: string;
  cover: string;
  registrations: number;
  started: Date;
  registrationCanceled?: boolean;
  registered?: boolean;
};

export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  nascimento: Date;
};

export const UsurioMockup: Usuario[] = [
  {
    email: "teste@email.com",
    nascimento: new Date(1990, 4, 31),
    nome: "Jason McGaiver",
    senha: "1234"
  }
]

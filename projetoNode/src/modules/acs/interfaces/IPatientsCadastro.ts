import Patient from "../infra/database/schemas/Patient";

export interface ICreatePatientData {
  name: string;
  birthDate: Date;
  phone: number;
  susNumber: number;
  sex: string;
}

export default interface IPatientsCadastro {
  create({
    name,
    birthDate,
    phone,
    susNumber,
    sex,
  }: ICreatePatientData): Promise<Patient | undefined | null>;

  findByName(name: string): Promise<Patient | undefined | null>;
  findBySusNumber(susNumber: number): Promise<Patient | undefined | null>;
}

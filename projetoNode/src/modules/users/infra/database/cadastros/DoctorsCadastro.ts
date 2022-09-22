import IDoctorsCadastro, {
  ICreateDoctorData,
} from '@modules/users/interfaces/IDoctorsCadastro';
import { getRepository, IRepository } from 'fireorm';
import { MongoRepository, getMongoRepository } from 'typeorm';
import Doctor from '../schemas/Doctor';

class DoctorsCadastro implements IDoctorsCadastro {
  private ormRepository: MongoRepository<Doctor>;
  private static INSTANCE: DoctorsCadastro;

  constructor() {
    this.ormRepository = getMongoRepository(Doctor, 'mongo');
  }

  public static getInstance(): DoctorsCadastro {
    if (!DoctorsCadastro.INSTANCE) {
      DoctorsCadastro.INSTANCE = new DoctorsCadastro();
    }
    return DoctorsCadastro.INSTANCE;
  }

  public async findByName(name: string): Promise<Doctor | undefined | null> {
    const doctor = await this.ormRepository.findOne({ where: { name: name } });
    return doctor;
  }

  public async findByEmail(email: string): Promise<Doctor | undefined | null> {
    const doctor = await this.ormRepository.findOne({
      where: { email: email },
    });
    return doctor;
  }

  public async findAll(): Promise<string[] | undefined | null> {
    const doctors = await (
      await this.ormRepository.find()
    );

    return doctors.map(doctor => doctor.name);
  }

  public async create({ email, name }: ICreateDoctorData): Promise<Doctor> {
    const doctor = new Doctor();
    doctor.email = email;
    doctor.name = name;

    await this.ormRepository.save(doctor);

    return doctor;
  }
}

export default DoctorsCadastro;

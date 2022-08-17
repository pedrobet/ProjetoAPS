import IDoctorsRepository, {
  ICreateDoctorData,
} from '@modules/users/repositories/IDoctorsRepository';
import { getRepository, IRepository } from 'fireorm';
import Doctor from '../schemas/Doctor';

class DoctorsRepository implements IDoctorsRepository {
  private fireOrm: IRepository<Doctor>;

  constructor() {
    this.fireOrm = getRepository(Doctor);
  }

  public async findByName(name: string): Promise<Doctor | undefined | null> {
    const doctor = await this.fireOrm.whereEqualTo('name', name).findOne();
    return doctor;
  }

  public async findByEmail(email: string): Promise<Doctor | undefined | null> {
    const doctor = await this.fireOrm.whereEqualTo('email', email).findOne();
    return doctor;
  }

  public async create({ email, name }: ICreateDoctorData): Promise<Doctor> {
    const doctor = new Doctor();
    doctor.email = email;
    doctor.name = name;

    await this.fireOrm.create(doctor);

    return doctor;
  }
}

export default DoctorsRepository;

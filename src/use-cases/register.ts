import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) { }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = this.usersRepository.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    const hashSaltRounds = 6;
    const password_hash = await hash(password, hashSaltRounds);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}

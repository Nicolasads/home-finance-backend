import { AppError } from "../errors/AppError.js";
import { userRepository } from "../repositories/user.repository.js";
import type { AuthUser, Session } from "../types/auth.js";
import { signToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";

const buildSession = (user: AuthUser): Session => ({
  user,
  token: signToken({ sub: user.id }),
});

const INVALID_CREDENTIALS = "E-mail ou senha inválidos";

export const authService = {
  async register({ name, email, password }: RegisterInput): Promise<Session> {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw AppError.conflict("Já existe uma conta com este e-mail");
    }

    const passwordHash = await hashPassword(password);
    const user = await userRepository.create({
      name,
      email,
      passwordHash,
    });
    return buildSession(user);
  },

  async login({ email, password }: LoginInput): Promise<Session> {
    const user = await userRepository.findByEmail(email);

    //realiza validação da senha e retorna se é valido ou não
    const hash =
      user?.passwordHash ??
      "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinv";
    const isValid = await comparePassword(password, hash);

    if (!user || !isValid) {
      throw AppError.unauthorized(INVALID_CREDENTIALS);
    }

    return buildSession({ id: user.id, name: user.name, email: user.email });
  },

  async getSessionUser(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) throw AppError.unauthorized();
    return user;
  },
};

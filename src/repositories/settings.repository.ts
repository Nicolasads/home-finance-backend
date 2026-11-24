import { prisma } from "../config/database.js";
import { UserSettings } from "../types/settings.js";

export const settingsRepository = {
  findByUserId: (userId: string) =>
    prisma.userSettings.findUnique({ where: { userId } }),

  upsert: (userId: string, data: UserSettings) =>
    prisma.userSettings.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    }),
};

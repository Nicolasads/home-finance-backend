import { settingsRepository } from "../repositories/settings.repository";
import { UserSettings } from "../types/settings";

const DEFAULT_SETTINGS: UserSettings = {
  emailNotifications: true,
  currency: "BRL",
};

export const settingsService = {
  async get(userId: string) {
    const settings = await settingsRepository.findByUserId(userId);
    return settings ?? DEFAULT_SETTINGS;
  },

  update: (userId: string, data: UserSettings) =>
    settingsRepository.upsert(userId, data),
};

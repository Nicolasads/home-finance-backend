export const DEFAULT_CATEGORIES = [
  { name: "Moradia", budget: 1800, colorKey: "blue", iconKey: "Home" },
  {
    name: "Alimentação",
    budget: 1000,
    colorKey: "emerald",
    iconKey: "Utensils",
  },
  { name: "Energia Elétrica", budget: 250, colorKey: "amber", iconKey: "Zap" },
  { name: "Água", budget: 120, colorKey: "cyan", iconKey: "Droplet" },
  {
    name: "Internet e Telefone",
    budget: 150,
    colorKey: "purple",
    iconKey: "Wifi",
  },
  { name: "Transporte", budget: 500, colorKey: "pink", iconKey: "Car" },
  { name: "Saúde", budget: 400, colorKey: "rose", iconKey: "HeartPulse" },
  { name: "Educação", budget: 350, colorKey: "teal", iconKey: "GraduationCap" },
  { name: "Lazer", budget: 400, colorKey: "indigo", iconKey: "Smile" },
  { name: "Assinaturas", budget: 150, colorKey: "orange", iconKey: "Tv" },
  { name: "Outros", budget: 200, colorKey: "slate", iconKey: "MoreHorizontal" },
] as const;

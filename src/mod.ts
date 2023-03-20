import { ISCFeature, upgradeMod } from "isaacscript-common";

const features = [ISCFeature.SAVE_DATA_MANAGER, ISCFeature.PAUSE] as const;
const modVanilla = RegisterMod("Companions", 1);
export const mod = upgradeMod(modVanilla, features);

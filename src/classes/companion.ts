import { FamiliarVariant } from "isaac-typescript-definitions";
import { ModFeature } from "isaacscript-common";
import { CompanionType } from "../enums/CompanionType";
import { mod } from "../mod";

export const companionTypeClassMap = new Map<CompanionType, Companion>();

export class Companion extends ModFeature {
  public familiar: FamiliarVariant;
  public pickupDialogFirstTime = "" as string | string[];
  public lostGamePickingUp = "" as string | string[];
  public wonGamePickingUp = "" as string | string[];

  constructor(companionType: CompanionType, familiarVariant: FamiliarVariant) {
    super(mod);
    this.familiar = familiarVariant;
    companionTypeClassMap.set(companionType, this);
  }
}

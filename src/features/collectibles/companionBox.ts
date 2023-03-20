import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { Callback, ModFeature } from "isaacscript-common";
import { CollectibleTypeCustom } from "../../enums/CollectibleTypeCustom";
import { CompanionType } from "../../enums/CompanionType";
import { addCompanion } from "../companionCore";

export class CompanionBox extends ModFeature {
  @Callback(ModCallback.POST_USE_ITEM, CollectibleTypeCustom.CompanionBox)
  useCompanionBox(
    _collectible: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
  ): { Remove: true; Discharge: true; ShowAnim: true } {
    addCompanion(player, CompanionType.GUPPY_JR);
    return { Remove: true, Discharge: true, ShowAnim: true };
  }
}

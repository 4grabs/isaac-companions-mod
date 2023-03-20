import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import {
  Callback,
  DefaultMap,
  mapGetPlayer,
  mapSetPlayer,
  ModFeature,
  PlayerIndex,
} from "isaacscript-common";
import { Companion, companionTypeClassMap } from "../classes/companion";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { CompanionType } from "../enums/CompanionType";
import { mod } from "../mod";
import { promptDialog } from "./dialog";

interface PersistentData {
  pickedUpFirstTime: boolean;
  wonGame: boolean;
  lostGame: boolean;
}

function newPersistentData(): PersistentData {
  return {
    pickedUpFirstTime: false,
    wonGame: false,
    lostGame: false,
  };
}

const v = {
  run: {
    playerCompanion: new Map<PlayerIndex, CompanionType>(),
  },
  persistent: {
    companionData: new DefaultMap<CompanionType, PersistentData>(
      newPersistentData,
    ),
  },
};

export function companionCoreInit(): void {
  mod.saveDataManager("companionCore", v);
}

export function addCompanion(
  player: EntityPlayer,
  companionType: CompanionType,
): void {
  const currentCompanion = mapGetPlayer(v.run.playerCompanion, player);

  if (currentCompanion !== undefined) {
    return;
  }

  mapSetPlayer(v.run.playerCompanion, player, companionType);

  const companion = getPlayerCompanion(player);

  player.AddCacheFlags(CacheFlag.FAMILIARS);
  player.EvaluateItems();

  if (companion === undefined) {
    return;
  }

  const companionData =
    v.persistent.companionData.getAndSetDefault(companionType);

  const playerName = player.GetName();

  if (!companionData.pickedUpFirstTime) {
    companionData.pickedUpFirstTime = true;
    promptDialog(playerName, companion.pickupDialogFirstTime);
  } else if (companionData.wonGame) {
    promptDialog(playerName, companion.wonGamePickingUp);
  } else {
    promptDialog(playerName, companion.lostGamePickingUp);
  }
}

export function getPlayerCompanion(
  player: EntityPlayer,
): Companion | undefined {
  const companionType = mapGetPlayer(v.run.playerCompanion, player);

  if (companionType === undefined) {
    return undefined;
  }

  return companionTypeClassMap.get(companionType);
}

export class CompanionCore extends ModFeature {
  @Callback(ModCallback.EVALUATE_CACHE, CacheFlag.FAMILIARS)
  evaluateFamiliars(player: EntityPlayer): void {
    const playerCompanion = getPlayerCompanion(player);

    if (playerCompanion !== undefined) {
      const collectibleRNG = player.GetCollectibleRNG(
        CollectibleTypeCustom.CompanionBox,
      );
      player.CheckFamiliar(playerCompanion.familiar, 1, collectibleRNG);
    }
  }

  @Callback(ModCallback.POST_GAME_END)
  gameEnd(gameOver: boolean): void {
    if (gameOver) {
      for (const companionData of v.persistent.companionData.values()) {
        companionData.lostGame = true;
        companionData.wonGame = false;
      }
    } else {
      for (const companionData of v.persistent.companionData.values()) {
        companionData.lostGame = false;
        companionData.wonGame = true;
      }
    }
  }
}

import { ButtonAction, ModCallback } from "isaac-typescript-definitions";
import {
  Callback,
  getScreenCenterPos,
  isActionTriggeredOnAnyInput,
  isString,
  KColorDefault,
  logError,
  ModFeature,
  repeat,
  sfxManager,
} from "isaacscript-common";
import { Companion } from "../classes/companion";
import { mod } from "../mod";

const TEXT_FRAME_DELAY = 1;

const v = {
  room: {
    speakingDialog: [] as string[],
    speaking: false,
    currentDialogArrayIndex: 0,
    speakerName: "",
    currentDialogListArrayIndex: 0,
    currentDialogStringIndex: 0,
    framesUntilNextText: 0,
    speakingCompanion: undefined as Companion | undefined,
  },
};

export function dialogInit(): void {
  mod.saveDataManager("dialog", v);
}

const dialogFont = Font();
dialogFont.Load("font/terminus.fnt");

export function promptDialog(name: string, dialog: string | string[]): void {
  if (v.room.speaking) {
    return;
  }

  let dialogToUse: string[];

  if (isString(dialog)) {
    dialogToUse = [dialog];
  } else {
    dialogToUse = dialog;
  }

  v.room.speaking = true;
  v.room.currentDialogArrayIndex = 0;
  v.room.currentDialogStringIndex = 0;
  v.room.speakingDialog = dialogToUse;
  v.room.framesUntilNextText = 0;
  v.room.currentDialogListArrayIndex = 0;
  v.room.speakerName = name;
  mod.pause();
  sfxManager.Play(Isaac.GetSoundIdByName("Michael"), 2);
}

export class Dialog extends ModFeature {
  @Callback(ModCallback.POST_RENDER)
  render(): void {
    if (!v.room.speaking) {
      return;
    }

    const dialogToRender =
      v.room.speakingDialog[v.room.currentDialogListArrayIndex];

    if (dialogToRender === undefined) {
      return logError("Dialog is undefined!");
    }

    const substitutedDialog = dialogToRender.replaceAll(
      "%name",
      v.room.speakerName,
    );
    const splitDialog = substitutedDialog.split("%n");
    const centerPositionX = getScreenCenterPos().X;

    repeat(v.room.currentDialogArrayIndex + 1, (i: number) => {
      const dialog = splitDialog[i];

      if (dialog === undefined) {
        return;
      }

      let textToRender: string;

      if (
        (i === 0 && v.room.currentDialogArrayIndex === 1) ||
        v.room.currentDialogArrayIndex < i
      ) {
        textToRender = dialog;
      } else {
        textToRender = dialog.substring(0, v.room.currentDialogStringIndex);
      }

      const renderPositionY = 200 + i * 10;

      dialogFont.DrawStringScaled(
        textToRender,
        centerPositionX / 2,
        renderPositionY,
        0.5,
        0.5,
        KColorDefault,
        0,
        false,
      );

      if (isActionTriggeredOnAnyInput(ButtonAction.DROP)) {
        v.room.currentDialogStringIndex = 0;
        v.room.currentDialogArrayIndex = 0;

        if (
          v.room.speakingDialog[v.room.currentDialogListArrayIndex + 1] ===
          undefined
        ) {
          mod.unpause();
          v.room.currentDialogListArrayIndex = 0;
          v.room.speaking = false;
        } else {
          sfxManager.Play(Isaac.GetSoundIdByName("Michael"), 2);
          v.room.currentDialogListArrayIndex++;
        }
        return;
      }

      if (v.room.currentDialogStringIndex < dialog.length) {
        v.room.currentDialogStringIndex++;
        v.room.framesUntilNextText = TEXT_FRAME_DELAY;
      } else if (
        splitDialog[v.room.currentDialogArrayIndex + 1] !== undefined
      ) {
        v.room.currentDialogStringIndex = 0;
        v.room.currentDialogArrayIndex++;
      }
    });
  }
}

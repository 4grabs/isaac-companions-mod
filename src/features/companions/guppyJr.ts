import { FamiliarVariant } from "isaac-typescript-definitions";
import { Companion } from "../../classes/companion";
import { CompanionType } from "../../enums/CompanionType";

export function guppyJrInit(): void {
  const guppyJr = new Companion(
    CompanionType.GUPPY_JR,
    FamiliarVariant.DEAD_CAT,
  );
  guppyJr.pickupDialogFirstTime = [
    "Why, I am surprised that you found me.%nI have been waiting in this dying memory for so long...",
    "Allow me to introduce myself,%nI am Charlie and I have been roaming the barren basement for quite some time.",
    "I am aching to know your name, dear benefactor.",
    "...",
    "%name, I see...%nI am very curious to see what this journey shall entail.",
  ];
  guppyJr.lostGamePickingUp = [
    "I see you took quite a beating there, %name",
    "But, that does not matter. It appears that we are stuck in a loop.",
    "Nothing was lost except for our time, which was not a big sacrifice",
  ];
  guppyJr.lostGamePickingUp = [
    "Glad to see you came back,",
    "But... was this all for nothing? We seem to be back here",
    "Very, interesting.",
  ];
}

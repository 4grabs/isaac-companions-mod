import { CompanionBox } from "./features/collectibles/companionBox";
import { CompanionCore, companionCoreInit } from "./features/companionCore";
import { guppyJrInit } from "./features/companions/guppyJr";
import { Dialog, dialogInit } from "./features/dialog";
import { mod } from "./mod";

main();

function main() {
  companionCoreInit();
  guppyJrInit();
  dialogInit();

  new CompanionBox(mod);
  new CompanionCore(mod);
  new Dialog(mod);
}

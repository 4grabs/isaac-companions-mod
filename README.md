# Companions

Companions is a cancelled mod for _[The Binding of Isaac: Repentance](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/)_, written in [TypeScript](https://www.typescriptlang.org/) using the [IsaacScript](https://isaacscript.github.io/) framework.\

This would've added a special type of familiar known as a companion. Companions provide a unique passive effect, automatically attack enemies, and have an ability that can be activated by the player.

Furthermore, companions can be interacted with and give out dialog which is influenced by many different factors, such as if the player has gotten the companion for the first time, dying in a run and getting the companion in the next run, what items the player has, and so on.

Companions were planned to be obtainable through purchasing a special item in the shop which is always available, which allows you to pick the companion you want to spawn. You may only have up to one companion per run.

### Contributing

This mod is not far into development and has been cancelled. If you wish to continue it, be aware of the horrible codebase filled with prototyping.

Furthermoe, this repository will not be maintained so you should fork this.

### How To Compile

If you are a developer, or the mod is not yet uploaded to the Steam Workshop, you can play the mod by compiling the TypeScript code into a "main.lua" file. Perform the following steps:

- Download and install [Node.js](https://nodejs.org/en/download/) (Windows Installer .msi, 64-bit).
- Download and install [Git](https://git-scm.com/download/win) (64-bit Git for Windows setup).
- Download (or clone) this repository:
  - Click on the "Code" button in the top-right-corner of this page.
  - Click on "Download ZIP".
- Unzip the zip file to a new directory.
- Open up the repository folder and double-click on the `run.sh` script. If prompted, choose to open it with Git for Windows. You will see a Git Bash terminal window open.
- The script might ask you some questions, like which save file that you use for testing.
- If the script is successful, you will see "Compilation successful." (You can continue to leave the terminal window open; it will monitor for changes in your project, and recompile if necessary.)
- Completely close Isaac if it is already open, and then open the game again, and the mod should be in the list of mods. You can now play or test the mod.

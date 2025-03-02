/// <reference types="../CTAutocomplete" />

import Dungeon from "../BloomCore/dungeons/Dungeon";

const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent");

const colorToCoords = {
    "Green": "49,44",
    "Red": "51,42",
    "Purple": "54,41",
    "Orange": "57,42",
    "Blue": "59,44"
};


// start of this taken from bloom
register(MouseEvent, (event) => {
    if (!World.isLoaded() || !Dungeon.inDungeon) return;

    const button = event.button;
    const state = event.buttonstate;

    // Only activate on a right click key press
    if (button !== 1 || !state) return;
    relic(event);
    if (Player.isSneaking()) icefill(event);
});

const icefill = (event) => {
    if (Player.getY() <= 68) return;
    if (World.getBlockAt(Math.floor(Player.getX()), Math.floor(Player.getY())-1, Math.floor(Player.getZ()))?.getState()  == "minecraft:ice") {
        cancel(event);
    } else if (World.getBlockAt(Math.floor(Player.getX()), Math.floor(Player.getY())-1, Math.floor(Player.getZ()))?.getState() == "minecraft:packed_ice" && (Player.lookingAt()?.getState() == "minecraft:stone[variant=smooth_andesite]" || Player.lookingAt()?.getState()?.includes("minecraft:cobblestone_wall") || Player.lookingAt()?.getState() == "minecraft:packed_ice")) {
        cancel(event);
    }
}

const relic = (event) => {
    let heldItemName = Player.getHeldItem()?.getName()?.removeFormatting()?.split(" ");

    if (heldItemName?.[0] !== "Corrupted" || heldItemName?.[2] !== "Relic") return;
  
    const block = Player.lookingAt();
    
    if (block?.type?.getName() !== "Cauldron" && block?.type?.getName() !== "Anvil") return;
  
    const blockCoords = `${Math.trunc(block.getX())},${Math.trunc(block.getZ())}`;
    if (colorToCoords[heldItemName[1]] !== blockCoords && !Player.isSneaking()) {
      cancel(event);
    }
}

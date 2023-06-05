// Auto-generated code. Do not edit.
namespace myImages {

    helpers._registerFactory("image", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "myTiles.transparency16":return img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`;
            case "myTiles.tile1":
            case "myTile":return img`
f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 
1 f d d d d d d d d d d d d d b 
1 f d d d d d d d d d d d d d b 
1 e f d d d b b b b b b b b b b 
1 e e f d d c c c c c c c c c c 
1 f e e d 1 c c c c c c c c c c 
1 f e e d 1 c c c c c c c c c c 
1 e f e d 1 c c c c c c c c c c 
1 e e f d 1 c c c c c c c c c c 
f e e e d 1 c c c c c c c c c c 
1 f e e d 1 c c c c c c c c c c 
1 f e e d d c c c c c c c c c c 
1 d f e e d d d d d d d d d d d 
1 d f f e e e e e e e e e e e e 
1 d d d e f f f f f f f f e e f 
b b b b f b b b b b b b b b f b 
`;
            case "myTiles.tile2":
            case "myTile0":return img`
d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 
1 d d d d d d d d d d d d d d b 
1 d d d d d d d d d d d d d d b 
b b b b b b b d d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
c c c c c c c b d d d d d d d b 
d d d d d d d b d d d d d d d b 
e e e e e e e e d d d d d d d b 
f f f f f e f f d d d d d d d b 
b b b b b f b b b b b b b b b b 
`;
            case "myTiles.tile3":
            case "myTile1":return img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
1 1 1 1 1 1 1 1 1 . . . . . . . 
e e e e e e e e e 1 . . . . . . 
e e f f f f f e e e 1 . . . . . 
e e f f f f f f e e e 1 . . . . 
e e e e e e e e e e e e . . . . 
e e f f f f f f f e e e . . . . 
e e f f f f f f f e e e . . . . 
e e e e e e e e e e e e . . . . 
e e f f f f f f e e e f . . . . 
e e f f f f f e e e f . . . . . 
e e e e e e e e e f . . . . . . 
f f f f f f f f f . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`;
            case "myTiles.tile4":
            case "myTile2":return img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 
. . . . . . 1 e e e e e e e e e 
. . . . . 1 e e e f f f f f e e 
. . . . 1 e e e f f f f f f e e 
. . . . e e e e e e e e e e e e 
. . . . e e e f f f f f f f e e 
. . . . e e e f f f f f f f e e 
. . . . e e e e e e e e e e e e 
. . . . f e e e f f f f f f e e 
. . . . . f e e e f f f f f e e 
. . . . . . f e e e e e e e e e 
. . . . . . . f f f f f f f f f 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`;
        }
        return null;
    })

    helpers._registerFactory("animation", function(name: string) {
        switch(helpers.stringTrim(name)) {

        }
        return null;
    })

    helpers._registerFactory("song", function(name: string) {
        switch(helpers.stringTrim(name)) {

        }
        return null;
    })

}
// Auto-generated code. Do not edit.

// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "cbland":
            case "级别1":return tiles.createTilemap(hex`100010000a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a020606060606060606050a0a0a0a0a0a070101010101010101090a0a0a0a0a0a070101010101010101090a0a0a0a0a0a070101010101010101090a0a0a0a0a0a070101010101010101090a0a0a0a0a0a070101010101010101090a0a0a0a0a0a070101010101010101090a0a0a0a0a0a070101010101010101090a0a0a0a0a0a040808080808080808030a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tilePath5,sprites.castle.tilePath1,sprites.castle.tilePath9,sprites.castle.tilePath7,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tilePath4,sprites.castle.tilePath8,sprites.castle.tilePath6,sprites.castle.tileGrass1], TileScale.Sixteen);
            case "homeInside":
            case "homeInside1":return tiles.createTilemap(hex`0a00080001030303030303030304020a0b0909090909090502090909090909090905020909090909090909050209090909090909090502090909090909090905060808080d0c0808080700000000000000000000`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouth1,sprites.dungeon.floorLight2,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4], TileScale.Sixteen);
            case "level":
            case "level1":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000001010101010100000500000000000101010303030301010000000000000001030303030303030301000000000000010401010103030303010000000000000001010000010303030100000000000000000101010103030301010000000000010101030303030303010100000001010303010303030303030100000000010303030303030303030301000000000101010103010101010301010000000001030303030100000101010000000000010303030301010000000000000000000101030203030101000000000000000000010103030303010101010000000000000001010101010101010100000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.stairLadder,sprites.dungeon.doorOpenNorth,sprites.dungeon.floorLight2,sprites.dungeon.stairSouth,sprites.dungeon.stairNorth], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return myTiles.transparency16;
            case "myTile":
            case "tile1":return myTiles.tile1;
            case "myTile0":
            case "tile2":return myTiles.tile2;
            case "myTile1":
            case "tile3":return myTiles.tile3;
            case "myTile2":
            case "tile4":return myTiles.tile4;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.

// 自动生成的代码。请勿编辑。
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparencyCBLInternal = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("cbl_tilemap", function(name: string) {
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
`, [myTiles.transparencyCBLInternal,sprites.castle.tilePath5,sprites.castle.tilePath1,sprites.castle.tilePath9,sprites.castle.tilePath7,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tilePath4,sprites.castle.tilePath8,sprites.castle.tilePath6,sprites.castle.tileGrass1], TileScale.Sixteen);
            case "homeInside":
            case "homeInside1":return tiles.createTilemap(hex`0a000800010303030303030303040209090909090909090502090909090909090905020909090909090909050209090909090909090502090909090909090905060808080b0a0808080700000000000000000000`, img`
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 . . 2 2 2 2 
. . . . . . . . . . 
`, [myTiles.transparencyCBLInternal,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouth1,sprites.dungeon.floorLight2,myTiles.tile3,myTiles.tile4], TileScale.Sixteen);
            case "shopInside":
            case "homeInside2":return tiles.createTilemap(hex`0a000800010303030303030303040209090909090909090502090909090909090905020c0c0c0c0c0c0c0c050209090909090909090502090909090909090905060808080b0a0808080700000000000000000000`, img`
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 . . 2 2 2 2 
. . . . . . . . . . 
`, [myTiles.transparencyCBLInternal,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouth1,sprites.dungeon.floorLight2,myTiles.tile3,myTiles.tile4,sprites.dungeon.stairLadder], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("cbl_tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparencyCBLInternal":return transparencyCBLInternal;
            case "myTile":
            case "tile1":return tile1;
            case "myTile0":
            case "tile2":return tile2;
            case "myTile1":
            case "tile3":return tile3;
            case "myTile2":
            case "tile4":return tile4;
        }
        return null;
    })

}
// 自动生成的代码。请勿编辑。

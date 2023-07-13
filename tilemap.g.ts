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
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);

    helpers._registerFactory("cbl_tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
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
            case "cbland":
            case "级别1":return tiles.createTilemap(hex`20001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020500000000000000000000000000000000000000000000000000000000000201010500000000000000000206060605000000000000000000000000000002010101010500000000000000070101010105000000000000000000000000000701010101090000000000000201010101010105000000000000000000000000040101010103000000000002010101010101010106050000000000000000000000040101030000000000020108080808080808080801060500000000000000000000070900000000000201030a0a0a0a0a0a0a0a0a040801060606060606060606060101060606060604030a0a0a0a0a0a0a0a0a0a0a0a0408080808080808080801010101010808080a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a04010101030a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0701030a0a0a0a0a0a0a020606060606060606050a0a0a0a0a0a02060606060601090a0a0a0a0a0a0a0a0701010101010101010106060606060601010101010101090a0a0a0a0a0a0a0a0701010101010101010108080808080808080808080808030a0a0a0a0a0a0a0a070101010101010101090a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a070101010101010101090a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a070101010101010101090a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a070101010101010101090a0a0a0a0a0a0c110c0c0a0a0a0a0a0a0a0a0a0a0a0a070101010101010101090c0c0c0c0c0c0b0f0b0b0c0a0a0a0a0a0a0a0a0a0a0a040808080808080808030b0b0b0b0b0d0d100d0b0b0c0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0d0d0d0d0d0a0a0a0a0d0d0b0c0c0c0c0c0c0c0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0d0d0d0d0d0d0b0b0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0e0a0a0a0a0a0a0a0d0d`, img`
22222222222222222222222222222222
2222222222222222222222222..22222
222222222222222222222222....2222
2222.....22222222222222......222
2222......2222222222222......222
222........222222222222......222
22...........22222222222....2222
2..............2222222222..22222
................................
................................
................................
................................
................................
................................
................................
................................
................................
................................
...................2.22.........
.............2222222.222........
.............2222222.2222.......
.............22222....2222222222
........................22222222
..............................22
`, [myTiles.transparencyCBLInternal,sprites.castle.tilePath5,sprites.castle.tilePath1,sprites.castle.tilePath9,sprites.castle.tilePath7,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tilePath4,sprites.castle.tilePath8,sprites.castle.tilePath6,sprites.castle.tileGrass1,myTiles.tile5,myTiles.tile6,myTiles.tile7,sprites.castle.tileGrass3,myTiles.tile8,myTiles.tile9,myTiles.tile10], TileScale.Sixteen);
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
            case "riverAll":
            case "tile5":return tile5;
            case "riverU0":
            case "tile6":return tile6;
            case "riverU":
            case "tile7":return tile7;
            case "myTile3":
            case "tile8":return tile8;
            case "myTile4":
            case "tile9":return tile9;
            case "myTile5":
            case "tile10":return tile10;
        }
        return null;
    })

}
// 自动生成的代码。请勿编辑。

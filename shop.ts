namespace SpriteKind {
    export const Buyer = SpriteKind.create()
    export const Seller = SpriteKind.create()
}
namespace shop {

    export function prepareShop() {

        cbland.registerRoom("shop", assets.cbl_image`shopImage`, assets.cbl_tilemap`shopInside`)

        cbland.addExit("shop", 4, 6, "village")
        cbland.addExit("shop", 5, 6, "village")

        cbland.didEnterRoom("shop", (player: Sprite, room: room.Room, entrance: string) => {
            let buyer = room.createSprite(img`
                . . . . . f f f f . . . . .
                . . . f f 5 5 5 5 f f . . .
                . . f 5 5 5 5 5 5 5 5 f . .
                . f 5 5 5 5 5 5 5 5 5 5 f .
                . f 5 5 5 d b b d 5 5 5 f .
                f 5 5 5 b 4 4 4 4 b 5 5 5 f
                f 5 5 c c 4 4 4 4 c c 5 5 f
                f b b f b f 4 4 f b f b b f
                f b b 4 1 f d d f 1 4 b b f
                . f b f d d d d d d f b f .
                . f e f e 4 4 4 4 e f e f .
                . e 4 f 6 9 9 9 9 6 f 4 e .
                . 4 d c 9 9 9 9 9 9 c d 4 .
                . 4 f b 3 b 3 b 3 b b f 4 .
                . . f f 3 b 3 b 3 3 f f . .
                . . . . f f b b f f . . . .
            `, SpriteKind.Buyer)
            tiles.placeOnTile(buyer, tiles.getTileLocation(4, 2))

            let buyerActionSprite = room.createSprite(img`
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            `, SpriteKind.Buyer)
            buyerActionSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(buyerActionSprite, tiles.getTileLocation(4, 4))


            let seller = room.createSprite(img`
                . . . . f f f f . . . . .
                . . f f f f f f f f . . .
                . f f f f f f c f f f . .
                f f f f f f c c f f f c .
                f f f c f f f f f f f c .
                c c c f f f e e f f c c .
                f f f f f e e f f c c f .
                f f f b f e e f b f f f .
                . f 4 1 f 4 4 f 1 4 f . .
                . f e 4 4 4 4 4 4 e f . .
                . f f f e e e e f f f . .
                f e f b 7 7 7 7 b f e f .
                e 4 f 7 7 7 7 7 7 f 4 e .
                e e f 6 6 6 6 6 6 f e e .
                . . . f f f f f f . . . .
                . . . f f . . f f . . . .
            `, SpriteKind.Seller)
            tiles.placeOnTile(seller, tiles.getTileLocation(7, 2))

            let sellerActionSprite = room.createSprite(img`
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
                5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            `, SpriteKind.Seller)
            sellerActionSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(sellerActionSprite, tiles.getTileLocation(7, 4))

            tiles.placeOnTile(player, tiles.getTileLocation(4, 5))
            controller.moveSprite(player)
        })


        sprites.onOverlap(SpriteKind.Player, SpriteKind.Buyer, (sprite:Sprite, othersprite:Sprite) => {
            if (controller.A.isPressed()) {
                story.startCutscene(()=>{
                    story.printCharacterText("今天要卖点什么？", "收购员")
                    let sellItems = cbland_info.openInventoryAndSelectMultiple()
                    let text = ""
                    for (let item of Object.keys(sellItems)) {
                        text += item + ":" + sellItems[item] + ", "
                    }
                    text = text.slice(0, -2)
                    story.printCharacterText("出售" + text, "收购员")

                    story.showPlayerChoices("是的", "再考虑一下")
                    if (story.checkLastAnswer("是的")) {
                        let coin = 0
                        for (let item of Object.keys(sellItems)) {
                            cbland_info.loseItem(item, sellItems[item])
                            coin += cbland_info.itemValue(item) * sellItems[item]
                        }
                        cbland_info.changeMoneyBy(coin)
                    }
                    story.cancelAllCutscenes()
                    pause(1000)
                })
                
            }
        })


    }

    
}
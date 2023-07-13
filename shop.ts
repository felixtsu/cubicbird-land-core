namespace SpriteKind {
    export const Buyer = SpriteKind.create()
    export const ToolSeller = SpriteKind.create()
    export const ItemSeller = SpriteKind.create()
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
            `)
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
            `)
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
            `, SpriteKind.ToolSeller)
            sellerActionSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(sellerActionSprite, tiles.getTileLocation(7, 4))



            let itemSeller = room.createSprite(img`
                . . . . b b b b . . . . . . . .
                . . . b 3 3 3 3 b b b b . . . .
                . . b b 3 3 3 3 3 1 1 b b c c .
                . . b 1 1 3 3 3 3 3 1 1 3 3 c c
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c
                . . c 3 3 3 3 3 3 3 c c c b b f
                . c 3 3 3 3 3 b b b b c c c b f
                c 3 3 3 3 b b d d d d d c c b f
                c 3 3 c b d d d d d d c d c c .
                f 3 c c c d d c d d d c d b c .
                f b c c c d d d c d d d d d f .
                f b c c c d d d d d b b b d f .
                f f b b c b d d d d d d d c . .
                . f f f f b c c d d d d f f . .
                . . f b d d b c c f f b b f f .
                . . f d d d b . . f f b b b f .
            `)
            tiles.placeOnTile(itemSeller, tiles.getTileLocation(1, 2))

            let itemSellerActionSprite = room.createSprite(img`
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
            `, SpriteKind.ItemSeller)
            itemSellerActionSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(itemSellerActionSprite, tiles.getTileLocation(1, 4))

            tiles.placeOnTile(player, tiles.getTileLocation(4, 5))
            controller.moveSprite(player)
        })


        sprites.onOverlap(SpriteKind.Player, SpriteKind.Buyer, (sprite:Sprite, othersprite:Sprite) => {
            if (controller.A.isPressed()) {
                story.startCutscene(()=>{
                    story.printCharacterText("今天要卖点什么？", "收购员")
                    let sellItems = cbland_info.openInventoryAndSelectMultiple()
                    if (Object.keys(sellItems).length > 0) {
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
                    }
                    pauseUntil(() => !controller.A.isPressed())
                    story.cancelAllCutscenes()
                })
                
            }
        })

        sprites.onOverlap(SpriteKind.Player, SpriteKind.ToolSeller, (sprite: Sprite, othersprite: Sprite) => {
            if (controller.A.isPressed()) {
                story.startCutscene(() => {
                    story.printCharacterText("需要什么工具吗？", "工具售卖员")
                    let toolToBuy = cbland_equipment.openAllMenu()
                    if (toolToBuy) {
                        let price = cbland_equipment.itemValue(toolToBuy)
                        if (price > cbland_info.money()) {
                            story.printCharacterText("你的钱不够", "工具售卖员")
                        } else {
                            story.printCharacterText(toolToBuy + "需要" + price + "个金币，可以吗？", "工具售卖员")
                            story.showPlayerChoices("是的", "再考虑一下")

                            if (story.checkLastAnswer("是的")) {
                                cbland_equipment.getItem(toolToBuy)
                                cbland_info.changeMoneyBy(-price)
                                story.printCharacterText("好的，已经帮你放到工具箱里", "工具售卖员")
                                story.printCharacterText("请从菜单里选择手里的工具", "工具售卖员")
                            }
                        }
                        
                    } else {
                        story.printCharacterText("好的期待你的下次光临", "工具售卖员")
                    }
                    

                    pauseUntil(() => !controller.A.isPressed())
                    story.cancelAllCutscenes()
                })

            }
        })

        sprites.onOverlap(SpriteKind.Player, SpriteKind.ItemSeller, (sprite: Sprite, othersprite: Sprite) => {
            if (controller.A.isPressed()) {
                // TODO 这里需要搞定买道具
                // 1. 列出从已经注册好的item里面 & 售价 （要加价卖）
                // 2. 选择以后，可以选择数量 （要几个呢？）
                // 3. 获得对应品
                story.startCutscene(() => {
                    story.printCharacterText("需要什么物品吗？", "物品售卖员")
                    let itemToBuy = cbland_info.listAllItemAndSelectSingle()
                    if (itemToBuy) {
                        let price = Math.floor(cbland_info.itemValue(itemToBuy) * 1.5)
                        story.printCharacterText("一个" + itemToBuy + "要" + price + "个金币\n要几个呢？", "物品售卖员")
                        let amount = game.askForNumber("")

                        if (amount * price > cbland_info.money()) {
                            story.printCharacterText("你的钱不够", "物品售卖员")
                        } else if (amount == 0) {
                            story.printCharacterText("好的期待你的下次光临", "物品售卖员")
                        } else {
                            story.printCharacterText(amount + "个" + itemToBuy + "\n需要" + amount*price + "个金币", "物品售卖员")
                            story.showPlayerChoices("替我包起来", "再考虑一下")

                            if (story.checkLastAnswer("替我包起来")) {
                                cbland_info.getItem(itemToBuy, amount)
                                cbland_info.changeMoneyBy(-amount * price )
                                story.printCharacterText("好的，已经帮你放到背包里了", "物品售卖员")
                            }
                        }
                    } else {
                        story.printCharacterText("好的期待你的下次光临", "物品售卖员")
                    }


                    pauseUntil(() => !controller.A.isPressed())
                    story.cancelAllCutscenes()
                })

            }
        })


    }

    
}
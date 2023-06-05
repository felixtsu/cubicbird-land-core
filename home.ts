namespace home {

    export function prepareHome() {

        cbland.registerRoom("home", assets.image`homeImage`, assets.tilemap`homeInside`)
        
        cbland.addExit("home", 4, 6, "village")
        cbland.addExit("home", 5, 6, "village")

        cbland.didEnterRoom("home", (player:Sprite, room:room.Room, entrance:string) => {

            let wardrobe = room.createSprite(assets.image`wardrobe`, SpriteKind.Wardrobe, true)
        
            if (cbland.readSavingDataBoolean('home', 'wardrobe_open')) {
                wardrobe.setImage(assets.image`wardrobe_open`)
            }
            tiles.placeOnTile(wardrobe, tiles.getTileLocation(7, 1))
            wardrobe.x += 8
            wardrobe.y -= 8
            
            tiles.placeOnTile(player, tiles.getTileLocation(4, 5))
            controller.moveSprite(player)
        })


        sprites.onOverlap(SpriteKind.Player, SpriteKind.Wardrobe, (sprite:Sprite, otherSprite:Sprite) => {
            otherSprite.say("A", 500)

            if (controller.A.isPressed()) {
                if (cbland.readSavingDataBoolean('home', 'wardrobe_open')) {
                    otherSprite.setImage(assets.image`wardrobe`)
                    cbland.writeSavingDataBoolean('home', 'wardrobe_open', false)
                } else {
                    game.splash("找到了一块钱")
                    cbland_info.changeMoneyBy(1)
                    otherSprite.setImage(assets.image`wardrobe_open`)
                    cbland.writeSavingDataBoolean('home', 'wardrobe_open', true)
                }
                pause(500)
            }
        })
    }
}
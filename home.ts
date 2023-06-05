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

            let test = room.createSprite(img`
                . . . . c c c b b b b b . . . .
                . . c c b 4 4 4 4 4 4 b b b . .
                . c c 4 4 4 4 4 5 4 4 4 4 b c .
                . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
                e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
                e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
                e b b 4 4 4 4 4 4 4 4 4 4 4 b e
                . e b 4 4 4 4 4 5 4 4 4 4 b e .
                8 7 e e b 4 4 4 4 4 4 b e e 6 8
                8 7 2 e e e e e e e e e e 2 7 8
                e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
                e c 6 7 6 6 7 7 7 6 6 7 6 c c e
                e b e 8 8 c c 8 8 c c c 8 e b e
                e e b e c c e e e e e c e b e e
                . e e b b 4 4 4 4 4 4 4 4 e e .
                . . . c c c c c e e e e e . . .
            `, SpriteKind.Food, true)
            tiles.placeOnTile(test, tiles.getTileLocation(7, 1))


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
                    otherSprite.setImage(assets.image`wardrobe_open`)
                    cbland.writeSavingDataBoolean('home', 'wardrobe_open', true)
                }
            }
            
        })

        sprites.onOverlap(SpriteKind.Food, SpriteKind.Wardrobe, (sprite: Sprite, otherSprite: Sprite) => {
            otherSprite.say("A", 500)

            if (controller.A.isPressed()) {
                if (cbland.readSavingDataBoolean('home', 'wardrobe_open')) {
                    otherSprite.setImage(assets.image`wardrobe`)
                    cbland.writeSavingDataBoolean('home', 'wardrobe_open', false)
                } else {
                    otherSprite.setImage(assets.image`wardrobe_open`)
                    cbland.writeSavingDataBoolean('home', 'wardrobe_open', true)
                }
            }

        })

        


    }
}
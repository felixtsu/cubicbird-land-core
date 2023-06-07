namespace SpriteKind {
    export const Wardrobe = SpriteKind.create()
    export const Bed = SpriteKind.create()
}

namespace home {

    export function prepareHome() {

        cbland.registerRoom("home", assets.image`homeImage`, assets.tilemap`homeInside`)
        
        cbland.addExit("home", 4, 6, "village")
        cbland.addExit("home", 5, 6, "village")

        cbland.didEnterRoom("home", (player:Sprite, room:room.Room, entrance:string) => {

            let wardrobe = cbland.createRoomSprite(assets.image`wardrobe`, SpriteKind.Wardrobe)
        
            if (cbland.readSavingDataBoolean('home', 'wardrobe_open')) {
                wardrobe.setImage(assets.image`wardrobe_open`)
            }
            tiles.placeOnTile(wardrobe, tiles.getTileLocation(7, 1))
            wardrobe.x += 8
            wardrobe.y -= 8

            let bed = cbland.createRoomSprite(assets.image`singleBed`, SpriteKind.Bed)        
            tiles.placeOnTile(bed, tiles.getTileLocation(1, 1))
            bed.y += 8
            
            tiles.placeOnTile(player, tiles.getTileLocation(4, 5))
            controller.moveSprite(player)
        })


        sprites.onOverlap(SpriteKind.Player, SpriteKind.Wardrobe, (sprite:Sprite, otherSprite:Sprite) => {
            otherSprite.sayText("A", 500)

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

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Bed, (sprite: Sprite, otherSprite: Sprite) => {
            otherSprite.sayText("消磨时间", 100)

            if (controller.A.isPressed()) {
                story.startCutscene(()=> {
                    controller.moveSprite(player, 0, 0)
                    story.printCharacterText("要睡到什么时候?")
                    story.showPlayerChoices("早上", "中午", "晚上", "不睡了")
                    if ("早上" == story.getLastAnswer()) {
                        cbland_info.fastForwardTo(6, 30)
                    } else if ("中午" == story.getLastAnswer()) {
                        cbland_info.fastForwardTo(12, 0)
                    } else if ("晚上" == story.getLastAnswer()) {
                        cbland_info.fastForwardTo(18, 30)
                    }
                    
                    controller.moveSprite(player)
                    pause(1000)
                    story.cancelAllCutscenes()
                })
                
            }
        })
    }
}
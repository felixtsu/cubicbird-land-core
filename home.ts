namespace home {

    export function prepareHome() {

        cbland.registerRoom("home", assets.image`homeImage`, assets.tilemap`homeInside`)
        cbland.addExit("home", 4, 6, "village")
        cbland.addExit("home", 5, 6, "village")

        cbland.didEnterRoom("home", (room:room.Room) => {
            
            room.createSprite(assets.image`wardrobe`, SpriteKind.Food, true)

        })


    }
}
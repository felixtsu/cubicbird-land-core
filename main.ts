let player = sprites.create(img`
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
`, SpriteKind.Player)
controller.moveSprite(player)
scene.cameraFollowSprite(player)
scene.setTileMapLevel(tilemap`cbland`)

prepareRooms()

function prepareRooms() {


    
}
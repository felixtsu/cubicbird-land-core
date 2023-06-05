namespace SpriteKind {
    export const _CommonRoomDummy = SpriteKind.create()
    export const Wardrobe = SpriteKind.create()
}
// 1. invoke all dlc registeration
function prepareRooms () {
    home.prepareHome()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player.say(cbland_info.currentDay())
    cbland_info.fastForwardTo(8, 0)
})
let player: Sprite = null
prepareRooms()
player = sprites.create(img`
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
player.z = scene.HUD_Z - 1
let villageRoom = new cbland.VillageRoom()
cbland_info.setMoneyTo(100)
cbland_info.setTime(1, 23, 50, 5000)
villageRoom.enterRoom(player)

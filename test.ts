// 这个地方真正的做到了dlc里面全局定义的overlap handler都拿过来
// main这里能做的就是，每次出发的时候，某个scene的东西完整的保存下来，然后在进入的时候还原这些handler，这样就ok了

// 1. invoke all dlc registeration
scene_util.captureRegisteringRoomScenes(()=>{
    function prepareRooms() {
        home.prepareHome()
        game.popScene()
    }
    prepareRooms()
})

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
player.z = scene.HUD_Z - 1

let villageRoom = new cbland.VillageRoom()
cbland_info.initHud()
cbland_info.setMoneyTo(cbland.readSavingDataNumber("GLOBAL", "money"))
cbland_info.setTime()


villageRoom.enterRoom(player)





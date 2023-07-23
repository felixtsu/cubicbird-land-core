namespace SpriteKind {
    export const _CommonRoomDummy = SpriteKind.create()
    export const _LandForSale = SpriteKind.create()
    export const Dog = SpriteKind.create()
    export const Bone = SpriteKind.create()
}

// 这个就是村庄的地方，村庄的地图和链接的房间都在这里控制
namespace cbland {

    class RoomLocation {
        constructor(public col : number, public row :number){}
    }

    export class VillageRoom extends room.AbstractRoom {

        _roomLocations: { [name: string]: RoomLocation} = {}

        _availableLocationForRooms = [
            new RoomLocation(5, 10),
            new RoomLocation(10, 10),
            new RoomLocation(7, 20),
            new RoomLocation(3, 14),
            new RoomLocation(20, 16),
            new RoomLocation(16, 11),
            new RoomLocation(12, 17),
            new RoomLocation(24, 4),
            new RoomLocation(27, 4)
        ]

        public constructor() {

            super('village')
            cbland_info.registerItem("骨头",assets.cbl_image`boneImage`, 1, false)
            
            // 这里要组装dlc
            this.placeCustomRooms()

        }

        private placeCustomRooms() {
            // 这个是expose给cbl-main里面用来组装不同插件的入口，或者说，这个地方应该是Village的初始化函数
            // 这个地方把村子里面的空地放好，然后就在特定的地方
            let currentRoomLocationIndex = 0
            cbland.forEachRoom((roomName: string, room: room.CommonRoom) => {
                let roomLocation = this._availableLocationForRooms.removeAt(0)
                this._roomLocations[roomName] = roomLocation
                this.addExitOnLocation(roomName, roomLocation.col, roomLocation.row + 1)
            })
        }

        protected roomTilemap(): tiles.TileMapData { return assets.cbl_tilemap`cbland`}

        protected didEnterRoom(entrance: string): void {

            scene.setBackgroundImage(assets.cbl_image`mountainViewDay`)
            controller.moveSprite(this.heroSprite)
            scene.cameraFollowSprite(this.heroSprite)

            let roomLocation = this._roomLocations[entrance]
            if (roomLocation) {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(roomLocation.col, roomLocation.row + 2))
            } else {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(5, 5))
            }
            

            let currentRoomLocationIndex = 0
            cbland.forEachRoom((roomName: string, room: room.CommonRoom) => {
                let roomSprite = createSprite(room.roomImage, SpriteKind._CommonRoomDummy, false)
                let roomLocation = this._roomLocations[roomName]
                tiles.placeOnTile(roomSprite, tiles.getTileLocation(roomLocation.col, roomLocation.row))
            })

            for (let locationForSale of this._availableLocationForRooms) {
                let locationForSaleSprite = createSprite(assets.cbl_image`forSale`, SpriteKind._LandForSale, false)
                tiles.placeOnTile(locationForSaleSprite, tiles.getTileLocation(locationForSale.col, locationForSale.row))
            }



            let dogSprite = createSprite(img`
                . . 4 4 4 . . . . 4 4 4 . . . .
                . 4 5 5 5 e . . e 5 5 5 4 . . .
                4 5 5 5 5 5 e e 5 5 5 5 5 4 . .
                4 5 5 4 4 5 5 5 5 4 4 5 5 4 . .
                e 5 4 4 5 5 5 5 5 5 4 4 5 e . .
                . e e 5 5 5 5 5 5 5 5 e e . . .
                . . e 5 f 5 5 5 5 f 5 e . . . .
                . . f 5 5 5 4 4 5 5 5 f . . f f
                . . f 4 5 5 f f 5 5 6 f . f 5 f
                . . . f 6 6 6 6 6 6 4 4 f 5 5 f
                . . . f 4 5 5 5 5 5 5 4 4 5 f .
                . . . f 5 5 5 5 5 4 5 5 f f . .
                . . . f 5 f f f 5 f f 5 f . . .
                . . . f f . . f f . . f f . . .
            `, SpriteKind.Dog, false)

            tiles.placeOnTile(dogSprite, tiles.getTileLocation(6, 4))


            sprites.onOverlap(SpriteKind.Player, SpriteKind.Dog, (sprite:Sprite, otherSprite:Sprite) => {
                if(controller.A.isPressed()) {
                    story.startCutscene(()=>{
                        story.printCharacterText("要喂它什么?")
                        let item = cbland_info.openInventoryAndSelectSingle()
                        if (item == "鸡蛋") {
                            otherSprite.say("wang")
                            let bone = createSprite(assets.cbl_image`boneImage`, SpriteKind.Bone, false)
                            bone.x = otherSprite.x
                            bone.y = otherSprite.y
                        } else {
                            
                        }
                        pauseUntil(()=>!controller.A.isPressed())
                        story.cancelAllCutscenes()
                    })
                }
            })
            sprites.onOverlap(SpriteKind.Player, SpriteKind._LandForSale, (sprite: Sprite, otherSprite: Sprite) => {
                otherSprite.sayText("等待开发...", 50)
            })
            
        }
    }

    let VILLAGE_INSTANCE : VillageRoom = null
    let player : Sprite = null

    export function _getVillageRoom() :VillageRoom{
        return VILLAGE_INSTANCE
    }

    //%group="Character"
    //%group.loc.zh-CN="角色"
    //%blockid=cbland_get_player_sprite block="player sprite"
    //%block.loc.zh-CN="玩家精灵"
    export function getPlayer() : Sprite {
        return player
    }

    //%group="Game"
    //%group.loc.zh-CN="游戏"
    //%blockid=cbland_start_village block="start village life"
    //%block.loc.zh-CN="开始乡村生活"
    export function startVillage(developementMode: boolean=true) {
        // if (developementMode) {
            prepareTitleScreen()
        // }


        if (developementMode) {
            scene_util.captureCurrentScene(cbland._getCurrentRoomInRegister())
        }
        
        scene_util.captureRegisteringRoomScenes(() => {
            home.prepareHome()
            game.popScene()
        })
        scene_util.captureRegisteringRoomScenes(() => {
            shop.prepareShop()
            game.popScene()
        })

        cbland_info.addInventoryMenu()
        cbland_equipment.addEquipmentMenu()


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
        player.z = scene.HUD_Z - 10

        VILLAGE_INSTANCE = new cbland.VillageRoom()

        
        
        let savedMoney = cbland.readSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "money")
        if (!savedMoney) {
            savedMoney = 0
        }
        cbland_info.setMoneyTo(savedMoney)
        cbland_info.setTime()

        cbland_info.initHud()


        _getVillageRoom().enterRoom(player)
    }

    function prepareTitleScreen() {
        game.pushScene()
        scene.setBackgroundImage(assets.cbl_image`titlescreen`)
        let finished = false;

        let newGameSprite = sprites.create(img`
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
            11111111111111111111111111111111111114441111111111111111111111111111111111111111
            11144441111114444414111111114111111144114441111111111111111111111111111144411111
            11141144111141111114111111114111111441111141111111111111444111111111114411111111
            11141114111441111114111141114111111411111111111111111114414411441111114111111111
            11441114111411111114111141114111111411111111111444441114111414444111144111111111
            11411114111444444114411441114111114111111111111411141144111414114411141111144111
            11411114111441441111411441114111114111111111111411144141111444111411144444441111
            11411114114411111111411444114111114111111114111444444441111141111441111144111111
            11411114114111111141411414141111114111111114111411114141111141111141111411111111
            11411114111441111441444414441111114111111114111411114141111141111144114111111111
            11411114111144444111111111111111114111111114111411111141111141111111114111111111
            11111111111111111111111111111111111444411144411111111111111141111111114444411111
            11111111111111111111111111111111111111144411411111111111111141111111111111111111
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
        `)
        let continueSprite = sprites.create(img`
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
            11111111144444111111111111111111111111111111111111111111111114111114444441111111
            11111111441114411111441111114411144444411411411111111114111114111114111111111111
            11111114111111111114414111141441111141111411141144441114111141111144111111111111
            11111114111111111144111441141144111141111411144441141114411141111141111111111111
            11111141111111111141111141141114111141111411114111141114111141111141111111111111
            11111141111111111141111114141114111141111411114111141114111141111144444444111111
            11111141111111111411111114141114111141111411114111141114111414111144111111111111
            11111144111111111441111141141114111141111411114111141114111414111141111111111111
            11111114411111111144414441144111411141111411114111141114144114111141111111111111
            11111111144444111111144111114111411141111411114111141114441114111144444444111111
            11111111111111111111111111111111111141111411111111111111111111411111111111111111
            11111111111111111111111111111111411111111111111111111111111111111111111111111111
            11111111111111111111111111111111111111111111111111111111111111111111111111111111
        `)
        continueSprite.y += 20
        let cursorSprite = sprites.create(img`
            22222222222222222222222222222222222222222222222222222222222222222222222222222222
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            2..............................................................................2
            22222222222222222222222222222222222222222222222222222222222222222222222222222222
        `)
    
        let currentSelection = 0

        controller.up.onEvent(ControllerButtonEvent.Pressed, ()=> {
            currentSelection == 0 ? currentSelection = 1 : currentSelection = 0
        })
        controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
            currentSelection == 0 ? currentSelection = 1 : currentSelection = 0
        })
        controller.A.onEvent(ControllerButtonEvent.Pressed, ()=>{
            pauseUntil(()=> !controller.A.isPressed())
            if (currentSelection == 0) {
                if (game.ask("删除存档?")) {
                    settings.clear()
                    newGameSprite.destroy()
                    continueSprite.destroy()
                    cursorSprite.destroy()
                    game.popScene()
                    finished = true
                }
            } else {
                newGameSprite.destroy()
                continueSprite.destroy()
                cursorSprite.destroy()
                game.popScene()
                finished = true
            }
        })

        while(!finished) {
            if (currentSelection == 0) {
                cursorSprite.y = 60
            } else {
                cursorSprite.y = 80
            }
            pause(10)
        }
        game.popScene()
        
        // pauseUntil(()=>finished)

    }

}
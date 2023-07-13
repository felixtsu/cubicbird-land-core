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

        
        cbland_info.initHud()
        let savedMoney = cbland.readSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "money")
        if (!savedMoney) {
            savedMoney = 0
        }
        cbland_info.setMoneyTo(savedMoney)
        cbland_info.setTime()


        _getVillageRoom().enterRoom(player)
    }

}
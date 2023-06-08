namespace SpriteKind {
    export const _CommonRoomDummy = SpriteKind.create()
}

// 这个就是村庄的地方，村庄的地图和链接的房间都在这里控制
namespace cbland {

    class RoomLocation {
        constructor(public col : number, public row :number){}
    }

    export class VillageRoom extends room.AbstractRoom {

        _roomLocations: { [name: string]: RoomLocation} = {}

        _availableLocationForRooms = [
            new RoomLocation(5, 2),
            new RoomLocation(8, 3),
            new RoomLocation(3, 6),
            new RoomLocation(8, 9)
        ]

        public constructor() {

            super('village')
            
            // 这里要组装dlc
            this.placeCustomRooms()

        }

        // 这个是expose给cbl-main里面用来组装不同插件的入口，或者说，这个地方应该是Village的初始化函数
        private placeCustomRooms() {
            let currentRoomLocationIndex = 0
            cbland.forEachRoom((roomName: string, room: room.CommonRoom) => {
                let roomLocation = this._availableLocationForRooms[currentRoomLocationIndex++]
                this._roomLocations[roomName] = roomLocation
                this.addExitOnLocation(roomName, roomLocation.col, roomLocation.row + 1)
            })
        }



        protected roomTilemap(): tiles.TileMapData { return tilemap`cbland` }

        protected didEnterRoom(entrance: string): void {
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

        }
    }

    let VILLAGE_INSTANCE : VillageRoom = null

    export function _getVillageRoom() :VillageRoom{
        return VILLAGE_INSTANCE
    }


    //%blockid=cbland_start_village block="start village life"
    //%block.loc.zh-CN="开始乡村生活"
    export function startVillage() {

        scene_util.captureRegisteringRoomScenes(() => {
            home.prepareHome()
            game.popScene()
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

        VILLAGE_INSTANCE = new cbland.VillageRoom()
        cbland_info.initHud()
        cbland_info.setMoneyTo(cbland.readSavingDataNumber("GLOBAL", "money"))
        cbland_info.setTime()


        _getVillageRoom().enterRoom(player)
    }

}
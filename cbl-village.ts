namespace SpriteKind {
    export const _CommonRoomDummy = SpriteKind.create()
}

// 这个就是村庄的地方，村庄的地图和链接的房间都在这里控制
namespace cbland {

    class RoomLocation {
        constructor(public col : number, public row :number){}
    }

    // const _roomLocations: { [roomName: string]: room.CommonRoom } = {
        
    // }

    export class VillageRoom extends room.AbstractRoom {

        _roomLocations = [
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
                let roomLocation = this._roomLocations[currentRoomLocationIndex++]
                this.addExitOnLocation(roomName, roomLocation.col, roomLocation.row + 1)
            })
        }



        protected roomTilemap(): tiles.TileMapData { return tilemap`cbland` }

        protected didEnterRoom(entrance: string): void {
            cbland_info.initHud()
            controller.moveSprite(player)
            tiles.placeOnTile(player, tiles.getTileLocation(5, 5))
            scene.cameraFollowSprite(player)


            let currentRoomLocationIndex = 0
            cbland.forEachRoom((roomName: string, room: room.CommonRoom) => {
                let roomSprite = createSprite(room.roomImage, SpriteKind._CommonRoomDummy, false)
                let roomLocation = this._roomLocations[currentRoomLocationIndex++]
                tiles.placeOnTile(roomSprite, tiles.getTileLocation(roomLocation.col, roomLocation.row))
            })

        }
    }

}
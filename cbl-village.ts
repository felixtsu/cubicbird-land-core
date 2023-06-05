// 这个就是村庄的地方，村庄的地图和链接的房间都在这里控制
namespace cbland {

    class RoomLocation {
        col: number
        row: number
    }

    const _roomLocations:{[roomName:string]:room.CommonRoom } = {

    }
    
    export class VillageRoom extends room.AbstractRoom {


        public constructor() {

            super('village')

            // 这里要组装dlc
            this.placeCustomRooms()


        }

        // 这个是expose给cbl-main里面用来组装不同插件的入口，或者说，这个地方应该是Village的初始化函数
        private placeCustomRooms() {
            cbland.forEachRoom((roomName: string, room: room.CommonRoom) => {
                villageRoom.addExitOnLocation(room.getRoomName(), 5,3)
            })
        }

                    

        protected roomTilemap(): tiles.TileMapData { return tilemap`cbland` }

        protected didEnterRoom(entrance: string): void {
            cbland_info.initHud()
            controller.moveSprite(player)
            tiles.placeOnTile(player, tiles.getTileLocation(5, 5))
            scene.cameraFollowSprite(player)


            cbland.forEachRoom((roomName: string, room: room.CommonRoom) => {
                let roomSprite = createSprite(room.roomImage, SpriteKind._CommonRoomDummy, false)
                tiles.placeOnTile(roomSprite, tiles.getTileLocation(5, 2))   
                villageRoom.addExitOnLocation(room.getRoomName(), 5,2)
            })

        }
    }  

}
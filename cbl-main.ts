// 在此处添加您的代码
namespace cbland {
    
    export class VillageRoom extends room.AbstractRoom {

        protected roomTilemap(): tiles.TileMapData { return tilemap`cbland` }

        protected didEnterRoom(entrance: string): void {
            cbland_info.initHud()
            controller.moveSprite(player)
            scene.cameraFollowSprite(player)
        }


        
    }
    

  

}
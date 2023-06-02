// 在此处添加您的代码
namespace cbland {


    let _currentRoomInRegister = null;

    function currentRoom(): room.Room {
        return room.currentRoom()
    }


    // ------ room life cycle begins ---------

    //%blocks
    export function registerRoom(roomName: string, roomImage : Image, tilemap: tiles.TileMapData) {
    }

    //%blocks
    export function willEnterRoom(roomName: string, callback: () => {}) {
        
    }

    //%blocks
    export function didEnterRoom(roomName: string, callback: () => {}) {
        
    }

    //%blocks
    export function willLeaveRoom(roomName: string, callback: () => {}) {
        
    }

    //%blocks
    export function didLeaveRoom(roomName: string, callback: () => {}) {
        
    }

    

    // ------ room life cycle ends ---------
 
    // -----  sprites begins ----------


    //%blocks
    export function roomSpriteOfKind(spriteKind: number) {
        
    }

    //%blocks
    export function createSprite(image: Image, spriteKind: number, stateful: boolean): Sprite {
        return currentRoom().createSprite(image, spriteKind, stateful);
        
    }


    // -----  sprites ends ----------


   



}
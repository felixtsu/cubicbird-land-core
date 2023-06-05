// 在此处添加您的代码
namespace cbland {


    let _currentRoomInRegister = null;

    
    function currentRoom(): room.Room {
        return room.currentRoom()
    }

    let roomSavingDataMap: {[key:string]:SavingData} = {}

    export class SavingData {

        private data: { [key: string]: any } = {};

        writeDataNumber(key: string, value: number) {
            this.data[key] = value
        }

        readDataNumber(key: string): number {
            return this.data[key]
        }

        writeDataBoolean(key: string, value: boolean) {
            this.data[key] = value
        }

        readDataBoolean(key: string) {
            return this.data[key]
        }

        writeDataString(key: string, value: string) {
            this.data[key] = value
        }

        readDataString(key: string) {
            return this.data[key]
        }
    }


    export function restoreFromSavingData(roomName: string, callback: (savingData: SavingData) => {}) {
    }


    export function writeToSavingData(roomName: string, callback: (savingData: SavingData) => {}) {
        let savingData = roomSavingDataMap[roomName]
        callback(savingData)

        



    }



    // ------ room life cycle begins ---------

    let rooms: { [name: string]: room.CommonRoom } = {}
    
    export function forEachRoom(callback: (roomName: string, room: room.CommonRoom) => void) {
        for (const name of Object.keys(rooms)) {
            callback(name, rooms[name])
        }
    }

    export function _getRoom(roomName: string): room.CommonRoom {
        return rooms[roomName]
    }
    //%blocks
    export function registerRoom(roomName: string, roomImage: Image, tilemap: tiles.TileMapData) {
        if (rooms[roomName] != null) {
            console.error("duplicate room name encountered:" + roomName)
        }
        let newRoom = new room.CommonRoom(roomName, roomImage, tilemap)
        rooms[roomName] = newRoom
    }

    //%blocks
    export function willEnterRoom(roomName: string, callback: () => void) {

    }

    //%blocks
    export function didEnterRoom(roomName: string, callback: (room:room.Room) => void) {

    }

    //%blocks
    export function willLeaveRoom(roomName: string, callback: () => void) {

    }

    //%blocks
    export function didLeaveRoom(roomName: string, callback: () => void) {

    }

    export function getCurrentRoomTilemap(roomName: string): tiles.TileMapData {
        return null
    }
    
    export function addExit(roomName: string, col: number, row: number, nextRoomName:string, waypointSignImage?:Image) {
        _getRoom(roomName).addExitOnLocation(nextRoomName, col, row,waypointSignImage)
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
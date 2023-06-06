// 在此处添加您的代码
namespace cbland {


    let _currentRoomInRegister :string= null;

    export function _getCurrentRoomInRegister() : string {
        return _currentRoomInRegister
    }

    
    export function currentRoom(): room.Room {
        return room.currentRoom()
    }

    

    export class SavingData {

        static SEPERATOR = "||";

        writeDataNumber(roomName:string, key: string, value: number) {
            
            settings.writeNumber(roomName + SavingData.SEPERATOR  + key, value)
        }

        readDataNumber(roomName: string, key: string): number {
            return settings.readNumber(roomName + SavingData.SEPERATOR + key)
        }

        writeDataBoolean(roomName: string, key: string, value: boolean) {
            settings.writeNumber(roomName + SavingData.SEPERATOR + key, value ? 1 : 0)
        }

        readDataBoolean(roomName: string, key: string) {
            return settings.readNumber(roomName + SavingData.SEPERATOR + key) == 1 ? true : false
        }

        writeDataString(roomName: string, key: string, value: string) {
            settings.writeString(roomName + SavingData.SEPERATOR + key, value)
        }

        readDataString(roomName: string, key: string) {
            return settings.readString(roomName + SavingData.SEPERATOR + key)
        }
    }

    const SAVINGDATA_INSTANCE = new SavingData()


    export function restoreFromSavingData(roomName: string, callback: (savingData: SavingData) => {}) {
    }


    // export function writeToSavingData(roomName: string, callback: (savingData: SavingData) => {}) {
    //     let savingData = roomSavingDataMap[roomName]
    //     callback(savingData)
    // }

    export function writeSavingDataNumber(roomName:string, key:string, value:number) {
        SAVINGDATA_INSTANCE.writeDataNumber(roomName, key, value)
    }

    export function readSavingDataNumber(roomName: string, key: string) :number {
        return SAVINGDATA_INSTANCE.readDataNumber(roomName, key)
    }

    export function writeSavingDataBoolean(roomName: string, key: string, value: boolean) {
        SAVINGDATA_INSTANCE.writeDataBoolean(roomName, key, value)
    }

    export function readSavingDataBoolean(roomName: string, key: string): boolean {
        return SAVINGDATA_INSTANCE.readDataBoolean(roomName, key)
    }



    // ------ room life cycle begins ---------

    let rooms: { [name: string]: room.CommonRoom } = {}
    


    export function forEachRoom(callback: (roomName: string, room: room.CommonRoom) => void) {
        for (const name of Object.keys(rooms)) {
            callback(name, rooms[name])
        }
    }

    export function _getRoom(roomName: string): room.Room {
        if (roomName == 'village') {
            return villageRoom
        } 
        return _getCommonRoom(roomName)
    }


    export function _getCommonRoom(roomName:string) :room.CommonRoom {
        return rooms[roomName]
    }

    //%blocks
    export function registerRoom(roomName: string, roomImage: Image, tilemap: tiles.TileMapData) {
        _currentRoomInRegister = roomName
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
    export function didEnterRoom(roomName: string, callback: (player:Sprite, room:room.Room, entrance?:string) => void) {
        _getCommonRoom(roomName).setDidEnterRoomCallback(callback)
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
        _getCommonRoom(roomName).addExitOnLocation(nextRoomName, col, row,waypointSignImage)
    }

    export function createRoomSprite(image: Image, spriteKind : number) :Sprite{
        return currentRoom().createSprite(image, spriteKind)
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
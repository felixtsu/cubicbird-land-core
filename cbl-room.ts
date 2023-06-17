// 在此处添加您的代码
//%icon="\uf132" color="#B6392F"
//%block="CBLand_Room"
//%block.loc.zh-CN="方块鸟大陆-房间"
namespace cbland {


    let _currentRoomInRegister :string= null;

    export function _getCurrentRoomInRegister() : string {
        return _currentRoomInRegister
    }

    
    export function currentRoom(): room.Room {
        return room.currentRoom()
    }


    export const SAVINGDATA_GLOBAL_KEY = "GLOBAL"
    

    export class SavingData {

        static SEPERATOR = "||";

        writeDataNumber(roomName:string, key: string, value: number) {
            
            settings.writeNumber(roomName + SavingData.SEPERATOR  + key, value)
        }

        readDataNumber(roomName: string, key: string): number {
            if (settings.exists(roomName + SavingData.SEPERATOR + key)) {
                return settings.readNumber(roomName + SavingData.SEPERATOR + key)
            } else {
                return settings.readNumber(SAVINGDATA_GLOBAL_KEY + SavingData.SEPERATOR + key)
            }
        }

        writeDataBoolean(roomName: string, key: string, value: boolean) {
            settings.writeNumber(roomName + SavingData.SEPERATOR + key, value ? 1 : 0)
        }

        readDataBoolean(roomName: string, key: string) :boolean{
            if (settings.exists(roomName + SavingData.SEPERATOR + key)) {
                return settings.readNumber(roomName + SavingData.SEPERATOR + key) == 1 ? true : false
            } else {
                return settings.readNumber(SAVINGDATA_GLOBAL_KEY + SavingData.SEPERATOR + key) == 1 ? true : false
            }
        }

        writeDataString(roomName: string, key: string, value: string) {
            settings.writeString(roomName + SavingData.SEPERATOR + key, value)
        }

        readDataString(roomName: string, key: string) :string{
            if (settings.exists(roomName + SavingData.SEPERATOR + key)) {
                return settings.readString(roomName + SavingData.SEPERATOR + key)
            } else {
                return settings.readString(SAVINGDATA_GLOBAL_KEY + SavingData.SEPERATOR + key)
            }
        }
    }

    const SAVINGDATA_INSTANCE = new SavingData()

    //%group="Data"
    //%group.loc.zh-CN="数据"
    //%blockid=cbland_write_saving_data_number block="write room %roomName data %key to %value"
    //%block.loc.zh-CN="将房间 %roomName 的数据 %key 设为 %value"
    export function writeSavingDataNumber(roomName:string, key:string, value:number) {
        SAVINGDATA_INSTANCE.writeDataNumber(roomName, key, value)
    }

    //%group="Data"
    //%group.loc.zh-CN="数据"
    //%blockid=cbland_read_saving_data_number block="read room %roomName data of key %key"
    //%block.loc.zh-CN="读取房间 %roomName 的 %key 数据"
    export function readSavingDataNumber(roomName: string, key: string) :number {
        return SAVINGDATA_INSTANCE.readDataNumber(roomName, key)
    }

    //%group="Data"
    //%group.loc.zh-CN="数据"
    //%blockid=cbland_write_saving_data_boolean block="write room %roomName data %key to %value"
    //%block.loc.zh-CN="将房间 %roomName 的数据 %key 设为 %value"
    export function writeSavingDataBoolean(roomName: string, key: string, value: boolean) {
        SAVINGDATA_INSTANCE.writeDataBoolean(roomName, key, value)
    }

    //%group="Data"
    //%group.loc.zh-CN="数据"
    //%blockid=cbland_read_saving_data_boolean block="read room %roomName data of key %key"
    //%block.loc.zh-CN="读取房间 %roomName 的 %key 数据"
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
            return cbland._getVillageRoom()
        } 
        return _getCommonRoom(roomName)
    }


    export function _getCommonRoom(roomName:string) :room.CommonRoom {
        return rooms[roomName]
    }

    //%block
    //%blockNamespace=cbland
    //%group="Room"
    //%group.loc.zh-CN="房间"
    //%blockId=cbland_rooom_register_room
    //%block="register room $roomName, village image $roomImage=screen_image_picker, $tilemap"
    //%block.loc.zh-CN="注册房间，名字$roomName, 外观 $roomImage=screen_image_picker, $tilemap"
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //%weight=90
    export function registerRoom(roomName: string, roomImage: Image, tilemap: tiles.TileMapData) {
        _currentRoomInRegister = roomName
        if (rooms[roomName] != null) {
            console.error("duplicate room name encountered:" + roomName)
            let dummpySprite: Sprite = null
            dummpySprite.sayText(1111)
        }
        let newRoom = new room.CommonRoom(roomName, roomImage, tilemap)
        rooms[roomName] = newRoom
    }

    //%blocks
    export function willEnterRoom(roomName: string, callback: () => void) {

    }

    //%block
    //%blockNamespace=cbland
    //%group="Room"
    //%group.loc.zh-CN="房间"
    //%blockId=cbland_rooom_did_enter_room
    //%block="run code after player enter room $roomName"
    //%block.loc.zh-CN="进入 $roomName 后运行"
    //%weight=90
    //%topblock=false
    //%handlerStatement=true
    //%draggableParameters="player, room, entrance"
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
    

    //%block
    //%blockNamespace=cbland
    //%group="Room"
    //%group.loc.zh-CN="房间"
    //%afterOnStart=true
    //%blockId=cbland_rooom_add_exit
    //%block="add exit from room $roomName to $nextRoomName at col $col row $row || with $waypointSignImage"
    //%block.loc.zh-CN="在 $roomName 的$col列$row行添加一个到$nextRoomName的出口 || 出口图标 $waypointSignImage"
    //%weight=90
    //%topblock=false
    export function addExit(roomName: string, col: number, row: number, nextRoomName:string, waypointSignImage?:Image) {
        _getCommonRoom(roomName).addExitOnLocation(nextRoomName, col, row, waypointSignImage)
    }

    export function createRoomSprite(image: Image, spriteKind : number) :Sprite{
        return currentRoom().createSprite(image, spriteKind)
    }






    // ------ room life cycle ends ---------

    // ------ action begins -----------
    //%block
    //%blockNamespace=cbland
    //%group="Control"
    //%group.loc.zh-CN="控制"
    //%blockId=setSkill 
    //%block="In room $roomName on $button $event "
    //%block.loc.zh-CN="在 $roomName 场景里 $button $event 时"
    //%weight=90
    //%topblock=false
    export function onButtonEvent(roomName : string, button:ControllerButton, event:ControllerButtonEvent, handler:()=>void) {
        scene_util.registerRoomButtonEvent(roomName, button, event, handler)
    }

    // ------ end begins -----------

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
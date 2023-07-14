namespace SpriteKind {
    export const ExitWaypoint = SpriteKind.create()
}
namespace assets {
    //% helper=getCBLTilemapByName
    //% pyConvertToTaggedTemplate
    //% blockIdentity="tiles._tilemapEditor"
    export function cbl_tilemap(lits: any, ...args: any[]): tiles.TileMapData { return null }


    //% helper=getCBLImageByName
    //% pyConvertToTaggedTemplate
    //% blockIdentity="images._spriteImage"
    export function cbl_image(lits: any, ...args: any[]): Image { return null }
}
namespace helpers {
    export function getCBLTilemapByName(name: string) {
        return _getFactoryInstance("cbl_tilemap", name);
    }


    export function getCBLImageByName(name: string) {
        return _getFactoryInstance("cbl_image", name);
    }
}

namespace room {

    let _currentRoom: Room = null

    export function currentRoom(): Room {
        return _currentRoom;
    }


    class Exit {
        roomName: string;
        col: number;
        row: number;
        waypointImage: Image;
        hidden: boolean

        constructor(roomName: string, col?: number, row?: number, waypointImage?: Image) {
            this.roomName = roomName
            this.col = col
            this.row = row
            
            if (!waypointImage) {
                this.waypointImage = assets.cbl_image`waypoint_default_E`
                this.hidden = true
            }
            
        }
    }

    const CBL_CORE_ROOM_SCENE_FLAG = 'CubicbirdLandCore-RoomScene'

    export function isCurrentSceneARoomScene() {
        return game.currentScene().data[CBL_CORE_ROOM_SCENE_FLAG]
    }


    export interface Room {
        enterRoom(heroSprite: Sprite, entrance?: string): void
        leaveRoom(name: string): void
        getRoomName(): string
        createSprite(image: Image, spriteKind?: number, stateful?:boolean): Sprite
    }

    const EXIT_NAME_SD_KEY = "EXIT_NAME_SD_KEY"

    export abstract class AbstractRoom implements Room {

        protected exits: {
            [key: string]: Exit[]
        }
        protected heroSprite: Sprite

        protected name: string

        constructor(name: string) {
            this.name = name
            this.createdSprites = []
            this.statefulSprites = []
        }

        getRoomName(): string {
            return this.name
        }

        protected createExitInRoom(nextRoomName: string, col: number, row: number,  waypointSignImage?: Image) {

            this.addExitOnLocation(nextRoomName, col, row, waypointSignImage)

            let exits = this.exits[nextRoomName]

            for (let exit of exits ) {
                let exitWayppointSprite = this.createSprite(exit.waypointImage, SpriteKind.ExitWaypoint)
                sprites.setDataString(exitWayppointSprite, EXIT_NAME_SD_KEY, nextRoomName)
                tiles.placeOnTile(exitWayppointSprite, tiles.getTileLocation(exit.col, exit.row))
            }
        }

        addExitOnLocation(nextRoomName: string, col: number, row: number, waypointSignImage?: Image) {

            let exit = new Exit(nextRoomName, col, row, waypointSignImage)
            this.addExit(nextRoomName, exit)
        }

        addExit(nextRoomName: string, exit : Exit) {
            if (this.exits == undefined) {
                this.exits = {}
            }
            if (!this.exits[nextRoomName]) {
                this.exits[nextRoomName] = []
            }
            
            this.exits[nextRoomName].push(exit)
        }

        protected didEnterRoom(entrance: string): void {
        }

        protected willLeaveRoom(exit: string): boolean {
            return true
        }

        protected createdSprites: Sprite[]
        protected statefulSprites:Sprite[]

        createSprite(image: Image, spriteKind?: number, stateful?:boolean): Sprite {

            let result = sprites.create(image, spriteKind)

            this.createdSprites.push(result)
            if (stateful) {
                this.statefulSprites.push(result)
            }

            return result;
        }

        protected roomTilemap(): tiles.TileMapData { return null }

        
        public enterRoom(heroSprite: Sprite, entrance?: string): void {
            _currentRoom = this;
            
            game.pushScene()
            game.currentScene().data[CBL_CORE_ROOM_SCENE_FLAG] = true

            // 这样就把外层游戏sprite带入这个场景
            game.currentScene().addSprite(heroSprite)
            game.currentScene().physicsEngine.addSprite(heroSprite)

            heroSprite.vx = 0, heroSprite.vy = 0
            this.heroSprite = heroSprite

            

            tiles.setTilemap(this.roomTilemap())

            for (let exitName of Object.keys(this.exits)) {
                let exits = this.exits[exitName]
                for (let exit of exits) {
                    if (exit.col != undefined) {
                        let exitWayppointSprite = this.createSprite(exit.waypointImage, SpriteKind.ExitWaypoint)
                        sprites.setDataString(exitWayppointSprite, EXIT_NAME_SD_KEY, exitName)
                        tiles.placeOnTile(exitWayppointSprite, tiles.getTileLocation(exit.col, exit.row))
                        if (exit.hidden) {
                            exitWayppointSprite.setFlag(SpriteFlag.Invisible, true)
                        }
                    }
                }
            }

            sprites.onOverlap(this.heroSprite.kind(), SpriteKind.ExitWaypoint, (sprite: Sprite, otherSprite: Sprite) => {
                this.leaveRoom(sprites.readDataString(otherSprite, EXIT_NAME_SD_KEY))
            })

            this.didEnterRoom(entrance)
        }
        public leaveRoom(name: string = "DEFAULT"): void {
            let result = this.willLeaveRoom(name)
            if (!result) {
                return
            }
            let nextRoomName = this.exits[name][0].roomName;
            for (let createdSprite of this.createdSprites) {
                createdSprite.destroy()
                this.statefulSprites.removeElement(createdSprite)
            }


            game.popScene()

            cbland._getRoom(nextRoomName).enterRoom(this.heroSprite, this.getRoomName());
        }

    }

    export class CommonRoom extends AbstractRoom {

        private tilemap: tiles.TileMapData
        private _roomImage: Image

        private _didEnterRoomCallback: (player: Sprite, room: CommonRoom, entrance:string) =>void

        public setDidEnterRoomCallback(cb: (player: Sprite, room: CommonRoom, entrance: string) => void ) {
            this._didEnterRoomCallback = cb
        }

        private _willLeaveRoomCallback: (player: Sprite, room: CommonRoom, exit: string) =>  void

        public setWillLeaveRoomCallback(cb: (player: Sprite, room: CommonRoom, exit: string) => void) {
            this._willLeaveRoomCallback = cb
        }
        
        
        get roomImage() {
            return this._roomImage
        }

        public constructor(roomName: string, roomImage: Image, tilemap: tiles.TileMapData) {
            super(roomName)
            this.tilemap = tilemap
            this._roomImage = roomImage
        }

        protected roomTilemap(): tiles.TileMapData {
            return this.tilemap
        }

        public enterRoom(heroSprite: Sprite, entrance?: string): void {
            super.enterRoom(heroSprite, entrance)

            this._didEnterRoomCallback(heroSprite, this, entrance)

        }

        public willLeaveRoom(exit:string): boolean {
            if (this._willLeaveRoomCallback) {
                this._willLeaveRoomCallback(this.heroSprite, this, exit)
            }
            return true;
        }

     }
}
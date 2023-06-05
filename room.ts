namespace SpriteKind {
    export const ExitWaypoint = SpriteKind.create()
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
            this.waypointImage = waypointImage
        }
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
            [key: string]: Exit
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

            let exit = this.exits[nextRoomName]

            let exitWayppointSprite = this.createSprite(exit.waypointImage, SpriteKind.ExitWaypoint)
            sprites.setDataString(exitWayppointSprite, EXIT_NAME_SD_KEY, nextRoomName)
            tiles.placeOnTile(exitWayppointSprite, tiles.getTileLocation(exit.col, exit.row))

        }

        addExitOnLocation(nextRoomName: string, col: number, row: number, waypointSignImage?: Image) {
            this.addExit(nextRoomName)

               

            this.exits[nextRoomName].col = col
            this.exits[nextRoomName].row = row
            if (!waypointSignImage) {
                waypointSignImage = assets.image`waypoint_default_E`
                this.exits[nextRoomName].hidden = true
            }
            this.exits[nextRoomName].waypointImage = waypointSignImage
            
        }

        addExit(nextRoomName: string) {
            if (this.exits == undefined) {
                this.exits = {}
            }
            this.exits[nextRoomName] = new Exit(nextRoomName)
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

            // 这样就把外层游戏sprite带入这个场景
            game.currentScene().addSprite(heroSprite)
            game.currentScene().physicsEngine.addSprite(heroSprite)

            heroSprite.vx = 0, heroSprite.vy = 0
            this.heroSprite = heroSprite

            

            tiles.setTilemap(this.roomTilemap())

            for (let exitName of Object.keys(this.exits)) {
                let exit = this.exits[exitName]
                if (exit.col != undefined) {
                    let exitWayppointSprite = this.createSprite(exit.waypointImage, SpriteKind.ExitWaypoint)
                    sprites.setDataString(exitWayppointSprite, EXIT_NAME_SD_KEY, exitName)
                    tiles.placeOnTile(exitWayppointSprite, tiles.getTileLocation(exit.col, exit.row))
                    if (exit.hidden) {
                        exitWayppointSprite.setFlag(SpriteFlag.Invisible, true)
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
            let nextRoomName = this.exits[name].roomName;
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

        get roomImage() {
            return this._roomImage
        }

        public constructor(roomName: string, roomImage: Image, tilemap: tiles.TileMapData) {
            super(roomName)
            this.tilemap = tilemap
            this._roomImage = roomImage
            tiles.loadMap
        }

        protected roomTilemap(): tiles.TileMapData {
            return this.tilemap
        }

        public enterRoom(heroSprite: Sprite, entrance?: string): void {
            super.enterRoom(heroSprite, entrance)

            this._didEnterRoomCallback(heroSprite, this, entrance)

        }

     }
}
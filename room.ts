namespace SpriteKind {
    export const ExitWaypoint = SpriteKind.create()
}
namespace room {

    let _currentRoom: Room = null

    export function currentRoom(): Room {
        return _currentRoom;
    }


    class Exit {
        room: Room;
        col: number;
        row: number;
        waypointImage: Image;

        constructor(room: Room, col?: number, row?: number, waypointImage?: Image) {
            this.room = room
            this.col = col
            this.row = row
            this.waypointImage = waypointImage
        }
    }


    export interface Room {
        enterRoom(heroSprite: Sprite, entrance?: string): void
        leaveRoom(name: string): void
        getRoomName(): string
        createSprite(image: Image, spriteKind?: number): Sprite
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
        }

        getRoomName(): string {
            return this.name
        }

        protected createExitInRoom(nextRoom: Room, col: number, row: number, name?: string, waypointSignImage?: Image) {
            if (!name) {
                name = nextRoom.getRoomName()
            }

            this.addExitOnLocation(nextRoom, col, row, name, waypointSignImage)

            let exit = this.exits[name]

            let exitWayppointSprite = this.createSprite(exit.waypointImage, SpriteKind.ExitWaypoint)
            sprites.setDataString(exitWayppointSprite, EXIT_NAME_SD_KEY, name)
            tiles.placeOnTile(exitWayppointSprite, tiles.getTileLocation(exit.col, exit.row))

        }

        addExitOnLocation(nextRoom: Room, col: number, row: number, name?: string, waypointSignImage?: Image) {
            if (!name) {
                name = nextRoom.getRoomName()
            }
            this.addExit(nextRoom, name)

            if (!waypointSignImage) {
                waypointSignImage = assets.image`waypoint_default_E`
            }

            this.exits[name].col = col
            this.exits[name].row = row
            this.exits[name].waypointImage = waypointSignImage
        }

        addExit(nextRoom: Room, name?: string) {
            if (this.exits == undefined) {
                this.exits = {}
            }
            if (!name) {
                name = nextRoom.getRoomName()
            }
            this.exits[name] = new Exit(nextRoom)
        }

        protected didEnterRoom(entrance: string): void {
        }

        protected willLeaveRoom(exit: string): boolean {
            return true
        }

        protected createdSprites: Sprite[]

        createSprite(image: Image, spriteKind?: number): Sprite {

            let result = sprites.create(image, spriteKind)

            this.createdSprites.push(result)

            return result;
        }

        protected roomTilemap(): tiles.TileMapData { return null }

        public enterRoom(heroSprite: Sprite, entrance?: string): void {
            game.pushScene()
            game.currentScene().addSprite(heroSprite)
            game.currentScene().physicsEngine.addSprite(heroSprite)
            heroSprite.vx = 0, heroSprite.vy = 0
            this.heroSprite = heroSprite

            _currentRoom = this;

            tiles.setTilemap(this.roomTilemap())

            for (let exitName of Object.keys(this.exits)) {
                let exit = this.exits[exitName]
                if (exit.col != undefined) {
                    let exitWayppointSprite = this.createSprite(exit.waypointImage, SpriteKind.ExitWaypoint)
                    sprites.setDataString(exitWayppointSprite, EXIT_NAME_SD_KEY, exitName)
                    tiles.placeOnTile(exitWayppointSprite, tiles.getTileLocation(exit.col, exit.row))
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
            let nextRoom = this.exits[name].room;
            for (let createdSprite of this.createdSprites) {
                createdSprite.destroy()
            }
            game.popScene()
            nextRoom.enterRoom(this.heroSprite, this.getRoomName());
        }

    }


}
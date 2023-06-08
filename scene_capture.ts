// 在此处添加您的代码
namespace scene_util {

    let _scenes :{[name:string] : scene.Scene} = {}

    export function captureScene(name : string, scene:scene.Scene) {
        _scenes[name] = scene
    }

    export function captureCurrentScene(name:string) {
        scene_util.captureScene(name, game.currentScene())
    }

    export function captureRegisteringRoomScenes(callback : ()=>void) {
        let sceneCaptureHandler = (oldScene: scene.Scene) => {
            scene_util.captureScene(cbland._getCurrentRoomInRegister(), oldScene)
        }
        game.addScenePopHandler(sceneCaptureHandler)

        game.addScenePushHandler((oldScene: scene.Scene) => {
            scene_util.restoreScene(cbland.currentRoom().getRoomName())
        })

        callback()

        game.removeScenePopHandler(sceneCaptureHandler)
    }

    export function restoreScene(name : string ){
        let scene = _scenes[name]
        if (scene ==  null) {
            return
        }
        // restore sprite overlap begins
        for (let overlapHandler of scene.overlapHandlers) {
            game.currentScene().overlapHandlers.push(overlapHandler)
        }
        game.currentScene().overlapMap = scene.overlapMap
        // restore sprite overlap ends


        // restore forever handlers begins
        for (let gameForeverHandler of scene.gameForeverHandlers) {
            game.currentScene().gameForeverHandlers.push(gameForeverHandler)
        }
        // restore forever handlers ends


        for (let buttonEventHandler of scene.buttonEventHandlers) {
            game.currentScene().buttonEventHandlers.push(buttonEventHandler)
        }
    
    }


}
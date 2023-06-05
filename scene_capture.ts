// 在此处添加您的代码
namespace scene_util {


    


    let _scenes :{[name:string] : scene.Scene} = {}

    export function captureScene(name : string, scene:scene.Scene) {
        _scenes[name] = scene
    }

    export function restoreScene(name : string ){
        let scene = _scenes[name]
        if (scene ==  null) {
            return
        }
        for (let overlapHandler of scene.overlapHandlers) {
            game.currentScene().overlapHandlers.push(overlapHandler)
        }
        game.currentScene().overlapMap = scene.overlapMap
        
         
    }





}
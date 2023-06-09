// 在此处添加您的代码
namespace scene_util {

    let _scenes: { [name: string]: scene.Scene } = {}

    export function captureScene(name: string, scene: scene.Scene) {
        _scenes[name] = scene
    }

    class ButtonEventHandler {
        constructor(public button: ControllerButton, public event: ControllerButtonEvent, public handler: () => void) {
        }
    }



    let _buttonEventHandlers: { [name: string]: ButtonEventHandler[] } = {}

    export function registerRoomButtonEvent(roomName: string, button: ControllerButton, event: ControllerButtonEvent, handler: () => void) {
        let buttonEventHandler = new ButtonEventHandler(button, event, handler)

        if (!_buttonEventHandlers[roomName]) {
            _buttonEventHandlers[roomName] = [buttonEventHandler]
            return
        }

        for (let handler of _buttonEventHandlers[roomName]) {
            if (handler.button == button && handler.event == event) {
                console.error("duplicate event handler registered: " + roomName + " button " + button + " event " + event)
                let dummpySprite: Sprite = null
                dummpySprite.sayText(1111)
                return
            }
        }

        _buttonEventHandlers[roomName].push(buttonEventHandler)

    }

    export function captureCurrentScene(name: string) {
        scene_util.captureScene(name, game.currentScene())
    }

    export function captureRegisteringRoomScenes(callback: () => void) {
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

    const _controlButtonSequence = [ControllerButton.Up, ControllerButton.Right, ControllerButton.Down, ControllerButton.Left,
    ControllerButton.A, ControllerButton.B]
    const _buttonSequence = [controller.up, controller.right, controller.down, controller.left,
    controller.A, controller.B]

    function controlButtonToButton(controllerButton: ControllerButton): controller.Button {
        for (let i = 0; i < _controlButtonSequence.length; i++) {
            if (controllerButton == _controlButtonSequence[i]) {
                return _buttonSequence[i]
            }
        }
        return null
    }

    export function restoreScene(name: string) {
        let scene = _scenes[name]
        if (scene == null) {
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


        // restore controller button event handlers 

        let roomButtonEventHandlers = _buttonEventHandlers[name]
        if (roomButtonEventHandlers) {
            for (let buttonEventHandler of roomButtonEventHandlers) {
                controlButtonToButton(buttonEventHandler.button)
                    .onEvent(buttonEventHandler.event, buttonEventHandler.handler)
            }

        }
    }

}
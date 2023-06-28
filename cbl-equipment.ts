//%groups=["Equipment"]
//%groups.loc.zh-CN=["工具"]
//%icon="\uf132" color="#B6392F"
//%block="CBLand_Equipment"
//%block.loc.zh-CN="方块鸟大陆-工具"
namespace cbland_equipment {


    class Equipment {

        constructor(public name: string, public icon: Image, public price: number) {
        }

    }

    const EQUIPMENT_META_DATA: { [name: string]: Equipment } = {}
    let EQUIPMENT_DATA: { [name: string]: boolean }
    const INTERNAL_EQUIPMENT_DATA_SETTINGS_KEY = "INTERNAL_EQUIPMENT_DATA"

    let _currentEquipment: string = null
    let iconSprite: Sprite = null


    function _init() {
        if (EQUIPMENT_DATA != null) {
            return
        }

        EQUIPMENT_DATA = settings.readJSON(INTERNAL_EQUIPMENT_DATA_SETTINGS_KEY)
        if (EQUIPMENT_DATA == null) {
            EQUIPMENT_DATA = {}
        }

        iconSprite = sprites.create(img`
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
            f f f f f f f f f f f f f f f f
        `)

        game.addScenePushHandler((oldScene: scene.Scene) => {
            scene.createRenderable(
                scene.HUD_Z,
                () => {
                    screen.fillRect(140, 100, 18, 18, 3)
                    screen.fillRect(141, 101, 16, 16, 1)
                    if (EQUIPMENT_META_DATA[_currentEquipment]) {
                        screen.drawTransparentImage(EQUIPMENT_META_DATA[_currentEquipment].icon, 141, 101)
                    }
                }
            )
        })
    }

    function saveEquipment() {

        settings.writeJSON(INTERNAL_EQUIPMENT_DATA_SETTINGS_KEY, EQUIPMENT_DATA)

    }


    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_register_equipement block="register equipment $name of $price, icon %icon=screen_image_picker"
    //%block.loc.zh-CN="登记物品 $name, 图标 %icon=screen_image_picker 价值 $price"
    export function registerEquipment(name: string, icon: Image, price: number) {
        _init()
        if (EQUIPMENT_META_DATA[name]) {
            console.error("Equipment (" + name + ") already registered")
            let dummpySprite: Sprite = null
            dummpySprite.sayText(1111)
        }

        EQUIPMENT_META_DATA[name] = new Equipment(name, icon, price)
    }

    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_get_equipement block="get equipement %name"
    //%block.loc.zh-CN="获得工具 $name"
    export function getItem(name: string) {
        EQUIPMENT_DATA[name] = true
        saveEquipment()
    }


    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_equipement_quantity block="own equipment %name ?"
    //%block.loc.zh-CN="有工具 $name 吗？"
    export function has(name: string): boolean {
        return EQUIPMENT_DATA[name]
    }

    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_equipement_value block="value of %name"
    //%block.loc.zh-CN="工具 $name 的价格"
    export function itemValue(name: string): number {
        let ret = EQUIPMENT_META_DATA[name]
        if (ret == null) {
            return 0;
        }
        return ret.price
    }


    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_lose_equipment block="lost item %name quantity %quantity"
    //%block.loc.zh-CN="失去工具 %name"
    export function loseItem(name: string) {
        if (!EQUIPMENT_DATA[name]) {
            console.error("DO NOT have equipment (" + name + ")")
            let dummpySprite: Sprite = null
            dummpySprite.sayText(1111)
        }

        delete EQUIPMENT_DATA[name]
        saveEquipment()

        if (_currentEquipment == name) {
            _currentEquipment = null
            update()
            toggleToolbar(false)
        }

    }


    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_set_current_equipment block="set current equipment to %name"
    //%block.loc.zh-CN="设置当前工具为 %name"
    export function setCurrentEquipment(name: string) {
        _init()
        if (!name) {
            _currentEquipment = null
            update()
            return
        }

        if (!EQUIPMENT_DATA[name]) {
            console.error("DO NOT have equipment (" + name + ")")
            let dummpySprite: Sprite = null
            dummpySprite.sayText(1111)
        }
        _currentEquipment = name
        update()
    }

    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_get_current_equipment block="current holding equipment"
    //%block.loc.zh-CN="当前手里的工具"
    export function getCurrentEquipment(): string {
        return _currentEquipment
    }

    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_check_current_equipment block="is holding equipment %name"
    //%block.loc.zh-CN="手里的工具是 %name"
    export function isHolding(name: string): boolean {
        return _currentEquipment == name
    }

    //%group="Equipment"
    //%group.loc.zh-CN="工具"
    //%blockid=cbland_is_empty_handed block="is empty handed"
    //%block.loc.zh-CN="空手吗"
    export function isEmptyHanded(): boolean {
        return _currentEquipment == null
    }

    function update() {
        let iconImage = image.create(16, 16)
        iconImage.fillRect(0, 0, 16, 16, 1)

        if (_currentEquipment != null) {
            let equipment = EQUIPMENT_META_DATA[_currentEquipment]
            iconImage.drawTransparentImage(equipment.icon, 0, 0)
        }

        iconImage.drawRect(0, 0, 16, 16, 3)
        iconSprite.setImage(iconImage)
        iconSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        iconSprite.x = 12
        iconSprite.y = 108
        iconSprite.z = scene.HUD_Z
    }

    //% block
    //% blockid=cbland_toggle_toolbar block="显示道具条 %show"
    export function toggleToolbar(show: boolean) {
        iconSprite.setFlag(SpriteFlag.Invisible, !show)
        update()
    }

    
    function _createMenuItemFromEquipment() {
        let inventory = []
        for (let key of Object.keys(EQUIPMENT_DATA)) {
            inventory.push(new miniMenu.MenuItem(key, EQUIPMENT_META_DATA[key].icon))
        }

        inventory.push(new miniMenu.MenuItem("空手", img`.`))
        return inventory

    }

    function openToolbox() {

        game.pushScene()

        let menu = miniMenu.createMenuFromArray(_createMenuItemFromEquipment())
        cbland_info._setMenuStyle(menu)

        // let selected = false;

        menu.onButtonPressed(controller.A, (selection: string, selectedIndex: number) => {
            if (selection == "空手") {
                setCurrentEquipment(null)
            } else {
                setCurrentEquipment(selection)
                toggleToolbar(true)
            }

            menu.close()
            // selected = true
            game.popScene()
        })
        menu.onButtonPressed(controller.menu, (selection: string, selectedIndex: number) => {  
            menu.close()
            // selected = true
            game.popScene()
        })
        menu.onSelectionChanged((selection: string, selectedIndex: number) => {
            if (selection == "空手") {
                menu.setTitle("空手")
            } else {
                menu.setTitle(selection)
            }
        })
    }

    export function addEquipmentMenu() {
        scene.systemMenu.addEntry(() => "Toolbox", () => {
            scene.systemMenu.closeMenu()
            openToolbox()
        }
            , assets.cbl_image`toolboxIcon`)
    }

    // ------ equipment ends ---------

}
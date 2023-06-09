//%groups=["money", "time", "Item"]
//%icon="\u2139" color="#F3A21C"
//%block="CBLand_info"
//%block.loc.zh-CN="方块鸟大陆-信息"
//%weight=104
namespace cbland_info {

    // ------ time begins ----------

    const clockIcon = img`
        . . . 1 1 1 . . .
        . . 1 . 1 . 1 . .
        . 1 . . 1 . . 1 .
        1 . . . 1 . . . 1
        1 . 1 1 1 . . . 1
        1 . . . . . . . 1
        . 1 . . . . . 1 .
        . . 1 . . . 1 . .
        . . . 1 1 1 . . .
    `

    class Clock {
        hour: number
        minute: number
        tickInterval: number
        day: number

        currentTimeMinutes: number

        setTimeMillis: number
        setTimeMinutes: number
        lastTick: number

        constructor(day?: number, hour?: number, minute?: number, tickInterval?: number) {
            if (day == undefined) {
                let saved_day = cbland.readSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "day")
                if (saved_day != undefined) {
                    day = saved_day
                    hour = cbland.readSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "hour")
                    minute = cbland.readSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "minute")
                    tickInterval = cbland.readSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "tickInterval")
                }
            } 
            if (day == undefined) {
                day = 1
                hour = 8
                minute = 0
                tickInterval = tickInterval
            }

            this.day = day
            this.hour = (hour + 24) % 24
            this.minute = (minute + 60) % 60
            this.tickInterval = tickInterval
            
            this.currentTimeMinutes = this.hour * 60 + this.minute

            this.lastTick = game.currentScene().millis()
            this.setTimeMinutes = this.currentTimeMinutes

            this.save()

            
        }

        save() {
            cbland.writeSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "day", this.day)
            cbland.writeSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "hour", this.hour)
            cbland.writeSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "minute", this.minute)
            cbland.writeSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "tickInterval", this.tickInterval)
        }

        timeElasped(currentMillis: number, freezeTime:boolean) {
            let deltaMillis = currentMillis - this.lastTick
            this.lastTick = currentMillis
            if (freezeTime) {
                return
            }
            this.currentTimeMinutes += deltaMillis / this.tickInterval * 60

            // another day has pass
            if (Math.floor(this.currentTimeMinutes) > 60 * 24) {
                this.day += 1
                this.currentTimeMinutes -= 60 * 24
            }

            this.hour = Math.floor(Math.floor(this.currentTimeMinutes) / 60)
            this.minute = Math.floor(this.currentTimeMinutes) % 60
            this.save()

        }
    }

    let CLOCK_INSTANCE: Clock
    let isDrawClock: boolean = false
    let isDrawClockIcon: boolean = false

    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_draw_clock block="draw clock %on"
    //%block.loc.zh-CN="显示时钟 %on"
    export function drawClock(on: boolean) {
        isDrawClock = on
    }

    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_current_hour block="current hour"
    //%block.loc.zh-CN="现在几点"
    export function currentHour(): number {
        return CLOCK_INSTANCE.hour
    }

    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_current_minute block="current minute"
    //%block.loc.zh-CN="现在几分"
    export function currentMinute(): number {
        return CLOCK_INSTANCE.minute
    }

    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_current_day block="current day"
    //%block.loc.zh-CN="现在是第几天"
    export function currentDay(): number {
        return CLOCK_INSTANCE.day
    }

    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_draw_clock_icon block="draw clock icon %on"
    //%block.loc.zh-CN="显示时钟图标 %on"
    export function drawClockIcon(on: boolean) {
        isDrawClockIcon = on
    }


    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_set_time 
    //%block="set time to day %day, hour %hour, minute %minute || %tickInterval millis for one minute"
    //%block.loc.zh-CN="设置时钟 第 %day 天 %hour 点 %minute 分 || 以 %tickInterval 毫秒代替一分钟"
    //%tickInterval.defl=60000
    export function setTime(day?: number, hour?: number, minute?: number, tickInterval: number = 5000) {
        CLOCK_INSTANCE = new Clock(day, hour, minute, tickInterval)
    }

    //%group="Time"
    //%group.loc.zh-CN="时间"
    //%blockid=pxtclock_fast_forward_to
    //%block="fast forward time to hour %hour, minute %minute"
    //%block.loc.zh-CN="时间快进到 %hour 点 %minute 分"
    export function fastForwardTo(hour: number, minute: number) {
        let currentTickInterval = CLOCK_INSTANCE.tickInterval
        let currentDay = CLOCK_INSTANCE.day
        if (hour * 60 + minute < CLOCK_INSTANCE.hour * 60 + CLOCK_INSTANCE.minute) {
            currentDay += 1
        }

        CLOCK_INSTANCE = new Clock(currentDay, hour, minute, currentTickInterval)
    }

    function formatDecimal(val: number) {
        val |= 0;
        if (val < 10) {
            return "0" + val;
        }
        return val.toString();
    }

    function drawClockImplement() {
        if (drawClockImplement) {
            const font = image.font8;
            const smallFont = image.font5;
            const clockIconShift = (isDrawClockIcon ? clockIcon.width : 0)
            const width = font.charWidth * 5 - 2 + clockIconShift
            let left = (screen.width >> 1) - (width >> 1);
            let color1 = 1;
            let color2 = 3;

            screen.fillRect(left - 3, 0, width + 6, font.charHeight + 3, color1)
            screen.fillRect(left - 2, 0, width + 4, font.charHeight + 2, color2)

            if (drawClockIcon) {
                screen.drawTransparentImage(clockIcon, left - 1, 1)
            }

            let minuteToPrint = Math.floor(CLOCK_INSTANCE.minute / 10) * 10

            screen.print(formatDecimal(CLOCK_INSTANCE.hour) + ":" + formatDecimal(minuteToPrint), left + clockIconShift, 1, color1, font)

        }
    }

    function initTimeHud() {
        isDrawClock = true
        isDrawClockIcon = true
        scene.createRenderable(
            scene.HUD_Z,
            () => {
                // console.log("CLOCK_INSTANCE:" + CLOCK_INSTANCE + "|" + CLOCK_INSTANCE.hour)
                let currentMillis = game.currentScene().millis()
                CLOCK_INSTANCE.timeElasped(currentMillis, !room.isCurrentSceneARoomScene())
                drawClockImplement()
            }
        )
    }

    // -------- time ends ------------


    // ------ money begins -----------

    export let _money: number = 0;

    function drawMoneyIconImpl() {
        const s = money();
        let font: image.Font;
        let offsetY: number;
        if (s >= 1000000) {
            offsetY = 2;
            font = image.font5;
        }
        else {
            offsetY = 1;
            font = image.font8;
        }

        const num = s.toString();
        const width = num.length * font.charWidth;
        const start_x = screen.width - width - 2 - 8
        const start_y = 1

        screen.fillRect(start_x, 0, screen.width - width - 2, image.font8.charHeight + 3, info.borderColor())
        screen.fillRect(start_x + 1, 0, screen.width - width + 10, image.font8.charHeight + 2, 1)
        screen.drawTransparentImage(img`
            . . . b b . . .
            . . b 5 5 b . .
            . b 5 d 1 5 b .
            . b 5 3 1 5 b .
            . c 5 3 1 d c .
            . c 5 1 d d c .
            . . f d d f . .
            . . . f f . . .
        `, start_x, start_y)
        screen.print(num, start_x + 8, start_y, 3, font);
    }

    export function initHud() {
        initTimeHud()

        game.onShade(function () {
            drawMoneyIconImpl()
        })

        game.addScenePopHandler((oldScene: scene.Scene) => {
            cbland_info.setTime(CLOCK_INSTANCE.day, CLOCK_INSTANCE.hour, CLOCK_INSTANCE.minute, CLOCK_INSTANCE.tickInterval)
        })

        game.addScenePushHandler((oldScene: scene.Scene) => {
            cbland_info.setTime(CLOCK_INSTANCE.day, CLOCK_INSTANCE.hour, CLOCK_INSTANCE.minute, CLOCK_INSTANCE.tickInterval)
            initTimeHud()
            game.onShade(function () {
                drawMoneyIconImpl()
            })
        })

    }

    //%group="Money"
    //%group.loc.zh-CN="钱"
    //%blockid=cbland_change_money_by block="change money by %incr"
    //%block.loc.zh-CN="增加 %incr 个金币"
    export function changeMoneyBy(incr: number) {
        _money += incr
        cbland.writeSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "money", _money)
    }

    //%group="Money"
    //%group.loc.zh-CN="钱"
    //%blockid=cbland_set_money_to block="set money to %amount"
    //%block.loc.zh-CN="设金币数为 %amount"
    export function setMoneyTo(amount: number) {
        _money = amount
        cbland.writeSavingDataNumber(cbland.SAVINGDATA_GLOBAL_KEY, "money", _money)
    }

    //%group="Money"
    //%group.loc.zh-CN="钱"
    //%blockid=cbland_get_money block="money"
    //%block.loc.zh-CN="金币数量"
    export function money(): number {
        return _money
    }

    // ------ money begins -----------



    // ------ backpack begins ---------
    class Item {

        constructor(public name: string, public icon: Image, public value: number, public sellInShop : boolean) {
        }

    }

    const ITEM_META_DATA: { [name: string]: Item } = {}
    let ITEM_DATA: { [name: string]: number }
    const INTERNAL_ITEM_DATA_SETTINGS_KEY = "INTERNAL_ITEM_DATA"

    function _init() {
        if (ITEM_DATA != null) {
            return
        }

        ITEM_DATA = settings.readJSON(INTERNAL_ITEM_DATA_SETTINGS_KEY)
        if (ITEM_DATA == null) {
            ITEM_DATA = {}
        }

    }

    function saveItems() {
        settings.writeJSON(INTERNAL_ITEM_DATA_SETTINGS_KEY, ITEM_DATA)
    }


    //%group="Item"
    //%group.loc.zh-CN="物品"
    //%blockid=cbland_register_item block="register item $name of $value, icon %icon=screen_image_picker  || sell in shop? $sellInShop"
    //%block.loc.zh-CN="登记物品 $name, 图标 %icon=screen_image_picker 价值 $value || 可在商店购买 $sellInShop" 
    export function registerItem(name: string, icon: Image, value: number, sellInShop = true) {
        _init()
        if (ITEM_META_DATA[name]) {
            console.error("Item with name (" + name + ") already registered")
            let dummpySprite: Sprite = null
            dummpySprite.sayText(1111)
        }

        ITEM_META_DATA[name] = new Item(name, icon, value, sellInShop)
    }

    //%group="Item"
    //%group.loc.zh-CN="物品"
    //%blockid=cbland_get_item block="rceive item %name quantity %quantity"
    //%block.loc.zh-CN="获得数量 $quantity 的 $name"
    export function getItem(name: string, quantity: number) {
        if (!ITEM_DATA[name]) {
            ITEM_DATA[name] = quantity
        } else {
            ITEM_DATA[name] += quantity
        }
        saveItems()
    }


    //%group="Item"
    //%group.loc.zh-CN="物品"
    //%blockid=cbland_item_quantity block="quantity of %name"
    //%block.loc.zh-CN="$name的数量"
    export function itemQuantity(name: string): number {
        let ret = ITEM_DATA[name]
        if (ret == null) {
            ret = 0
        }
        return ret
    }

    //%group="Item"
    //%group.loc.zh-CN="物品"
    //%blockid=cbland_item_value block="value of %name"
    //%block.loc.zh-CN="$name的价格"
    export function itemValue(name: string): number {
        let ret = ITEM_META_DATA[name]
        if (ret == null) {
            return 0;
        }
        return ret.value
    }


    //%group="Item"
    //%group.loc.zh-CN="物品"
    //%blockid=cbland_lose_item block="lost item %name quantity %quantity"
    //%block.loc.zh-CN="失去数量 $quantity 的 $name"
    export function loseItem(name: string, quantity: number) {
        if (!ITEM_DATA[name] || ITEM_DATA[name] < quantity) {
            console.error("Insufficent Item with name (" + name + "), only has " + quantity)
            let dummpySprite: Sprite = null
            dummpySprite.sayText(1111)
        } else {
            ITEM_DATA[name] -= quantity
            if (ITEM_DATA[name] == 0) {
                delete ITEM_DATA[name]
            }
        }
        saveItems()
    }
    // ------ backpack ends ---------
    function _createMenuItemFromMeta(): miniMenu.MenuItem[] {
        let inventory = []
        for (let key of Object.keys(ITEM_META_DATA)) {
            let item = ITEM_META_DATA[key]
            if (item.sellInShop) {
                inventory.push(new miniMenu.MenuItem(key, item.icon))
            }
            
        }

        inventory.push(new miniMenu.MenuItem("OK", assets.cbl_image`tick`))
        return inventory

    }

    function _createMenuItemFromInventory(): miniMenu.MenuItem[] {
        let inventory = []
        for (let key of Object.keys(ITEM_DATA)) {
            inventory.push(new miniMenu.MenuItem(key, ITEM_META_DATA[key].icon))
        }

        inventory.push(new miniMenu.MenuItem("OK", assets.cbl_image`tick`))
        return inventory

    }


    function openInventoryAndSelect(multiple: boolean): { [name: string]: number } {
        game.pushScene()

        let menu = miniMenu.createMenuFromArray(_createMenuItemFromInventory())
        custom_menu.setMenuStyle(menu)

        let selected = false;
        let selectedItem: { [name: string]: number } = {}

        if (multiple) {
            menu.onButtonPressed(controller.A, (selection: string, selectedIndex: number) => {
                if (selection == "OK") {
                    menu.close()
                    selected = true
                } else {
                    if (selectedItem[selection] == null) {
                        selectedItem[selection] = 1
                    } else if (selectedItem[selection] < ITEM_DATA[selection]) {
                        selectedItem[selection] += 1
                    }
                    menu.setTitle(selection + "  " + selectedItem[selection] + "/" + ITEM_DATA[selection])
                }
            })
            menu.onButtonPressed(controller.B, (selection: string, selectedIndex: number) => {
                if (selection == "OK") {

                } else {
                    if (selectedItem[selection] != null && selectedItem[selection] > 0) {
                        selectedItem[selection] -= 1
                        if (selectedItem[selection] == 0) {
                            delete selectedItem[selection]
                        }
                    }
                    menu.setTitle(selection + "  " + selectedItem[selection] + "/" + ITEM_DATA[selection])
                }
            })
            menu.onSelectionChanged((selection: string, selectedIndex: number) => {
                if (selection == "OK") {
                    menu.setTitle("选好了")
                } else {
                    let picked = 0
                    if (selectedItem[selection]) {
                        picked = selectedItem[selection]
                    }
                    menu.setTitle(selection + "  " + picked + "/" + ITEM_DATA[selection])
                }

            })
        } else {
            menu.onButtonPressed(controller.A, (selection: string, selectedIndex: number) => {
                menu.close()
                selectedItem[selection] = 1
                selected = true
            })
            menu.onSelectionChanged((selection: string, selectedIndex: number) => {
                if (selection == "OK") {
                    menu.setTitle("关闭")
                } else {
                    menu.setTitle(selection + "  " + ITEM_DATA[selection])
                }

            })
        }
        pauseUntil(() => selected)
        game.popScene()
        return selectedItem

    }

    function openInventory(){
        game.pushScene()

        let menu = miniMenu.createMenuFromArray(_createMenuItemFromInventory())
        custom_menu.setMenuStyle(menu)

        menu.onButtonPressed(controller.A, (selection: string, selectedIndex: number) => {
            if (selection == "OK") {
                menu.close()
                game.popScene()
            }
        })
        menu.onButtonPressed(controller.menu, (selection: string, selectedIndex: number) => {
            menu.close()
            game.popScene()
        })
        menu.onSelectionChanged((selection: string, selectedIndex: number) => {
            if (selection == "OK") {
                menu.setTitle("关闭")
            } else {
                menu.setTitle(selection + ITEM_DATA[selection])
            }

        })
    }

    export function openInventoryAndSelectMultiple(): { [name: string]: number } {
        return openInventoryAndSelect(true)
    }


    export function listAllItemAndSelectSingle() : string {
        game.pushScene()

        let menu = miniMenu.createMenuFromArray(_createMenuItemFromMeta())
        custom_menu.setMenuStyle(menu)

        let selected = false;
        let selectedItem: string = ""
    
        menu.onButtonPressed(controller.A, (selection: string, selectedIndex: number) => {
            menu.close()
            selected = true
            if (selection == "OK") {
                selectedItem = null
            } else {
                selectedItem = selection
            }
        })
        menu.onSelectionChanged((selection: string, selectedIndex: number) => {
            if (selection == "OK") {
                menu.setTitle("关闭")
            } else {
                menu.setTitle(selection + "  " + Math.floor(ITEM_META_DATA[selection].value * 1.5) + "金币")
            }

        })
        pauseUntil(() => selected)
        game.popScene()
        return selectedItem

    }

    //%group="Item"
    //%group.loc.zh-CN="物品"
    //%blockid=cbland_lose_item block="open inventory and select single item"
    //%block.loc.zh-CN="打开菜单并获得用户选择的物品"
    export function openInventoryAndSelectSingle(): string {
        let selectedItem = openInventoryAndSelect(false)
        let ret = Object.keys(selectedItem)[0]
        return ret == "OK" ? "" : ret
    }

    export function addInventoryMenu() {
        scene.systemMenu.addEntry(()=>"INVENTORY", ()=>{
            scene.systemMenu.closeMenu()
            openInventory()
            }
            , assets.cbl_image`inventoryIcon`)
    }


}
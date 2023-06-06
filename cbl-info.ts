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
        day : number

        currentTimeMinutes: number

        setTimeMillis: number
        setTimeMinutes: number
        lastTick : number

        constructor(day? : number, hour?: number, minute?: number, tickInterval?: number) {
            if (day == undefined) {
                day = cbland.readSavingDataNumber("GLOBAL", "day")
                hour = cbland.readSavingDataNumber("GLOBAL", "hour")
                minute = cbland.readSavingDataNumber("GLOBAL", "minute")
                tickInterval = cbland.readSavingDataNumber("GLOBAL", "tickInterval")
                
            } 


            this.hour = (hour + 24) % 24
            this.minute = (minute + 60) % 60
            this.tickInterval = tickInterval
            this.day = day



            this.currentTimeMinutes = this.hour * 60 + this.minute

            this.lastTick = game.currentScene().millis()
            this.setTimeMinutes = this.currentTimeMinutes

            this.save()
        }

        save() {

            cbland.writeSavingDataNumber("GLOBAL", "day", this.day)
            cbland.writeSavingDataNumber("GLOBAL", "hour", this.hour)
            cbland.writeSavingDataNumber("GLOBAL", "minute", this.minute)
            cbland.writeSavingDataNumber("GLOBAL", "tickInterval", this.tickInterval)
        }

        timeElasped(currentMillis: number) {
            let deltaMillis = currentMillis - this.lastTick
            this.lastTick = currentMillis
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

    //%blockid=pxtclock_draw_clock block="draw clock %on"
    //%block.loc.zh-CN="显示时钟 %on"
    export function drawClock(on: boolean) {
        isDrawClock = on
    }

    //%blockid=pxtclock_current_hour block="current hour"
    //%block.loc.zh-CN="现在几点"
    export function currentHour(): number {
        return CLOCK_INSTANCE.hour
    }

    //%blockid=pxtclock_current_minute block="current minute"
    //%block.loc.zh-CN="现在几分"
    export function currentMinute(): number {
        return CLOCK_INSTANCE.minute
    }

    //%blockid=pxtclock_current_day block="current day"
    //%block.loc.zh-CN="现在是第几天"
    export function currentDay(): number {
        return CLOCK_INSTANCE.day
    }

    //%blockid=pxtclock_draw_clock_icon block="draw clock icon %on"
    //%block.loc.zh-CN="显示时钟图标 %on"
    export function drawClockIcon(on: boolean) {
        isDrawClockIcon = on
    }



    //%blockid=pxtclock_set_time 
    //%block="set time to hour %hour, minute %minute || %tickInterval millis for one minute"
    //%block.loc.zh-CN="设置时钟 %hour 点 %minute 分 || 以 %tickInterval 毫秒代替一分钟"
    //%tickInterval.defl=60000
    export function setTime(day? : number, hour?: number, minute?: number, tickInterval: number = 5000) {
        CLOCK_INSTANCE = new Clock(day, hour, minute, tickInterval)
    }


    //%blockid=pxtclock_fast_forward_to
    //%block="fast forward time to hour %hour, minute %minute"
    //%block.loc.zh-CN="时间快进到 %hour 点 %minute 分"
    export function fastForwardTo(hour: number, minute: number) {
        let currentTickInterval = CLOCK_INSTANCE.tickInterval
        let currentDay  = CLOCK_INSTANCE.day
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
                let currentMillis = game.currentScene().millis()
                CLOCK_INSTANCE.timeElasped(currentMillis)
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

    export function changeMoneyBy(incr: number) {
        _money += incr
        cbland.writeSavingDataNumber("GLOBAL", "money", _money)
    }

    export function setMoneyTo(amount: number) {
        _money = amount
        cbland.writeSavingDataNumber("GLOBAL", "money", _money)
    }

    export function money(): number {
        return _money
    }

    // ------ money begins -----------
}

cbland_info.registerItem('鸡蛋', img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . b b b b . . . . . .
    . . . . b b 1 1 1 1 b b . . . .
    . . . . b 1 1 1 3 3 1 b . . . .
    . . . b 1 1 1 1 3 3 3 1 b . . .
    . . . b 1 1 3 1 1 3 3 1 b . . .
    . . b d 1 1 1 1 1 1 1 1 d b . .
    . . b d 3 3 1 1 1 1 1 1 d b . .
    . . b b 3 3 1 1 1 1 3 3 d b . .
    . . c b b d 1 1 1 3 3 b d c . .
    . . c d d d d d d b b b d c . .
    . . c b d d b b d b b d b c . .
    . . . c d d b b d d d d c . . .
    . . . . c b d d d d b c . . . .
    . . . . . c c c c c c . . . . .
`, 10)
cbland_info.registerItem('蘑菇', img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . b b b b . . . . . .
    . . . . b b 3 3 3 3 b b . . . .
    . . . c b 3 3 3 3 1 1 b c . . .
    . . c b 3 3 3 3 3 1 1 1 b c . .
    . c b 1 1 1 3 3 3 3 1 1 3 c c .
    c b d 1 1 1 3 3 3 3 3 3 3 b b c
    c b b d 1 3 3 3 3 3 1 1 1 b b c
    c b b b 3 3 1 1 3 3 1 1 d d b c
    . c b b b d d 1 1 3 b d d d c .
    . . c c b b d d b b b b c c . .
    . . . . c c c c c c c c . . . .
    . . . . . b b d 1 1 b . . . . .
    . . . . . b d d 1 1 b . . . . .
`, 15)


// 1. invoke all dlc registeration
cbland.startVillage()


cbland_info.getItem("鸡蛋", 10)
cbland_info.getItem("蘑菇", 5)
cbland_info.getItem("鸡蛋", 1)

controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    cbland_info.openInventoryAndSelectMultiple()
})


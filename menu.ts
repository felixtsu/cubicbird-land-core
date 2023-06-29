// 在此处添加您的代码
namespace custom_menu{


    export function setMenuStyle(menu: miniMenu.MenuSprite) {
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 3)
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 5)
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 1)
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, 1)
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 11)
        menu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.IconOnly, 1)
        menu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 9)
        menu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 15)
        menu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
            0,
            0,
            0,
            2
        ))
        menu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 1)
        menu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.BorderColor, 11)
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 118)
        menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 73)
        menu.bottom = 100
        menu.left = 22

    }
    
}
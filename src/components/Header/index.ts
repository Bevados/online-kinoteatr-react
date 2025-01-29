interface Menu {
	name: string
	link: string
}

interface SubMenu {
	name: string
	submenu: Menu[]
}

export type MenuItem = Menu | SubMenu

interface MenuItem {
  title: string,
  menuId: string
}

export const Menu = (menuItems: MenuItem[]) => {
  return `
    <div class="mr-5">
      ${menuItems.map((item: MenuItem) => `<a href="#${item.menuId}"><div class="py-1 w-64 border-y hover:bg-cardiff-light">${item.title}</div></a>`).join('')}
    </div>
  `
} 
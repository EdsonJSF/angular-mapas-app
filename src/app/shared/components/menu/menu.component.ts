import { Component } from '@angular/core';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      path: '/mapas/fullscreen',
      name: 'full screen',
    },
    {
      path: '/mapas/zoom-range',
      name: 'zoom range',
    },
    {
      path: '/mapas/marcadores',
      name: 'marcadores',
    },
    {
      path: '/mapas/propiedades',
      name: 'propiedades',
    },
  ];
}

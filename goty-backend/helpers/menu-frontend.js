const getMenuFrontEnd = ( role = 'USER_ROLE') => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: './' },
            { title: 'ProgressBar', url: 'progress' },
            { title: 'Gráficas', url: 'grafica1' },
            { title: 'Promesas', url: 'promesas' },
            { title: 'RxJs', url: 'rxjs' },
          ]
        },
        {
          title: 'Maintenance',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Users', url: 'users' },
            { title: 'Games', url: 'games' },
            { title: 'Doctors', url: 'doctors' },
          ]
        },
      ];

      if ( role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ title: 'Users', url: 'users' });
      }
      
      return menu;
}

module.exports = {
  getMenuFrontEnd
}
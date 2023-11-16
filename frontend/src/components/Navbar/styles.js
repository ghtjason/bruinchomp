export const navbarStyles = {
  drawer: {
      width: 200,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          backgroundColor: '#101F33',
          color: 'rgba(255, 255, 255, 0.7)',
      },
      '& .Mui-selected': {
          color: 'red',
      },
  },
  icons: {
      color: 'rgba(255, 255, 255, 0.7)!important',
      marginLeft: '20px',
  },
  text: {
      '& span': {
          marginLeft: '5px',
          fontWeight: '600',
          fontSize: '16px',
      }
  }
};
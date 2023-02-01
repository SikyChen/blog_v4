import React from 'react';
import Menu from '../components/Menu';

function withMenu(Component: React.ElementType) {

  return function (props: any) {
    return (
      <>
        <Menu></Menu>
        <Component {...props} />
      </>
    );
  }
}

export default withMenu;

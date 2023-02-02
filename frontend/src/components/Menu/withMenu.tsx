import React from 'react';
import Menu from '.';

function withMenu(Component: React.ElementType) {

  return function (props: any) {
    return (
      <>
        <Menu></Menu>
        <Component className="page-with-menu" {...props} />
      </>
    );
  }
}

export default withMenu;

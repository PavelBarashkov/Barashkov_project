import React from 'react'
import classes from './myButton.module.css';

interface IChildrenProps {
    children: string,
    onClick: () => void;
}

export const MyButton = ({children, ...props}: IChildrenProps) => {
  return (
    <div {...props} className={classes.myBtn}>
        {children}
    </div>
  )
}

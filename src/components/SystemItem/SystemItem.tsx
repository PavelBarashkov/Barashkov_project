import React from 'react'
import classes from '../CardInfo/cardInfo.module.css'
interface ISystemItem {
    system_requirements: {
        os: string,
        processor: string,
        memory: string,
        graphics: string,
        storage: string
    } ;
}

export const SystemItem = ({system_requirements}: ISystemItem) => {
  return (
    <div className={classes.system}>
        <p>Минимальные системные требования:</p>
        <div className={classes.system__item}>
            <div>
                {`os:`}
            </div>
            <div className={classes.info}>
                {system_requirements?.os === null ? '-' : system_requirements.os}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`processor:`}
            </div>
            <div className={classes.info}>
                {system_requirements?.processor === null ? '-' : system_requirements.processor}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`memory:`}
            </div>
            <div className={classes.info}>
                {system_requirements?.memory === null ? '-' : system_requirements.memory }
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`graphics:`}
            </div>
            <div className={classes.info}>
                {system_requirements?.graphics === null ? '-' : system_requirements.graphics}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`storage:`}
            </div>
            <div className={classes.info}>
                {system_requirements?.storage === null ? '-' : system_requirements.storage}
            </div>
        </div>
    </div>
  )
}

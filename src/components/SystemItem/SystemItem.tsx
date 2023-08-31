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
                {system_requirements && system_requirements?.os  ? system_requirements?.os : '-'}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`processor:`}
            </div>
            <div className={classes.info}>
                {system_requirements && system_requirements?.processor  ? system_requirements.processor : '-'}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`memory:`}
            </div>
            <div className={classes.info}>
                {system_requirements && system_requirements?.memory ? system_requirements.memory :  '-'}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`graphics:`}
            </div>
            <div className={classes.info}>
                {system_requirements && system_requirements?.graphics ? system_requirements.graphics : '-'}
            </div>
        </div>
        <div className={classes.system__item}>
            <div>
                {`storage:`}
            </div>
            <div className={classes.info}>
                {system_requirements && system_requirements?.storage ? system_requirements.storage : '-' }
            </div>
        </div>
    </div>
  )
}

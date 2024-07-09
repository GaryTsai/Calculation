import React from 'react'
import './style.css'
import { MinusOutlined } from '@ant-design/icons';
import useRWD from '../../utils/useRWD';

type CalProps = {
    id: number
    deleteTrade: Function;
};
  
const DeleteTradeIcon: React.FC<CalProps> = ({id, deleteTrade}) => {
    const device = useRWD()
    const isMobile =  device=== 'mobile'
    return (
        <div className={'align deleteFrame hover' + (isMobile ? '' : ' ml-2')} onClick={()=> deleteTrade(id)}><MinusOutlined className='align' /></div>
    )
}

export default DeleteTradeIcon;
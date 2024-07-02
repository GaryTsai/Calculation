import React from 'react'
import './style.css'
import { MinusOutlined } from '@ant-design/icons';


type CalProps = {
    id: number
    deleteTrade: Function;
};
  
const DeleteTradeIcon: React.FC<CalProps> = ({id, deleteTrade}) => {
    return (
        <div className='ml-2 align deleteFrame hover' onClick={()=> deleteTrade(id)}><MinusOutlined className='align' /></div>
    )
}

export default DeleteTradeIcon;
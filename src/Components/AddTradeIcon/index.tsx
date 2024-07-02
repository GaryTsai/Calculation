import React from 'react'
import './style.css'
import { PlusOutlined } from '@ant-design/icons';

type CalProps = {
    addTrade: Function;
};
  
const AddTradeIcon: React.FC<CalProps> = ({addTrade}) => {
    return (
        <div className='ml-2 align addFrame hover' onClick={()=> addTrade()}><PlusOutlined className='align' /></div>
    )
}

export default AddTradeIcon;
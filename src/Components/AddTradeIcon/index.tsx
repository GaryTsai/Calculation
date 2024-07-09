import React from 'react'
import './style.css'
import { PlusOutlined } from '@ant-design/icons';
import useRWD from '../../utils/useRWD';

type CalProps = {
    addTrade: Function;
};
  
const AddTradeIcon: React.FC<CalProps> = ({addTrade}) => {
    const device = useRWD()
    const isMobile =  device=== 'mobile'
    return (
        <div className={`align addFrame hover` + (isMobile ? '' : ' ml-2')} onClick={()=> addTrade()}><PlusOutlined className='align' /></div>
    )
}

export default AddTradeIcon;
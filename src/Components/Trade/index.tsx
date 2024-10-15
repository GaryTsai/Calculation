import { Input } from 'antd';
import './style.css'
import { useTranslation } from 'react-i18next';
import AddTradeIcon from '../AddTradeIcon';
import DeleteTradeIcon from '../DeleteTradeIcon';
import useRWD from '../../utils/useRWD';

type TradeProps = {
  num: number;
  listLength: number;
  index: number;
  price: string;
  sheet: string;
  inputPrice: Function;
  inputSheet: Function;
  addTrade: Function;
  deleteTrade: Function;
};

const Trade: React.FC<TradeProps> = ({num, listLength, index, price, sheet, inputPrice, inputSheet, addTrade, deleteTrade}) => {
  const { t } = useTranslation();
  const device = useRWD()
  const isMobile = device === 'mobile'
  return (
      <>
      <p className='serial-number'>{`${num}:`}</p>
      <div className="tradeStyle" style={{display: isMobile ? 'block' : 'flex'}}>
        <Input placeholder={t('singlePrice')} inputMode="decimal" style={{
          width: isMobile ? 'calc(100% - 34px)'　:'calc(48% - 34px)',
          margin: '1% 1% 1% 0%'
        }} value={price} type='number' onChange={(e) => inputPrice(num, e.target.value)}/> 
        <Input placeholder={t('numberOfSheets')} inputMode="decimal" style={{
          width: isMobile ? 'calc(100% - 34px)'　:'calc(48% - 34px)',
          margin: isMobile ? '1% 0% 1% 0%' : '1% 1% 1% 0%'
        }} value={sheet} type='number'onChange={(e) => inputSheet(num, e.target.value)}/>
        {index + 1 !== listLength && !isMobile && <DeleteTradeIcon id={num} deleteTrade={deleteTrade}/>}
        {index + 1 === listLength  && !isMobile && <AddTradeIcon addTrade={addTrade}/>}
      </div>
      </>
    );
  };
  
  export default Trade;
  
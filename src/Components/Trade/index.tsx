import { Input } from 'antd';
import './style.css'
import { useTranslation } from 'react-i18next';
import AddTradeIcon from '../AddTradeIcon';
import DeleteTradeIcon from '../DeleteTradeIcon';

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
  return (
      <>
      <p className='serial-number'>{`${num}:`}</p>
      <div className="tradeStyle">
        <Input placeholder={t('singlePrice')} style={{
          width: 'calc(48% - 34px)',
          margin: '1% 1% 1% 0%'
        }} value={price} onChange={(e) => inputPrice(num, e.target.value)}/> 
        <Input placeholder={t('numberOfSheets')} style={{
          width: 'calc(48% - 34px)',
          margin: '1% 1%'
        }} value={sheet} onChange={(e) => inputSheet(num, e.target.value)}/>
        {index + 1 !== listLength && <DeleteTradeIcon id={num} deleteTrade={deleteTrade}/>}
        {index + 1 === listLength  && <AddTradeIcon addTrade={addTrade}/>}
      </div>
      </>
    );
  };
  
  export default Trade;
  
import React from 'react';
import { Flex, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

    type RadioProps = {
        selectedMethod: Function;
        calculation_type: String;
    };

    const App: React.FC<RadioProps> = ({selectedMethod, calculation_type}) => {
        const { t } = useTranslation();
        const options = [
            {
                label: t('balanceAveragePrice'),
                value: 'balanceAveragePrice',
            },
            {
                label: t('balanceTargetPrice'),
                value: 'balanceTargetPrice',
            }
        ];
    return (<Flex vertical gap="middle">
        <Radio.Group defaultValue="a" buttonStyle="solid">
        {/* <Radio.Button value="b">損益平衡平均價格</Radio.Button>
        <Radio.Button value="a">損益平衡目標價格</Radio.Button> */}
        <Radio.Group options={options} onChange={(e)=>selectedMethod(e)} value={calculation_type} optionType="button" />
        </Radio.Group>
    </Flex>)
};

export default App;
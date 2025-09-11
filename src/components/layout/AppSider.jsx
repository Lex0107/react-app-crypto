import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
    padding: '1rem',
};

export default function AppSider() {
    const { loading, assets } = useContext(CryptoContext)

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                <Statistic // Render the Statistic component (from Ant Design) to display a formatted number with extra info
                    title={capitalize(asset.id)} // The title text shown above the number
                    value={asset.totalAmount} // The main numeric value to display
                    precision={2} // Number of decimal places to show (here: 2 decimals)
                    valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322'}} // Inline style for the value, setting the text color to green
                    prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />} // An icon displayed before the value (arrow pointing up)
                    suffix="$" // A suffix shown after the value, here the percent symbol
                />
                <List
                    size="small"
                    dataSource={[
                        {title: 'Total profit', value: asset.totalProfit, widthTag: true},
                        {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        // {title: 'Difference', value: asset.growPercent},
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <span>{item.title}</span>
                            <span>
                                {item.widthTag && 
                                <Tag color={asset.grow ? 'green' : 'red'}>
                                    {asset.growPercent}%
                                </Tag>
                                }
                                {item.isPlain ? <span>{item.value}</span>: <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                            </span>
                            {/* {item.isPlain && <span>{item.value}</span>}
                            {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>} */}
                        </List.Item>
                    )}
                />
            </Card>
            ))}
            {/* <Card>
                <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                />
            </Card> */}
        </Layout.Sider>
    )
}
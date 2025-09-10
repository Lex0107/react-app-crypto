import { Layout, Card, Statistic, List, Typography, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fakeFetchCrypto, FetchAssets } from '../../api';
import { percentDifference } from '../../utils';

const siderStyle = {
    padding: '1rem',
};

export default function AppSider() {
    const [loading, SetLoading] = useState(false)
    const [crypto, SetCrypto] = useState([])
    const [assets, SetAssets] = useState([])

    useEffect(() => {
        async function preload () {
            SetLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await FetchAssets()

            SetAssets(assets.map(asset =>{
                const coin = result.find((c) => c.id === asset.id)
                return{
                    grow: asset.price < coin.price, //boolean
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmout: asset.amout * coin.price,
                    totalProfit: asset.amout * coin.price - asset.amout * asset.price,
                    ...asset
                }
            }))
            SetCrypto(result)
            SetLoading(false)
        }
        preload()
    }, [])

    if(loading){
        <Spin fullscreen />
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                <Statistic // Render the Statistic component (from Ant Design) to display a formatted number with extra info
                    title={asset.id} // The title text shown above the number
                    value={asset.totalAmout} // The main numeric value to display
                    precision={2} // Number of decimal places to show (here: 2 decimals)
                    valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322'}} // Inline style for the value, setting the text color to green
                    prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />} // An icon displayed before the value (arrow pointing up)
                    suffix="$" // A suffix shown after the value, here the percent symbol
                />
                <List
                    size="small"
                    dataSource={[
                        {title: 'Total profit', value: asset.totalProfit},
                        {title: 'Asset Amout', value: asset.amout, isPlain: true},
                        {title: 'Difference', value: asset.growPercent},
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <span>{item.title}</span>
                            {item.isPlain && <span>{item.value}</span>}
                            {!item.isPlain && <span>{item.value.toFixed(2)}$</span>}
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
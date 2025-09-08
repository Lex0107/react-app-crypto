import { Layout, Card, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const siderStyle = {
    padding: '1rem',
};

export default function AppSider() {
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Card style={{ marginBottom: '1rem' }}>
                <Statistic // Render the Statistic component (from Ant Design) to display a formatted number with extra info
                    title="Active" // The title text shown above the number
                    value={11.28} // The main numeric value to display
                    precision={2} // Number of decimal places to show (here: 2 decimals)
                    valueStyle={{ color: '#3f8600' }} // Inline style for the value, setting the text color to green
                    prefix={<ArrowUpOutlined />} // An icon displayed before the value (arrow pointing up)
                    suffix="%" // A suffix shown after the value, here the percent symbol
                />
            </Card>
            <Card>
                <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                />
            </Card>
        </Layout.Sider>
    )
}
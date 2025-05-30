import { ConfigProvider } from 'antd'
import { AntdConfigsTheme } from './constants/AntdConfigs'
import Main from './views/Main/Main'

export default function App() {
  return (
    <ConfigProvider theme={AntdConfigsTheme}>
      <Main />
    </ConfigProvider>
  )
}

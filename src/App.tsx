
import { Layout, theme } from "antd"
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home"
import Page404 from "./pages/404/404"



const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (<Layout >


    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 400,
        background: colorBgContainer,
      }}
    >
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="*" Component={Page404}></Route>
      </Routes>

    </Content>

  </Layout>
  )
}


export default App;
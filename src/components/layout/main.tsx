import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { Header } from "antd/es/layout/layout";
import { useAppDispatch } from "../../redux/hooks";
import { removeCredentials } from "../../redux/features/auth/authslice";

const { Content, Footer } = Layout;

const MainLayOut = () => {
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button
            onClick={() => dispatch(removeCredentials())}
            style={{ float: "right", marginRight: "20px", marginTop: "17px" }}>
            Logout
          </Button>
        </Header>
        {/* <Header style={{ padding: 0 }} /> */}
        <Content style={{ margin: "24px 16px 0" } }>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          University of Village ©{new Date().getFullYear()} Created by Hayat
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayOut;

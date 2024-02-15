import MainLayOut from "./components/layout/main";
import PrivateRoutes from "./routes/private.routes";

function App() {
  return (
    <PrivateRoutes>
      <MainLayOut />
    </PrivateRoutes>
  );
}

export default App;

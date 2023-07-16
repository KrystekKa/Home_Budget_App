import '../css/App.scss';
import Loading from "./loading_screen";
import Login from "./login";
import Menu from "./Menu";

function App() {
  return (
    <>
        <Loading />
        <Login />
        <Menu />
    </>
  );
}

export default App;

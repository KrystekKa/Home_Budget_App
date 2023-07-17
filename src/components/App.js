import '../css/App.scss';
import Loading from "./loading_screen";
import Login from "./login";
import Menu from "./Menu";
import Home from "./Home";

function App() {
  return (
    <>
        <Loading />
        <Login />
        <Home />
    </>
  );
}

export default App;

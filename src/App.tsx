import styles from "./App.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CodeCell from "./components/CodeCell/CodeCell";
import TextCell from "./components/TextCell/TextCell";
import "./scss/index.scss";
import CellList from "./components/CellList/CellList";
import Banner from "./components/Banner/Banner";
function App() {
  return (
    <div className={styles.App}>
      <Banner />
      <CellList />
    </div>
  );
}

export default App;

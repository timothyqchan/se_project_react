import logo from "./logo.svg";
import "./App.css";
import ItemModal from "./ItemModal/ItemModal";
import Header from "./Header/Header";
import WeatherCard from "./WeatherCard/WeatherCard";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={true} type="clear" />
        <section id="card-section">card section</section>
      </main>
    </div>
  );
}

export default App;

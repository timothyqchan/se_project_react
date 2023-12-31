import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import React, { useEffect, useState } from "react";
import {
  getForcastWeather,
  parseWeatherData,
  parseLocationData,
} from "../../util/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLoaction] = useState("");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForcastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
      const name = parseLocationData(data);
      setLoaction(name);
    });
  }, []);

  return (
    <div>
      <Header locationName={location} onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "create"}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          name="previewGarment"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;

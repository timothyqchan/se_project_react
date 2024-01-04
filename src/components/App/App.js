import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { fetchAllClothing, addNewItem, deleteItem } from "../../utils/api";
import {
  getForcastWeather,
  parseWeatherData,
  parseLocationData,
} from "../../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [location, setLocation] = useState("");
  const [clothingItems, setClothingItems] = useState([]);

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

  const onAddItem = (values) => {
    console.log(values);
    addNewItem(values)
      .then((item) => {
        const newItemList = Array.from(clothingItems);
        newItemList.unshift(item);
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.log("Error:", err));
  };

  const openConfirmationModal = (e) => {
    handleCloseModal();
    setActiveModal("confirm");
  };

  const onDeleteItem = (e) => {
    e.preventDefault();
    deleteItem(selectedCard._id)
      .then(() => {
        const newItemList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.log("Error:", err));
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const name = parseLocationData(data);
        setLocation(name);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchAllClothing()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error: An error occurred", error);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header locationName={location} onCreateModal={handleCreateModal} />
      <Switch>
        <Route path="/profile">
          <Profile
            handleCloseModal={handleCloseModal}
            onCreateModal={handleCreateModal}
            onAddItem={onAddItem}
            onDeleteItem={openConfirmationModal}
            onSelectCard={handleSelectedCard}
            clothingItems={clothingItems}
          />
        </Route>
        <Route exact path="/se_project_react">
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            setClothingItems={clothingItems}
          />
        </Route>
      </Switch>
      <Footer />
      {activeModal === "create" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "create"}
          onAddItem={onAddItem}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          name="previewGarment"
          onClose={handleCloseModal}
          openConfirmationModal={openConfirmationModal}
        />
      )}
      {activeModal === "confirm" && (
        <DeleteConfirmationModal
          selectedCard={selectedCard}
          name="deleteConfirm"
          onClose={handleCloseModal}
          onDeleteItem={onDeleteItem}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

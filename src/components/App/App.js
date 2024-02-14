// Components
import ItemModal from "../ItemModal/ItemModal";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// CSS
import "./App.css";

// React dependencies
import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

// API
import {
  getClothingItem,
  addNewItem,
  deleteItem,
  profileUpdate,
} from "../../utils/api";
import {
  getForcastWeather,
  parseWeatherData,
  parseLocationData,
} from "../../utils/weatherApi";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

// Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [location, setLocation] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const openConfirmationModal = (e) => {
    handleCloseModal();
    setActiveModal("confirm");
  };

  const handleRegisterModal = () => {
    setActiveModal("registerModal");
  };

  const handleLoginModal = () => {
    setActiveModal("loginModal");
  };

  const handleEditProfileModal = () => {
    setActiveModal("profileModal");
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

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          auth
            .checkToken(res.token)
            .then((data) => {
              setCurrentUser(data.data);
              setIsLoggedIn(true);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  }

  function handleRegistration({ email, password, name, avatar }) {
    auth
      .registration(email, password, name, avatar)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          auth
            .checkToken(res.token)
            .then((data) => {
              setCurrentUser(data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleEditUser = ({ name, avatar }) => {
    console.log(name, avatar);
    profileUpdate(name, avatar)
      .then(({ data }) => {
        setCurrentUser(data);
        handleCloseModal();
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if ({ jwt }) {
      localStorage.setItem("jwt", jwt);
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const history = useHistory("");
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/");
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    console.log(id);
    console.log(isLiked);
    !isLiked
      ? api
          .addCardLike(id, token)
          .then(({ data: updatedCard }) => {
            console.log(updatedCard);
            setCards((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then(({ data: updatedCard }) => {
            setCards((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err));
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
        getClothingItem()
          .then((data) => {
            setClothingItems(data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect(() => {
  //   getClothingItem()
  //     .then((items) => {
  //       setClothingItems(items);
  //     })
  //     .catch((error) => {
  //       console.error("Error: An error occurred", error);
  //     });
  // }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            locationName={location}
            onCreateModal={handleCreateModal}
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            onSelectCard={handleSelectedCard}
            isLoggedIn={isLoggedIn}
          />
          <ToggleSwitch />
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              setClothingItems={clothingItems}
              isLoggedIn={isLoggedIn}
              onCardLike={handleCardLike}
            />
          </Route>
          <ProtectedRoute path="/profile">
            isLoggedIn={isLoggedIn}
            component=
            {() => (
              <Profile
                handleCloseModal={handleCloseModal}
                onCreateModal={handleCreateModal}
                onAddItem={onAddItem}
                onDeleteItem={openConfirmationModal}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                isLoggedIn={isLoggedIn}
                handleEditProfileModal={handleEditProfileModal}
                handleLogout={handleLogout}
              />
            )}
          </ProtectedRoute>
          <Footer />
          {activeModal === "profileModal" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              onSubmit={handleEditUser}
            />
          )}
          {activeModal === "registerModal" && (
            <RegisterModal
              isOpen={activeModal === "create"}
              handleCloseModal={handleCloseModal}
              handleLoginModal={handleLoginModal}
              handleCreateModal={handleCreateModal}
              onSubmit={handleRegistration}
            />
          )}
          {activeModal === "loginModal" && (
            <LoginModal
              isOpen={activeModal === "create"}
              handleCloseModal={handleCloseModal}
              handleRegisterModal={handleRegisterModal}
              onSubmit={handleLogin}
            />
          )}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

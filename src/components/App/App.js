//* Components
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

//* CSS
import "./App.css";
import "../Header/Header.css";
import "../ItemCard/ItemCard.css";
import "../Footer/Footer.css";

//* Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

//* React dependencies
import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";

//* Api imports
import {
  getForecastWeather,
  parseWeather,
  parseWeatherCity,
} from "../../utils/weatherApi";
import { getClothingItem, addNewItem, deleteItem } from "../../utils/api";
import { profileUpdate } from "../../utils/auth";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  //* States
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemerpatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCreateModal = () => {
    setActiveModal("create");
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

  const handleConfirmModal = () => {
    setActiveModal("confirmModal");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeather(data);
        const location = parseWeatherCity(data);
        setTemp(temperature);
        setCity(location);
        getClothingItem()
          .then((data) => {
            setCards(data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") {
      setCurrentTemerpatureUnit("F");
    } else {
      setCurrentTemerpatureUnit("C");
    }
  };

  const onAddItem = ({ name, imageUrl, weather }) => {
    addNewItem({ name, imageUrl, weather })
      .then((res) => {
        setCards([res.data, ...cards]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = (e) => {
    e.preventDefault();
    handleCloseModal();
    deleteItem(selectedCard._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== selectedCard._id));
        handleCloseModal();
      })
      .catch((err) => console.error(err));
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
          setIsLoggedIn(jwt !== "" ? true : false);
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(`Token Check use effect: ${err}`);
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
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then(({ data: updatedCard }) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            location={city}
            handleCreateModal={handleCreateModal}
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            onSelectCard={handleSelectedCard}
            isLoggedIn={isLoggedIn}
          >
            <ToggleSwitch />
          </Header>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              cards={cards}
              onSelectCard={handleSelectedCard}
              isLoggedIn={isLoggedIn}
              onCardLike={handleCardLike}
            />
          </Route>
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={() => (
              <Profile
                onSelectCard={handleSelectedCard}
                openModal={handleCreateModal}
                handleEditProfileModal={handleEditProfileModal}
                handleLogout={handleLogout}
                cards={cards}
                isLoggedIn={isLoggedIn}
                onCardLike={handleCardLike}
              />
            )}
          ></ProtectedRoute>
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
              title="New Garmet"
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={onAddItem}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              handleConfirmModal={handleConfirmModal}
              handleCloseModal={handleCloseModal}
            />
          )}
          {activeModal === "confirmModal" && (
            <ConfirmModal
              handleCloseModal={handleCloseModal}
              handleDeleteCard={handleDeleteCard}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

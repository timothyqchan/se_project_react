import "./ItemCard.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import likeButton from "../../images/card-like-button.svg";
import likeButtonActive from "../../images/card-like-button-active.svg";

const ItemCard = ({ item, onSelectCard, isLoggedIn, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  return (
    <div className="card">
      <div className="card__container">
        <div className="card__container-top">
          <div className="card__name-frame">
            <h2 className="card__name">{item.name}</h2>
          </div>
          {isLoggedIn ? (
            <button
              onClick={() => onCardLike(item._id, isLiked)}
              className="card__like-wrapper"
            >
              <img
                src={isLiked ? likeButtonActive : likeButton}
                alt="like button"
                className="card__like"
              />
            </button>
          ) : (
            ""
          )}
        </div>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectCard(item)}
        />
      </div>
    </div>
  );
};

export default ItemCard;

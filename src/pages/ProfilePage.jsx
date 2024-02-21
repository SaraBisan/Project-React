import { useCallback, useEffect, useState } from "react";
import FooterComponent from "../layout/footer/FooterComponent";
import CardComponent from "../components/CardComponent";
import { useUser } from "../store/loginContext";
import axios from 'axios'
import Grid from "@mui/material/Grid";

import ROUTES from "../routes/ROUTES";
import { useNavigate } from 'react-router-dom'
const ProfilePage = () => {

  const [selectedTab, setSelectedTab] = useState("About")
  const {
    favorites,
    myCards,
    likeToggle,
    removeMyCard,
    user
  } = useUser()
  const navigate = useNavigate()
  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleDeleteCard = async (id) => {
    await removeMyCard(id)
  };


  const handleLikeCard = async (card) => {
    try {
      let { data } = await axios.patch("/cards/" + card._id);
      likeToggle(card)
    } catch (err) {
      console.log("error from axios (like)", err);
    }
  };
  const ShowingContent = useCallback(() => {
    switch (selectedTab) {
      case "About":
        return <>
          <h3>Personal info</h3>
          <div>
            First Name: {user.name?.first}
            <br />
            Last Name: {user.name?.last}
            <br />
            email: {user.email}
          </div>

        </>
      case "Favorites":
        return <>
          <h3>Favorites</h3>
          {favorites?.length <= 0 && <div>No Favorites yet...</div>}
          {favorites?.map((item, index) => (
            <Grid item lg={3} md={6} xs={12} key={"carsCard" + index}>
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                address={item.address}
                cardNumber={item.bizNumber}
                liked={true}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
                onLike={() => {
                  handleLikeCard(item)
                }}
              />
            </Grid>
          ))}
        </>
      case "My-Cards":
        return <>
          <h3>My Cards</h3>
          {myCards?.length <= 0 && <div>No Cards created yet...</div>}
          {myCards?.map((item, index) => (
            <Grid item lg={3} md={6} xs={12} key={"carsCard" + index}>
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                address={item.address}
                cardNumber={item.bizNumber}
                liked={item.liked}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
                onLike={() => {
                  handleLikeCard(item)
                }}
              />
            </Grid>
          ))}
        </>
    }
  }, [selectedTab, favorites, myCards])

  return <div>
    <h1> Profile Page</h1>
    <div style={{ minHeight: '300px' }}>
      <ShowingContent />

    </div>
    <FooterComponent onTabSelect={setSelectedTab} selectedTab={selectedTab} />
  </div>
};

export default ProfilePage;

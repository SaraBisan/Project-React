import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateSchema from "../../validation/cardValidation";
import LoginContext, { useUser } from "../../store/loginContext";
import { fromServer, normalizeCard } from "./normalizeEdit";
import { useLocation } from 'react-router-dom'
import ROUTES from "../../routes/ROUTES";
import { toast } from 'react-toastify'
import { useCardService } from "../../services/cardService";
const EditCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });
  let { id } = useParams(); //get id from url
  const { user, addMyCard } = useUser();

  const { createCard, editCard } = useCardService()
  useEffect(() => {
    if (!id || !user) {
      return;
    }
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        if (data.user_id == user._id) {
        } else {

        }

        setInputsValue(fromServer(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, user]);
  let keysArray = Object.keys(inputsValue);

  const handleInputsChange = (e) => {
    console.log(e.target.value)
    console.log(e.target.id)
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };
  useEffect(() => {
    console.log(inputsValue)
  }, [inputsValue])

  const handleInputsBlur = (e) => {
    try {
      const { error } = validateSchema[e.target.id]({
        [e.target.id]: inputsValue[e.target.id],
      });
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [e.target.id]: error.details[0].message,
        }));
      } else {
        setErrors((prevErrors) => {
          const { [e.target.id]: omit, ...restErrors } = prevErrors;
          return { ...restErrors };
        });
      }
    } catch (e) { }
  };

  const { pathname } = useLocation()
  const hasError = () => {
    return Object.entries(errors).filter(([k, v]) => v !== undefined && v.length > 0).length > 0
  }

  const isCreatePage = () => pathname.includes(ROUTES.CREATECARD)
  const submit = async () => {

    const isCreate = isCreatePage()
    if (hasError()) {
      toast.error(`🦄 Error while ${isCreate ? "Creating" : "Editing"} card, please check all fields`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }

    if (isCreate) {
      console.log(inputsValue)
      const newCard = await createCard(normalizeCard(inputsValue))
      if (newCard._id)
        await addMyCard(newCard)
    } else {
      const newCard = await editCard(id, normalizeCard(inputsValue))
      if (newCard._id)
        await addMyCard(newCard)
    }
  }

  return (
    <Box

      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isCreatePage() ? "Create Card" : "Edit Your card"}
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
            />
          ))}
        </Grid>
      </Box>
      <Button
        type="submit"
        fullWidth
        onClick={submit}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={hasError()}
      >
        {isCreatePage() ? "Create" : "Save changes"}
      </Button>
    </Box>
  );
};
export default EditCardPage;

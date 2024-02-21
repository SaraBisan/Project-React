import { useUser } from "../store/loginContext"
import { toast } from 'react-toastify'
import axios from "axios";




export const useCardService = () => {
    const { token } = useUser()

    return {
        async editCard(cardId, newCardInfo) {
            try {
                const { data } = await axios.put(`cards/${cardId}`, newCardInfo)
                console.log(data)
                toast.success(`🦄  Changes saved successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return data
            } catch (err) {
                const errByFieldIfExists = err.response.data.split("Joi Error:")[1]
                let error = "editing failed, please try again later";
                if (errByFieldIfExists) {
                    console.log("The fields: ", JSON.stringify(newCardInfo))
                    error = errByFieldIfExists
                }
                toast.error(`🦄 Error while editing card: ${error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        },
        async createCard(card) {
            try {
                const { data } = await axios.post("cards/", card)
                toast.success(`🦄  Created a card successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return data
            } catch (err) {
                const errByFieldIfExists = err.response.data.split("Joi Error:")[1]
                let error = "Creating card failed, please try again later";
                if (errByFieldIfExists) {
                    console.log("The fields: ", JSON.stringify(card))
                    error = errByFieldIfExists
                }
                toast.error(`🦄 Error while creating card: ${error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }
}

import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import normalizeCards from "../pages/HomePage/normalizeHome";
import { toast } from 'react-toastify'
const LoginContext = createContext(null);


export const LoginContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const [finishAutoLogin, setFinishAutoLogin] = useState(false);
    const [token, setToken] = useState()

    const [favorites, setFavorites] = useState([])
    const [myCards, setMyCards] = useState([])
    const [allCards, setAllCards] = useState()


    const addMyCard = (card) => {
        setMyCards([...myCards, card])
    }
    const removeMyCard = async (cardId) => {
        try {
            await axios.delete(`/cards/${cardId}`)
            toast.success(`🦄 Removed card successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setMyCards(myCards.filter(c => c._id !== cardId))
        } catch (e) {
            toast.error(`🦄 Could not delete card, only admins and owning users can delete cards.. ${e.message}`, {
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
    const likeToggle = (card) => {
        if (favorites?.find(c => c._id === card._id)) {
            setFavorites(favorites.filter(c => (c._id !== card._id)))
        } else {
            setFavorites([...favorites, card])
        }
    }


    useEffect(() => {
        if (user) {
            const fetchFavorites = async () => {
                const norm = normalizeCards

                try {
                    const { data } = await axios.get("/cards")
                    const normalized = norm(data, user._id)
                    setAllCards(normalized)
                    const filtered_liked = normalized.filter(c => c.liked)
                    const filtered_own = normalized.filter(c => c.user_id === user._id)
                    console.log(filtered_liked)
                    setMyCards(filtered_own)
                    setFavorites(filtered_liked)

                } catch (e) {
                    console.log(e)
                }
            }
            fetchFavorites()

        } else {
            setFavorites([])
        }
    }, [user])
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            setFinishAutoLogin(true);
            return;
        }
        setToken(token)
        let userData = jwtDecode(token);
        if (!userData || !userData._id) {
            setFinishAutoLogin(true);
            return;
        }
        axios
            .get("/users/" + userData._id)
            .then(({ data }) => {
                setUser(data);
                setFinishAutoLogin(true);
            })
            .catch((err) => {
                setFinishAutoLogin(true);
            });
    }, []);

    const isLoggedIn = () => {
        return user !== undefined && user !== null
    }

    const logOut = () => {
        setUser(undefined)
        setToken(undefined)
        localStorage.removeItem('token')
    }

    return <LoginContext.Provider value=
        {{
            user,
            setUser,
            finishAutoLogin,
            isLoggedIn,
            logOut,
            likeToggle,
            addMyCard,
            removeMyCard,
            favorites,
            myCards,
            token
        }}>
        {children}
    </LoginContext.Provider>
}


export const useUser = () => {
    /**
     * 
     * 
     * @type {{
     *  favorites: any[],
     *  myCards: any[],
     *  likeToggle:(card:any) => void
     *  addMyCard : (card: any) => void
     *  removeMyCard: (card:any) => void
     *  token: string | undefined,
     *  user: {
     *          _id:string,
     *           phone: string,
     *           name: {
    *               first: string
    *               middle: string
    *               last: string
    *               _id: string
     *           },
     *           image: {
    *               url: string
    *               alt: string
    *               _id: string
     *           },   
     *           email:string,
     *           isBusiness: boolean,
     *           isAdmin: boolean, 
    *            classCode: string
    *            createdAt: string
     *           address: {
        *           state: string
        *           country: string
        *           city: string
        *           street: string
        *           houseNumber: number
        *           zip: number
        *           _id: string
     *          }}
     *  setUser: (x:any) => void
    *   finishAutoLogin: boolean
     *  isLoggedIn: () => boolean
    * logOut: () => void
     * }}
     */
    const context = useContext(LoginContext)

    return context
}

export default LoginContext;

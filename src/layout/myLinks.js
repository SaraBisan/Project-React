import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About Us" },
];
const loggedInLinks = [{ to: "/profile", children: "Profile" }];
const bizLinks = [{ to: ROUTES.CREATECARD, children: "Create Card" }];
const loggedOutLinks = [
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };

const fromServer = (dataFromServer) => {
  return {
    title: dataFromServer.title,
    subTitle: dataFromServer.subtitle,
    description: dataFromServer.description,
    phone: dataFromServer.phone,
    email: dataFromServer.email,
    web: dataFromServer.web,
    url: dataFromServer.image.url,
    alt: dataFromServer.image.alt,
    state: dataFromServer.address.state,
    country: dataFromServer.address.country,
    city: dataFromServer.address.city,
    street: dataFromServer.address.street,
    houseNumber: dataFromServer.address.houseNumber,
    zip: dataFromServer.address.zip,
  };
};

function normalizeCard(input) {
  return {
    title: input.title || "",
    subtitle: input.subTitle || "",
    description: input.description || "",
    phone: input.phone || "",
    email: input.email || "",
    web: input.web || "",
    image: {
      url: input.url || "",
      alt: input.alt || ""
    },
    address: {
      state: input.state || "",
      country: input.country || "",
      city: input.city || "",
      street: input.street || "",
      houseNumber: input.houseNumber || "",
      zip: input.zip || ""
    }
  };
}




export { fromServer, normalizeCard };

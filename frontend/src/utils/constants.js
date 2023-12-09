export const dining_hall = ["De Neve", "Bruin Plate", "Epicuria"];
export const meal_period = ["Breakfast", "Lunch", "Dinner"];

export const proxy_server = "https://api-m46o.onrender.com";

// navbar items to route to
export const mainNavbarItems = [
  {
    id: 0,
    label: "Home",
    route: "home",
  },
  {
    id: 1,
    label: "Profile",
    route: "profile",
  },
  {
    id: 2,
    label: "Messages",
    route: "messages",
  },
  {
    id: 3,
    label: "Login",
    route: "login",
  },

  {
    id: 4,
    label: "Register",
    route: "register",
  },
];

// for use in testing with API fetching
export const placeholderPosts = [
  {
    title: "Bruin Plate",
    hall: "Bruin_Plate",
    meal_period: "Lunch",
    content: "lorem iosum",
    image_url: "https://bruinplate.hh.ucla.edu/img/Home_Slide_MOC.jpg",
    author_username: "Bob",
    id: 1,
  },
  {
    title: "Epicuria",
    hall: "Epicuria",
    meal_period: "Dinner",
    content: "lorem iosum",
    image_url:
      "https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png",
    author: "John",
    id: 2,
  },
  {
    title: "De Neve",
    hall: "De_Neve",
    meal_period: "Breakfast",
    content: "lorem iosum",
    image_url:
      "https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png",
    author: "Smith",
    id: 3,
  },
];

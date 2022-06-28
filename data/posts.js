import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl: require("../assets/posts/4.jpg"),
    user: USERS[0].user,
    likes: 78976,
    caption:
      "A paragraph is a group of related sentences that support one main idea. In general, paragraphs consist of three parts: the topic sentence, body sentences, and the concluding or the bridge sentence to the next paragraph or section.",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "Mukhtar",
        comment: "Excellent work.",
      },
      {
        user: "Hafiz",
        comment: "wow! it is great.",
      },
      {
        user: "Bashir",
        comment: "You are the best.",
      },
    ],
  },
  {
    imageUrl: require("../assets/posts/6.jpg"),
    user: USERS[1].user,
    likes: 76,
    caption: "It is amazing app!",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "Ramazan",
        comment: "Best of luck bro!",
      },
    ],
  },
];

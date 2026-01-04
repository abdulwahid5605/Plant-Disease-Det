import {
  LuLeaf,
  LuUsers,
  LuBook,
  LuPhone,
} from "react-icons/lu";
import { GiWaterDrop } from "react-icons/gi";
import { MdHistoryEdu } from "react-icons/md";
import { FaHeart, FaUsers } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiBookLine } from "react-icons/ri";
import { BiBookContent } from "react-icons/bi";
const articles = [
  {
    id: 1,
    title: "How to Identify Early Signs of Leaf Diseases",
    excerpt: "Learn the most common symptoms that help farmers detect plant diseases early and prevent crop loss.",
    image: "/plant_disease_1.jpg",
  },
  {
    id: 2,
    title: "Top 5 Techniques to Maintain Plant Health",
    excerpt: "Explore five effective strategies to improve plant growth and reduce the chances of infection.",
    image: "/plant_disease_2.jpeg",
  },
  {
    id: 3,
    title: "Why Soil Quality Matters for Healthy Plants",
    excerpt: "Understand how soil nutrients and structure impact plant immunity and disease resistance.",
    image: "/plant_disease_3.jpg",
  },
  {
  id: 4,
  title: "Common Fungal Diseases and How to Treat Them",
  excerpt: "Discover the most widespread fungal infections in plants and the best methods to control them effectively.",
  image: "/plant-article4.jpeg",
},
{
  id: 5,
  title: "The Role of Watering in Preventing Plant Diseases",
  excerpt: "Learn how proper watering techniques can protect plants from root rot and other water-related diseases.",
  image: "/plant-article5.jpeg",
},
{
  id: 6,
  title: "How Climate Conditions Affect Plant Disease Spread",
  excerpt: "Explore how temperature, humidity, and weather patterns influence the development of plant diseases.",
  image: "/plant-article6.jpeg",
},
{
  id: 7,
  title: "Best Organic Solutions for Plant Disease Control",
  excerpt: "A guide to natural and eco-friendly treatments that help manage plant diseases without harmful chemicals.",
  image: "/plant-article7.jpeg",
},
{
  id: 8,
  title: "Understanding Pest-Related Plant Diseases",
  excerpt: "Identify how insects contribute to plant infections and learn ways to protect your crops from pest damage.",
  image: "/plant-article8.jpeg",
},
{
  id: 9,
  title: "How AI Is Transforming Modern Plant Disease Detection",
  excerpt: "See how artificial intelligence helps farmers detect diseases faster and make data-driven decisions.",
  image: "/plant-article9.jpeg",
}

];

const faqItems = [
  {
    value: "a",
    title: "How accurate is the AI disease detection?",
    text: "Our AI model provides high-accuracy results with detailed information about plant diseases.",
  },
  {
    value: "b",
    title: "How do I post a plant in the marketplace?",
    text: "Simply login, go to the marketplace section, click 'Add Plant', and fill in the details.",
  },
  {
    value: "c",
    title: "Can I contact the seller directly?",
    text: "Yes, you can see the seller's contact information and reach them directly through the app.",
  },
  {
  value: "d",
  title: "Is the app free to use?",
  text: "Yes, the app is free to use with optional premium features for advanced tools and insights.",
},
{
  value: "e",
  title: "What types of plants are supported for disease detection?",
  text: "The AI supports a wide range of common crops, indoor plants, and garden plants, with more being added regularly.",
},
];

const features = [
  {
    id: 1,
    title: "AI Disease Detection",
    description: "Upload a plant image and get instant disease detection results.",
    icon: LuLeaf,
  },
  {
    id: 2,
    title: "Marketplace",
    description: "Buy and sell plants, contact sellers directly, and explore listings.",
    icon: LuUsers,
  },
  {
    id: 3,
    title: "Articles",
    description: "Read articles about plant care, disease prevention, and tips.",
    icon: LuBook,
  },
  {
    id: 4,
    title: "Contact Us",
    description: "Reach out to us through the contact form for support or inquiries.",
    icon: LuPhone,
  },
  {
    id: 5,
    title: "Plant Care Tips",
    description: "Get daily guidance on watering, sunlight, and soil requirements.",
    icon: GiWaterDrop,
  },
  {
    id: 6,
    title: "Disease History",
    description: "Track plant health over time and view past detections.",
    icon: MdHistoryEdu,
  },
  {
    id: 7,
    title: "Marketplace Favorites",
    description: "Save listings of plants you like for later.",
    icon: FaHeart,
  },
  {
    id: 8,
    title: "Notifications",
    description: "Receive alerts for messages, listings, and updates.",
    icon: IoNotificationsOutline,
  },
  {
    id: 9,
    title: "AI Suggestions",
    description: "Get plant recommendations based on climate and preferences.",
    icon: LuLeaf,
  },
  {
    id: 10,
    title: "Community Forum",
    description: "Discuss plant care and share experiences with others.",
    icon: FaUsers,
  },
  {
    id: 11,
    title: "Plant Journal",
    description: "Maintain logs for watering, growth, and treatments.",
    icon: RiBookLine,
  },
  {
    id: 12,
    title: "Tutorials & Guides",
    description: "Follow step-by-step planting and care guides.",
    icon: BiBookContent,
  },
];

const marketplacePosts = [
  {
    id: "1",
    title: "Snake Plant",
    price: 1200,
    image: "/market-plant-1.jpg",
    description: "Low maintenance indoor plant",
  },
  {
    id: "2",
    title: "Money Plant",
    price: 800,
    image: "/market-plant-2.jpg",
    description: "Brings positivity and fresh air",
  },
  {
    id: "3",
    title: "Aloe Vera",
    price: 600,
    image: "/market-plant-3.jpg",
    description: "Medicinal and easy to grow",
  },
  {
    id: "4",
    title: "Snake Plant",
    price: 1200,
    image: "/market-plant-1.jpg",
    description: "Low maintenance indoor plant",
  },
  {
    id: "5",
    title: "Money Plant",
    price: 800,
    image: "/market-plant-2.jpg",
    description: "Brings positivity and fresh air",
  },
  {
    id: "6",
    title: "Aloe Vera",
    price: 600,
    image: "/market-plant-3.jpg",
    description: "Medicinal and easy to grow",
  },
];


const data = {
  articles,
  faqItems,
  features,
  marketplacePosts
};

export default data;

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
    excerpt:"Leaves are often the first part of a plant to show signs of disease. Early identification of leaf diseases is critical for preventing serious crop damage and yield loss. Farmers and gardeners who regularly monitor plant leaves can take timely action before the disease spreads.Common early symptoms include yellowing, browning, irregular spots, curled edges, holes, and discoloration. Some diseases produce white powdery coatings, black specks, or water-soaked lesions on leaf surfaces. These symptoms may indicate fungal, bacterial, or viral infections.Regular inspection should focus on both the upper and underside of leaves, as many pathogens develop underneath. Removing infected leaves immediately, improving air circulation, and applying appropriate treatments can significantly reduce disease spread. Early detection is the key to maintaining healthy crops and minimizing economic loss. ",
    image: "/plant_disease_1.jpg",
  },
  {
    id: 2,
    title: "Top 5 Techniques to Maintain Plant Health",
    excerpt: "Maintaining plant health is the most effective way to prevent diseases. Healthy plants have stronger immune systems and are more resistant to infections. Below are five proven techniques to ensure long-term plant vitality.First, proper watering is essential. Overwatering can cause root rot, while underwatering weakens plants. Second, balanced nutrition provides plants with essential nutrients needed for growth and defense. Third, good air circulation prevents moisture buildup that encourages fungal diseases.Fourth, regular pruning helps remove dead or infected plant parts, reducing disease sources. Finally, maintaining healthy soil with organic matter and proper drainage supports strong root development. By following these techniques consistently, plants remain productive and resilient. ",
    image: "/plant_disease_2.jpeg",
  },
  {
    id: 3,
    title: "Why Soil Quality Matters for Healthy Plants",
    excerpt: "Soil quality plays a foundational role in plant health. It is not just a growing medium but a living ecosystem that provides nutrients, water, and support to plants. Poor soil quality directly weakens plant immunity and increases disease susceptibility.Healthy soil contains essential nutrients, good structure, proper drainage, and beneficial microorganisms. These microorganisms help plants absorb nutrients and fight pathogens naturally. Compacted or nutrient-deficient soil limits root growth and creates stress, making plants vulnerable to infections.Improving soil quality through composting, organic fertilizers, crop rotation, and soil testing ensures long-term plant health. Strong roots grown in healthy soil lead to stronger plants with better disease resistance.",
    image: "/plant_disease_3.jpg",
  },
  {
  id: 4,
  title: "Common Fungal Diseases and How to Treat Them",
  excerpt: "Fungal diseases are among the most widespread plant health problems worldwide. Common fungal infections include powdery mildew, leaf spot, rust, blight, and root rot. These diseases thrive in humid environments with poor air circulation.Symptoms often appear as white or gray powdery growth, dark spots, wilting, or decaying roots. If left untreated, fungal diseases can rapidly spread across plants and fields.Effective treatment includes removing infected plant parts, improving airflow, reducing excess moisture, and applying fungicides or organic alternatives such as neem oil. Preventive care, including proper spacing and watering practices, is essential to controlling fungal outbreaks.",
  image: "/plant-article4.jpeg",
},
{
  id: 5,
  title: "The Role of Watering in Preventing Plant Diseases",
  excerpt: "Watering practices have a direct impact on plant disease development. Improper watering is one of the most common causes of plant health issues. Excess water creates favorable conditions for fungal and bacterial infections, especially in roots.Overwatering leads to oxygen deprivation in the soil, causing root rot and weakening plants. On the other hand, underwatering stresses plants and reduces their natural defenses. The best approach is to water deeply but less frequently, allowing soil to dry slightly between watering sessions.Watering early in the morning, avoiding wet leaves, and ensuring proper drainage can significantly reduce disease risks. Efficient irrigation systems such as drip irrigation provide precise water delivery and help maintain plant health.",
  image: "/plant-article5.jpeg",
},
{
  id: 6,
  title: "How Climate Conditions Affect Plant Disease Spread",
  excerpt: "Climate conditions play a major role in the spread and severity of plant diseases. Temperature, humidity, rainfall, and wind all influence pathogen development and transmission.High humidity and frequent rainfall promote fungal and bacterial diseases, while extreme heat weakens plants and lowers their resistance. Sudden climate changes can stress crops, making them more vulnerable to infections.Understanding local climate patterns allows farmers to adopt preventive strategies such as resistant crop varieties, mulching, shade protection, and proper planting schedules. Climate-smart agriculture helps reduce disease outbreaks and ensures stable production.",
  image: "/plant-article6.jpeg",
},
{
  id: 7,
  title: "Best Organic Solutions for Plant Disease Control",
  excerpt: "Organic disease control methods are environmentally friendly and safe for long-term agricultural sustainability. These solutions focus on prevention, natural resistance, and ecosystem balance rather than chemical dependence.Neem oil is widely used for controlling fungal infections and pests. Garlic and chili sprays act as natural antibacterial agents. Compost tea introduces beneficial microbes that strengthen plant immunity. Baking soda solutions are effective against powdery mildew when applied correctly.Organic treatments improve soil health, protect beneficial insects, and reduce chemical residues. They are ideal for sustainable farming and home gardening.",
  image: "/plant-article7.jpeg",
},
{
  id: 8,
  title: "Understanding Pest-Related Plant Diseases",
  excerpt: "Many plant diseases are directly linked to insect activity. Pests such as aphids, whiteflies, thrips, and beetles not only damage plants but also transmit viruses and bacteria from one plant to another.Symptoms of pest-related diseases include distorted leaves, yellowing, stunted growth, and mosaic patterns. Managing these diseases requires controlling pest populations effectively.Integrated Pest Management (IPM) combines biological control, physical barriers, natural predators, and targeted treatments. This approach minimizes pest damage while preserving ecological balance and reducing chemical use.",
  image: "/plant-article8.jpeg",
},
{
  id: 9,
  title: "How AI Is Transforming Modern Plant Disease Detection",
  excerpt: "Artificial intelligence is revolutionizing modern agriculture by enabling faster and more accurate plant disease detection. AI-powered systems analyze leaf images to identify diseases at early stages, often before symptoms are visible to the human eye.Using machine learning and computer vision, AI tools provide real-time diagnosis, treatment recommendations, and predictive insights. Farmers can monitor crops using smartphones, drones, and smart sensors.AI-driven agriculture reduces crop losses, minimizes pesticide use, and supports data-driven decision-making. As technology advances, AI will continue to play a crucial role in sustainable and efficient farming.",
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

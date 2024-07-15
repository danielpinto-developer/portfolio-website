const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCvxaIozAfz6Q-5pfbT9FIyMVowwGML3OA",
  authDomain: "personal-portfolio-ca697.firebaseapp.com",
  projectId: "personal-portfolio-ca697",
  storageBucket: "personal-portfolio-ca697.appspot.com",
  messagingSenderId: "475062216373",
  appId: "1:475062216373:web:103902cc8d0689c62180fc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });
      res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error adding document: ", error);
      res
        .status(500)
        .json({ message: "Error submitting form", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

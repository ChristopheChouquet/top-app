//NE PAS OUBLIER DE RAJOUER DANS package.json : "type": "module",


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser  from 'body-parser';

//Import des différentes routes créées
import UserRoute from "./routes/UserRoute.js";
import TopRoute from "./routes/TopRoute.js";

//Permet d'avoir acces aux cookies dans toutes les routes indiquées
import cookieParser from 'cookie-parser';

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://tof:Montotof14@cluster0.rzkyfqb.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

// Utilisez le middleware bodyParser pour gérer la taille maximale du payload (10 Mo)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//On rajoute les rajoute a ll'API express
app.use(UserRoute);
app.use(TopRoute);

app.listen(5000, ()=> console.log('Server up and running...'));
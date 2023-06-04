import express from 'express';
import mainRouter  from './routes/index.js';
import hbs from 'express-handlebars';
import dotenv from 'dotenv';
import connection from './config/db.js';
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.static('src/public'))


const partialsPath = path.resolve(__dirname + '/src/views/partials/');
app.engine('hbs', hbs.engine(
  {
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
      partials: partialsPath
    }
  }
));

app.set('view engine', 'hbs');
// app.set('views', path.resolve(__dirname + '/views'));
app.set('views', 'src/views');


  // console.log(path.resolve(__dirname + '/src/views/partials'));
  
  // hbs.create(partialsPath);

  try {
    await connection.authenticate();
    connection.sync()
    console.log('Conexión Correcta a la base de datos');
  } catch (error) {
    console.log(error);
  };




app.use('/',  mainRouter );

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('SERVER ON PORT ' + PORT);
});
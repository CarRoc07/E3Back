import express from 'express'
import { billsRouter } from './Routers';
import cors from "cors";
import { usersRouter } from './Routers';
import { categoriesRouter } from './Routers';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bills/', billsRouter)
app.use('/api/users/', usersRouter)
app.use('/api/categories/', categoriesRouter)

app.listen(3000, () => {
    console.log('Running on port 3000')
} )
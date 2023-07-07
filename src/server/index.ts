import express from 'express'
import { billsRouter } from './Routers';
import cors from "cors";
import { categoriesRouter } from './Routers';
import { authRouter } from './Routers';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth/', authRouter)
app.use('/api/bills/', billsRouter)
app.use('/api/categories/', categoriesRouter)

app.listen(3000, () => {
    console.log('Running on port 3000')
} )
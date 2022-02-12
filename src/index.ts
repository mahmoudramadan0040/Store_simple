import express from 'express';
import routes from './routes';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middlewares/erros.middleware';
import configration from './config/config';
import database from './database'

const app =express()
const PORT = configration.port || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.use(limiter);

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

app.use('/api',routes);
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello world');
});



database.connect().then((client)=>{
  return client.query('select now()').then((res)=>{
    client.release();
    console.log(res.rows);
    
  }).catch((err)=>{
    client.release();
    console.log(err.stack);
    
  })
})
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;

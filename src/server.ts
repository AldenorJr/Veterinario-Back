import express, { Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors';
import { router } from './Router';

const port = 3020;
const server = express();

server.use(express.json())
server.use(cors());
server.use(router);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

server.listen(port, () => {
    console.log('')
    console.log(` Servidor back-end na porta ${port}`);
    console.log('')
});
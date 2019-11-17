import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isAxiosError) {
    res.status(err.response.status).send(err.response.data)
  } else {
    const status = err.status || 500
    const message = err.message || 'Something unpredictable happened in the server'
    res.status(status).send({ message })
  }
}

export default errorHandler

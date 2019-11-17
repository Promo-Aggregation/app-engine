import axios from 'axios'
import { Request, Response, NextFunction } from 'express'
import { server_user } from '../config/micro_server'

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req.body
      const response = await axios({
        method: 'POST',
        data: { device_token },
        url: server_user + '/register'
      })
      res.status(response.status).json(response.data)
    } catch (e) {
      next(e)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req.body
      const response = await axios({
        method: 'POST',
        data: { device_token },
        url: server_user + '/login'
      })
      res.status(response.status).json(response.data)
    } catch (e) {
      next(e)
    }
  }
}

export default UserController

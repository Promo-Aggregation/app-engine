import axios from 'axios'
import { Request, Response, NextFunction } from 'express'
import { server_user } from '../config/micro_server'

class SubscriptionController {
  static async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req.headers
      if (!device_token) return next({ status: 400, message: 'Please set device token' })
      const response = await axios({
        url: server_user + '/subscribe',
        data: { tags: req.body.tags },
        headers: { device_token },
        method: 'PUT'
      })
      res.status(response.status).json(response.data)
    } catch (e) {
      next(e)
    }
  }

  static async unsubscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req.headers
      if (!device_token) return next({ status: 400, message: 'Please set device token' })
      const response = await axios({
        url: server_user + '/unsubscribe',
        data: { tags: req.body.tags },
        headers: { device_token },
        method: 'PUT'
      })
      res.status(response.status).json(response.data)
    } catch (e) {
      next(e)
    }
  }
}

export default SubscriptionController

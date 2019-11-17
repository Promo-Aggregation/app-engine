import axios from 'axios'
import { Request, Response, NextFunction } from 'express'
import { server_user } from '../config/micro_server'

class SubscriptionController {
  static async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req.headers
      const { data: user } = await axios({
        url: server_user + '/subscribe',
        data: { tags: req.body.tags },
        headers: { device_token }
      })
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }

  static async unsubscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req.headers
      const { data: user } = await axios({
        url: server_user + '/unsubscribe',
        data: { tags: req.body.tags },
        headers: { device_token }
      })
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
}

export default SubscriptionController

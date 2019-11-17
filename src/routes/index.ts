import { Router } from 'express'
import users from './users'
import subscriptions from './subscriptions'

const router = Router()

router.get('/', (req, res) => res.send({ message: 'Server test ok' }))

router.use('/users', users)
router.use('/subscriptions', subscriptions)

router.get('/*', (req, res, next) =>
  next({ status: 404, message: 'URI does not exist. Please make sure the uri is typed correctly.' })
)

export default router

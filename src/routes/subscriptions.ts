import { Router } from 'express'
import SubscriptionController from '../controllers/subscription'

const router = Router()

router.put('/subscribe', SubscriptionController.subscribe)
router.put('/unsubscribe', SubscriptionController.unsubscribe)

export default router

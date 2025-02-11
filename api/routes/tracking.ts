import { Router } from 'express'
import { TrackingCodeService } from '../../src/services/TrackingCodeService'

const router = Router()
const trackingService = new TrackingCodeService()

router.get('/tracking/:code', async (req, res) => {
  try {
    const trackingInfo = await trackingService.getTrackingInfo(req.params.code)
    res.json(trackingInfo)
  } catch (error) {
    console.error('Erro ao buscar tracking:', error)
    res.status(404).json({ error: error.message })
  }
})

export default router 
import { Router } from 'express'
import {
    createOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
} from '../Controller/bankOfferController.js';


const router = Router();


router.route('/create-offer').post(createOffer);
router.route('/get-all-offers').get(getAllOffers);
router.route('/offer/:id').get(getOfferById);
router.route('/update-offer/:id').put(updateOffer);
router.route('/delete-offer/:id').delete(deleteOffer);


export default router;
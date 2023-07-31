import { Router } from 'express';
import * as controllers from '../controllers'

const router = Router();

router.get('/', controllers.getUsuarios);
router.get('/:id', controllers.getUsuario);
router.post('/', controllers.postUsuario);
router.put('/:id', controllers.putUsuario);
router.delete('/:id', controllers.deleteUsuario);


export default router;
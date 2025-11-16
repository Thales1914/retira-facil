const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

/*
 * ROTAS PÚBLICAS (Para o Cliente)
 */

// RF-3: Cliente vê os horários disponíveis
router.get('/horarios', scheduleController.getActiveSchedules);


/*
 * ROTAS ADMINISTRATIVAS (Para o Lojista)
 */

// RF-6/7: Lojista vê TODOS os seus horários
router.get('/admin/horarios', scheduleController.getAllSchedulesForAdmin);

// RF-6/7: Lojista CRIA um horário
router.post('/admin/horarios', scheduleController.createSchedule);

// RF-6/7: Lojista ATUALIZA um horário
router.put('/admin/horarios/:id', scheduleController.updateSchedule);

// RF-6/7: Lojista DELETA um horário
router.delete('/admin/horarios/:id', scheduleController.deleteSchedule);


module.exports = router;
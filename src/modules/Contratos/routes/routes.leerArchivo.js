const express = require('express');
const router = express.Router();
const { contratosLimpiosLim } = require('../controllers/excel.controller');
const { FiltrarPorTipoContrato,FiltrarPorContratista, FiltrarPorAnio } = require('../controllers/excel.controller');

/**
 * @swagger
 * /api/datos/contratosLimpios:
 *   get:
 *     summary: Obtener historial de contratos
 *     description: Retorna el historial de contratos procesados desde 2016 hasta 2025.
 *     tags:
 *       - Historial Contratos 2016 -2025
 *     responses:
 *       200:
 *         description: Lista de contratos procesados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 123
 *                   consecutivo:
 *                     type: integer
 *                     example: 4567
 *                   fechaIngreso:
 *                     type: string
 *                     format: date
 *                     example: "2023-07-15"
 *                   objeto:
 *                     type: string
 *                     example: "PRESTACIÓN DE SERVICIOS PROFESIONALES..."
 *                   novedades:
 *                     type: string
 *                     example: ""
 *                   estado:
 *                     type: string
 *                     example: "ACTIVO"
 */
router.get('/contratosLimpios', contratosLimpiosLim);


/**
 * @swagger
 * /api/filtroCon/{tipo}:
 *   get:
 *     summary: Filtrar contratos por tipo
 *     tags:
 *       - Historial Contratos 2016 -2025
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: "Nombre del tipo de contrato, ej: DE_OBRA, DE_ARRENDAMIENTO"
 *     responses:
 *       200:
 *         description: Lista de contratos filtrados por tipo
 */
router.get('/:tipo', FiltrarPorTipoContrato);

/**
 * @swagger
 * /api/Contratista/{nombre}:
 *   get:
 *     summary: Buscar contratos por coincidencia en novedades
 *     tags:
 *       - Historial Contratos 2016 -2025
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: "Texto a buscar dentro del campo novedades (ej: nombre del contratista o cualquier palabra clave)"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contratos que coinciden con el texto proporcionado
 *       400:
 *         description: No se proporcionó el texto para buscar
 *       404:
 *         description: No se encontraron contratos con el texto especificado
 */
router.get('/Contratista/:nombre', FiltrarPorContratista);

/**
 * @swagger
 * /api/fecha/{anio}:
 *   get:
 *     summary: Obtener contratos por año
 *     description: |
 *       Devuelve todos los contratos registrados en el año especificado.
 *       Este año corresponde al campo `conanio` dentro del archivo de contratos.
 *     tags:
 *       - Historial Contratos 2016 -2025
 *     parameters:
 *       - in: path
 *         name: anio
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025"
 *         description: Año para filtrar los contratos (por ejemplo, "2025").
 *     responses:
 *       200:
 *         description: Lista de contratos encontrados para el año dado.
 *       404:
 *         description: No se encontraron contratos para el año especificado.
 *       400:
 *         description: Petición inválida.
 */
router.get('/fecha/:anio', FiltrarPorAnio);






module.exports = router;

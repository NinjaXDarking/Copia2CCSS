// routes/valesRoutes.js
const { Router } = require("express");
const { validateSolicitudVale } = require("../validators/SolicitudVale");
const {
  getMethod,
  getMethodById,
  postMethod,
  putMethod,
  deleteMethod,updateEstadoVale,getLastSolicitudValeCont
} = require("../controllers/valesControllers");
const authMiddleware = require("../middleware/authMiddleware"); // Importa el middleware de autenticación

const router = Router();

// Devolver datos desde mi API (Protegido)
router.get("/", getMethod);

// Devolver datos por ID (Protegido)
router.get("/:id", getMethodById);
router.get('/ultimo', getLastSolicitudValeCont);

// Registrar o insertar (Protegido)
router.post("/", validateSolicitudVale, postMethod);

// Actualizar (Protegido)
router.put("/:id",validateSolicitudVale, authMiddleware, putMethod);
router.put("/actualizarEstado/:idVale/:IdEstado", updateEstadoVale);

// Eliminar (Protegido)
router.delete("/:id", authMiddleware, deleteMethod);

module.exports = router;

// routes/valesRoutes.js
const { Router } = require("express");
const { validateSolicitudVale } = require("../validators/SolicitudVale");
const {
  getMethod,
  getMethodById,
  postMethod,
  putMethod,
  deleteMethod,
} = require("../controllers/valesControllers");
const authMiddleware = require("../middleware/authMiddleware"); // Importa el middleware de autenticación

const router = Router();

// Devolver datos desde mi API (Protegido)
router.get("/", getMethod);

// Devolver datos por ID (Protegido)
router.get("/:id", getMethodById);

// Registrar o insertar (Protegido)
router.post("/", validateSolicitudVale, postMethod);

// Actualizar (Protegido)
router.put("/:id",validateSolicitudVale, authMiddleware, putMethod);

// Eliminar (Protegido)
router.delete("/:id", authMiddleware, deleteMethod);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  addServiceToEmployee,
  showServices,
  logingEmployee,
  getEmployeesById,
  activeEmployee,
  sendEmailForgetPassword,
  resetPassword,
  changeStatusJob,
} = require("../controllers/employee");
const existIdEmployee = require("../helpers/isValidIdEmployee");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");

const router = Router();

// trae todos los employees
router.get("/", [validationFields], getEmployees);
// traer un employee by Id
router.get("/:id", getEmployeesById);

// crea un employee
router.post(
  "/",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("surnames", "Los apellidos son requeridos").not().isEmpty(),
    check("email", "El email está en blanco ó es inválido")
      .not()
      .isEmpty()
      .isEmail(),
    check("phone", "El phone es requido").not().isEmpty(),
    validationFields,
  ],
  postEmployee
);

// actualiza el status del employee
router.put(
  "/:id",
  [
    check("id", "el id no es un id válido").isMongoId(),
    check("id", "el id no existe").custom(existIdEmployee),
    validationFields,
  ],
  updateEmployee
);

// elimia el employee
router.delete(
  "/:id",
  [
    check("id", "el id no es un id válido").isMongoId(),
    check("id", "el id no existe").custom(existIdEmployee),
    validationFields,
  ],
  deleteEmployee
);

// agregar un nuevo servicio
router.post("/:idEmployee/:idService", addServiceToEmployee);

// activar al usuario (employee)
router.put("/:idEmployee/active", activeEmployee);

// show services by idEmployee
router.get("/:id", showServices);
module.exports = router;

// olvidé mi contraseña
router.post("/forget-password", sendEmailForgetPassword);

// cambiar la clave
router.post("/new-password", resetPassword);

// Cambiar el estado del "StatusJob" values => "DESCARTADO, SELECCIONADO, CONTRATADO"
router.post("/change-status-job", changeStatusJob);

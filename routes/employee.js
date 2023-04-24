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
  searchEmployee,
  putStateJob,
  addEmployeeJobStatus,
  getAllApplicationsJobByEmployeeId,
  updateEmployeeJobStatus,
} = require("../controllers/employee");
const existIdEmployee = require("../helpers/isValidIdEmployee");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");
const { validateFile } = require("../middlewares/validationFile");

const router = Router();

// filter: busca employees por el estado de trabajo del usuario ("DESCARTADO, SELECCIONADO, CONTRATAD")
router.get("/search", [validateJWT, validationFields], searchEmployee);
// trae todos los employees
router.get("/", [validateJWT, validationFields], getEmployees);
// traer un employee by Id
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "el id debe de ser un mongoId").isMongoId(),
    validationFields,
  ],
  getEmployeesById
);

// crea un employee
router.post(
  "/",
  [
    validateFile,
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

router.put(
  "/activate/:idEmployee",
  [
    validateJWT,
    [
      validateJWT,
      check("idEmployee", "el id debe de ser un mongoId").isMongoId(),
      validationFields,
    ],
  ],
  activeEmployee
);

// actualiza el status del employee
router.put(
  "/:id",
  [
    validateJWT,
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
    validateJWT,
    check("id", "el id no es un id válido").isMongoId(),
    check("id", "el id no existe").custom(existIdEmployee),
    validationFields,
  ],
  deleteEmployee
);

// agregar un nuevo servicio
router.post(
  "/:idEmployee/:idService",
  [validateJWT, validationFields],
  addServiceToEmployee
);

// activar al usuario (employee)

// show services by idEmployee
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  showServices
);

// olvidé mi contraseña
router.post("/forget-password", sendEmailForgetPassword);

// cambiar la clave
router.post("/new-password", resetPassword);

// Cambiar el estado del "StatusJob" values => "DESCARTADO, SELECCIONADO, CONTRATADO, "VISTO",  ""
router.post("/change-status-job", changeStatusJob);

// crear una tabla aparte donde tengamos el valor del estado del emploeador  "DESCARTADO, SELECCIONADO, CONTRATADO, "VISTO",  ""
router.post("/status-job", addEmployeeJobStatus);

// trae información sobre ese empleador
router.get(
  "/get-applications-jobs/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  getAllApplicationsJobByEmployeeId
);

// modificar el status job
router.put(
  "/status-job/:idJobStatus",
  [
    check("idJobStatus", "debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  updateEmployeeJobStatus
);

module.exports = router;

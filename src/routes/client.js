const {
    Router
} = require('express');
const router = Router();
const BD = require('../config/configdb');
const errorMiddleware = require('../middleware/errors');

router.post("/createClient", async (req, res, next) => {
    try {
        credentials = {
            user: "NATAME",
            password: "NATAME",
            connectString: "localhost:1521/DB1"
        }

        connection = await BD.Open(credentials);

        const {
            CEDULA,
            TIPO_IDENTIFICACION,
            PRIMER_NOMBRE,
            SEGUNDO_NOMBRE,
            PRIMER_APELLIDO,
            SEGUNDO_APELLIDO,
            CORREO_ELECTRONICO,
            GENERO,
            FECHA_NACIMIENTO,
            TEL_CONTACTO,
            ESTADO,
            CIUDAD,
            DIRECCION
        } = req.body;

        sql = "INSERT INTO \"Cliente\" (CEDULA, TIPO_IDENTIFICACION, PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, CORREO_ELECTRONICO, GENERO, FECHA_NACIMIENTO, TEL_CONTACTO, ESTADO, CIUDAD, DIRECCION)" +
            "VALUES (:CEDULA, :TIPO_IDENTIFICACION, :PRIMER_NOMBRE, :SEGUNDO_NOMBRE, :PRIMER_APELLIDO, :SEGUNDO_APELLIDO, " +
            ":CORREO_ELECTRONICO, :GENERO, :FECHA_NACIMIENTO, :TEL_CONTACTO, :ESTADO, :CIUDAD, :DIRECCION)";

        await BD.Sentence(sql, [CEDULA, TIPO_IDENTIFICACION, FK_CEDULA_REPRESENTANTE, PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO,
            CORREO_ELECTRONICO, GENERO, FECHA_NACIMIENTO, TEL_CONTACTO, ESTADO, CIUDAD, DIRECCION
        ], true, connection);

        await BD.Close(connection);

        // FK_CEDULA_REPRESENTANTE 

        credentials = {
            user: "ADMINNATAME",
            password: "ADMINNATAME",
            connectString: "localhost:1521/DB1"
        }

        connection = await BD.Open(credentials)

        sql = "CREATE USER " + CEDULA + " IDENTIFIED BY " + CEDULA +
            " DEFAULT TABLESPACE NATAME " +
            "TEMPORARY TABLESPACE NATAME_TMP " +
            "QUOTA 4M ON NATAME " +
            "PASSWORD EXPIRE";

        await BD.Sentence(sql, [], true, connection);

        sql = "GRANT CONSULTOR TO " + nombreUser;

        await BD.Sentence(sql, [], true, connection);

        await BD.Close(connection)

        res.status(200).json({
            msg: "El cliente " + PRIMER_NOMBRE + " con cédula " + CEDULA + "ha sido registrado con éxito",
        })

    } catch (err) {
        next(err);
    }
})

router.get("/getClient", async (req, res) => {
    const {
        USER,
        PASSWORD
    } = req.body;

    const cns = {
        user: USER,
        password: PASSWORD,
        connectString: "localhost:1521/VentasMultinivel"
    }

    let result = await BD.Open("SELECT * FROM \"Cliente\"", [], false, cns);

    res.status(200).json({
        msg: `El cliente ${nombreUser} ha sido registrado con éxito`,
    })
})

router.use(errorMiddleware);

module.exports = router;
const { Router } = require('express');
const router = Router();
const BD = require('../config/configdb');

router.post("/createClient", async (req, res) => {
    const cns = {
        user: "admproy",
        password: "bd2g3",
        connectString: "localhost:1521/VentasMultinivel"
    }

    console.log(req.params)

    const { CEDULA, FK_CEDULA_REPRESENTANTE, PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO,
        CORREO_ELECTRONICO, GENERO, FECHA_NACIMIENTO, TEL_CONTACTO, ESTADO, CIUDAD, DIRECCION } = req.body;

    sql = "INSERT into \"Cliente\" (CEDULA, FK_CEDULA_REPRESENTANTE, PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, CORREO_ELECTRONICO, GENERO, FECHA_NACIMIENTO, TEL_CONTACTO, ESTADO, CIUDAD, DIRECCION)" +
        "VALUES (:CEDULA, :FK_CEDULA_REPRESENTANTE, :PRIMER_NOMBRE, :SEGUNDO_NOMBRE, :PRIMER_APELLIDO, :SEGUNDO_APELLIDO," +
        ":CORREO_ELECTRONICO, :GENERO, :FECHA_NACIMIENTO, :TEL_CONTACTO, :ESTADO, :CIUDAD, :DIRECCION)";

    result = await BD.Open(sql, [CEDULA, FK_CEDULA_REPRESENTANTE, PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO,
        CORREO_ELECTRONICO, GENERO, FECHA_NACIMIENTO, TEL_CONTACTO, ESTADO, CIUDAD, DIRECCION], true, cns);

    const cedula = String(CEDULA);
    const nombreUser = `CLI_${cedula}`;

    sql = "CREATE USER " + nombreUser + " IDENTIFIED BY " + CEDULA +
        " DEFAULT TABLESPACE PROY_DEF " +
        "TEMPORARY TABLESPACE PROY_TEMP " +
        "QUOTA 4M ON PROY_DEF " +
        "PASSWORD EXPIRE";
s
    result = await BD.Open(sql, [], true, cns);

    console.log(result);

    sql = "EXECUTE IMMEDIATE 'GRANT consultor TO " + nombreUser;

    result = await BD.Open(sql, [], false, cns);

    console.log(result);

    res.status(200).json({
        msg: "Todo OK",
    })
})

router.get("/getClient", async (req, res) => {
    const { USER, PASSWORD } = req.body;

    const cns = {
        user: USER,
        password: PASSWORD,
        connectString: "localhost:1521/VentasMultinivel"
    }

    let result = await BD.Open("SELECT * FROM \"Region\"", [], false, cns);

    res.status(200).json({
        msg: "Todo OK",
    })

    console.log(result);
})

module.exports = router;
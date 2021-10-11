const { Router } = require('express');
const router = Router();
const BD = require('../config/configdb');

router.get("/getProducts", async (req, res) => {
    credentials = {
        user: "NATAME",
        password: "NATAME",
        connectString: "localhost:1521/DB1"
    }

    Products = [];

    sql = "SELECT * FROM \"Producto\"";

    connection = await BD.Open(credentials);

    let result = await BD.Open(sql, [], false, connection);

    result.rows.map(product => {
        let productSchema = {
            "id": product[0],
            "categoria": product[1],
            "nombre": product[2],
        }

        Products.push(productSchema);
    })

    console.log(Products);

    await BD.Close(connection)

    res.status(200).json(Products);
})

module.exports = router;
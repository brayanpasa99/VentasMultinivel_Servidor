const { Router } = require('express');
const router = Router();
const BD = require('../config/configdb');

router.get("/getProducts", async (req, res) => {
    const cns = {
        user: "admproy",
        password: "bd2g3",
        connectString: "localhost:1521/VentasMultinivel"
    }

    Products = [];

    sql = "SELECT * FROM \"Producto\"";

    let result = await BD.Open(sql, [], false, cns);

    result.rows.map(product => {
        let productSchema = {
            "id": product[0],
            "categoria": product[1],
            "nombre": product[2],
        }

        Products.push(productSchema);
    })

    console.log(Products);

    res.status(200).json(Products);
})

module.exports = router;
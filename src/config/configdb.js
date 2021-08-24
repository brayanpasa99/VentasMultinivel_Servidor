const oracledb = require('oracledb');

/*cns = {
    user: "SYSTEMPDB",
    password: "Oracle2021",
    connectString: "localhost:1521/PROYPDB"
}*/


async function Open(sql, binds, autoCommit, cns) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;
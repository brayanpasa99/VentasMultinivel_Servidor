const oracledb = require('oracledb');

/*cns = {
    user: "SYSTEMPDB",
    password: "Oracle2021",
    connectString: "localhost:1521/PROYPDB"
}*/


async function Open(credentials) {
    let connection = await oracledb.getConnection(credentials);
    return connection;
}

async function Close(connection) {
    connection.release();
}

async function Sentence(sql, binds, autoCommit, connection) {
    let result = await connection.execute(sql, binds, {
        autoCommit
    });
    return result;
}

exports.Open = Open;
exports.Close = Close;
exports.Sentence = Sentence;
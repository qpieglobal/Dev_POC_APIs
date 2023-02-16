const mysql=require('mysql2');
const pool_user=mysql.createPool({
    connectionLimit     :10,
    host                :'localhost',
    database            :'qpie_user',
    user                :'root',
    password            :'Sekhar_123',
    port                :'3306'
});

const pool_qa=mysql.createPool({
    connectionLimit     :10,
    host                :'localhost',
    database            :'qpie_qa',
    user                :'root',
    password            :'Sekhar_123',
    port                :'3306'
});

const pool_support=mysql.createPool({
    connectionLimit     :10,
    host                :'localhost',
    database            :'qpie_support',
    user                :'root',
    password            :'Sekhar_123',
    port                :'3306'
});

module.exports= {pool_user,
                pool_qa,
                pool_support};

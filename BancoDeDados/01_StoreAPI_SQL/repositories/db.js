import pg from "pg";

async function connect(){
    if (global.connection){
        return global.connection.connect();
    }
    const pool = new pg.Pool({
        connectionString: "postgres://xcmplidk:n2pWC32Nv1sgPK57dIqseqSgBSyYql5N@bubble.db.elephantsql.com/xcmplidk"
    });
    global.connection = pool;
    return pool.connect()
}


export {
    connect
}
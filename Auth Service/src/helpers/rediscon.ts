
import redis, { createClient } from 'redis';


const options = {
    port: 6379,
    password: "",
    host: "65.2.79.139"
};

const client = createClient( {
    url: "redis://65.0.122.83:6379"
} );

client.on( 'connect', async () => {
    console.log( `Redis Connected jo ` );
} );

client.on( 'error', async ( err ) => {
    console.log( "errrrrrr", err );
} );

client.on( 'end', async () => {
    console.log( 'Redis End' );
} );

process.on( 'SIGINT', () => {
    client.quit();
    process.exit( 0 );
} );

export default client;




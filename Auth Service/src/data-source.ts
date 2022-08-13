
import { DataSource } from "typeorm";

// data source
// export const AppDataSource = new DataSource( {
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "",
//     database: "mobi",
//     synchronize: false,
//     logging: false,
//     dropSchema: false,
//     entities: ["src/entity/**/*.ts"],
//     migrations: ["src/migration/**/*{.js,.ts}"],
//     subscribers: ["src/subscribers/**/*.ts"],
//     cache: {
//         type: "database",
//         tableName: "amit",
//         duration: 8000,

//     }

// } );

export const AppDataSource = new DataSource( {
    type: "mysql",
    host: "remotemysql.com",
    port: 3306,
    username: "ZZVDYeKL14",
    password: "yq4wXm4NJ9",
    database: "ZZVDYeKL14",
    synchronize: false,
    logging: false,
    dropSchema: false,
    entities: [
        "src/entity/**/*.ts",
         "dist/**/*.entity{.ts,.js}",    
    ],
    migrations: ["src/migration/**/*{.js,.ts}"],
    subscribers: ["src/subscribers/**/*.ts"],
    cache: {
        type: "database",
        tableName: "amit",
        duration: 8000,

    }

} );



export const environment = {
    production: false,
    express: {
      port: 8080,
      host: 'localhost'
    },
    mongoConnectionString: 'mongodb://nartcsandbox:PFOJjNzGixOUprCJ@sandbox1-shard-00-00-pds55.mongodb.net:27017,sandbox1-shard-00-01-pds55.mongodb.net:27017,sandbox1-shard-00-02-pds55.mongodb.net:27017/nomad-test?ssl=true&replicaSet=Sandbox1-shard-0&authSource=admin',
    jwtAuthSecret: 'MySuperSecret!234'
}

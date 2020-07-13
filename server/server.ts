import { environment } from './../common/environment';
import * as restify from 'restify';
import { Router } from './../common/router'
import * as mongoose from 'mongoose'

export class Server {

    application: restify.Server


    // Conexão com o banco
    initDb(): mongoose.MongooseThenable {
        return mongoose.connect(environment.db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    // Inicia o server e chama as rotas
    initRoutes(routers: Router[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: 'api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initDb().then(() => this.initRoutes(routers).then(() => this))
    }

}
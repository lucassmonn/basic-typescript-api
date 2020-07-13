import { usersRouter } from './users/users.router';
import { environment } from './common/environment';
import { Server } from './server/server'

const server = new Server()
server.bootstrap([usersRouter]).then(server => {
    console.log(`Applications is running on http://localhost:${environment.server.port}`)
}).catch(err => {
    console.log('Failed ', err)
    process.exit(1)
})

import express from 'express'
import productRouter from './routers/products.router'
import cartRouter from  './routers/cart.router'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public'))
app.use('/api/products', productRouter)
app.use('/api/products', cartRouter)

app.use('/', (req, res) => res.send('Home'))

const server = app.listen(8080)
server.on('error', () => console.log('Error'))
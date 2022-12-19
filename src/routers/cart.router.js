import { Router } from 'express'
import CartManager from '../manager/cartManager'

const fileManager = new CartManager('products.json')
const router = Router()

router.get('/', async (req, res) => {
    const products = await cartManager.get()
    res.json({products})
})

router.get('/', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = await cartManager.getById(id)
    res.json({cart})
})

router.post('/', async (req, res) => {
    const newCart = await cartManager.create()

    res.json({status: "success", newCart})
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    
    const product = await cartManager.addProduct(cartId, productId)

    res.json({status: "success", cart})
})

export default router
import fs from 'fs'

class FileManager {
  
  constructor(path) {
    this.path = path
  }

  read = () => {
    if (fs.existsSync(this.path)) {
        return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
    }
    return[]
  }

  getNextId = list => {
    const count = list.length
    return (count > 0) ? list[count-1].id + 1 : 1
  }

  write = list => {
    return fs.promises.writeFile(this.path, JSON.stringify(list))
  }

  get = async () => {
    const data = await this.read()
    return data
  }

  add = async (obj) => {
    const list = await this.read()
    const nextId = this.getNextId(list)
    obj.id = nextId

    list.push(obj)

    await this.write(list)

    return obj
  }

  update = async (id, obj) => {
    obj.id = id
    const list = await this.read()

    for (let i=0; i<list.length; i++) {
        if(list[i].id == id){
            list[i] = obj
            break
        }
    }

    await this.write(list)
  }

  updateIdx = async(id, obj) => {
    obj.id = id
    const list = await this.read()

    const idx = list.findeIndex( e => e.id == id)
    if(idx<0) return
    
    list[idx] = obj

    await this.write(list)
  }

  getById = async(id) => {
    const data = await this.read()
    return data.find(p => p.id == id)
  }

  async delete(id) {
    
    const products = await this.getProducts()
    
    const productIndex = products.findIndex((product) => product.id === id);

    if(productIndex === -1) { 
      return {error: "El producto no existe."}
    }

    const deleteProducts = products.splice(productIndex, 1)

    await this.#writeFile(products);

    return deleteProducts[0];
  }

}

export default FileManager
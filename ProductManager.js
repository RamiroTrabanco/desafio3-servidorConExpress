import fs from "fs"

export default class ProductManager {

    constructor(){
        this.products = []
        this.path = "./products.json"
    }

    async addProducts(title, description, price, thumbnail, code, stock){

        try {
        
        const prodsFile = await this.getProducts()
        const productCode = this.#validateCodeProduct(code)

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.#generateId()
        }

        if(productCode === undefined && title && description && price && thumbnail && stock){

            prodsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(prodsFile))}}

        catch(error){
            console.log("error")
        }

    }

    #validateCodeProduct(code) {
        return this.products.find(prod=>prod.code===code)
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8")
                this.products = JSON.parse(products)
                return this.products
            } else {
                return this.products = []
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    
    async getProductsById(id){
        const prodsFileId = await this.getProducts()
        const productById = prodsFileId.find(product=>product.id===id)
        if (productById === undefined){
            console.log("Not found")
        } else {
            return productById
        }
    }

    async updateProduct(prod){
        let updateProd = await this.getProductsById(prod.id)
        const productCode = this.#validateCodeProduct(prod.code)
        if(updateProd !== prod && updateProd.id == prod.id && productCode === undefined){
            this.products.push(prod)
            this.deleteProduct(updateProd.id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return this.products
        } else {
            console.log("El producto no se pudo actualizar")
        }
    }
    

    async deleteProduct(prodId){
        const deleteProd = await this.getProducts()
        deleteProd.splice(prodId - 1, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProd))
        return deleteProd
    }

    #generateId() {
        let id = 1
        if (this.products.length !== 0){
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    }
}


/* PRUEBA
console.log(product.getProducts())
console.log(product.getProductsById(1))
console.log(product.getProductsById(5))
console.log(product.getProductsById(1))
 */

/* let product = new ProductManager()

let cereza = {
    title: "Cereza",
    description: "Roja",
    price: 5,
    image: "imagen",
    code: 101,
    stock: 5000,
    id: 1
} 
product.updateProduct(cereza) */

let product = new ProductManager()
product.addProducts("Manzana", "Red", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 50, 100)
product.addProducts("Naranja", "Orange", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 500, 100)
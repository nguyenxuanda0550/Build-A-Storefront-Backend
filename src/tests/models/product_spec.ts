import { ProductStore } from "../../models/product"

const Store = new ProductStore();

describe("Product", () => {

  it("INDEX method", () => {
    expect(Store.index).toBeDefined()
  })

  it("SHOW method", () => {
    expect(Store.show).toBeDefined()
  })

  it("CREATE method", () => {
    expect(Store.create).toBeDefined()
  })

  it("DELETE method", () => {
    expect(Store.delete).toBeDefined()
  })

  it("CREATE method product", async () => {
    const { name, price, category } = await Store.create({
      name:'book',
      price: 5,
      category: 'learning equipment'
    })

    expect({ name, price, category }).toEqual({
      name:'book',
      price: 5,
      category: 'learning equipment'
    })
  })

  it("INDEX method product", async () => {
    const [{ name, price, category}] = await Store.index()

    expect({ name, price, category }).toEqual({
      name:'book',
      price: 5,
      category: 'learning equipment'
    })
  })

  it("SHOW method product", async () => {
    const { name, price, category } = await Store.show("1")

    expect({ name, price, category }).toEqual({
      name: 'book',
      price: 5,
      category: 'learning equipment'
  })


  it("DELETE method product ", async () => {
    const result = await Store.delete('1');

    // @ts-ignore
    expect(result).toBe(undefined)
  })
})

})
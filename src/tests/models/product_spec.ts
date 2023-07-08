import { ProductStore } from "../../models/product"

const Store = new ProductStore();

describe("Product", () => {

  it("should have an INDEX method", () => {
    expect(Store.index).toBeDefined()
  })

  it("should have an SHOW method", () => {
    expect(Store.show).toBeDefined()
  })

  it("should have an CREATE method", () => {
    expect(Store.create).toBeDefined()
  })

  it("should have an DELETE method", () => {
    expect(Store.delete).toBeDefined()
  })

  it("CREATE method product", async () => {
    const result = await Store.create({
      name:'book',
      price: 5,
      category: 'learning equipment'
    })

    expect(result).toEqual({
      name:'book',
      price: 5,
      category: 'learning equipment'
    })
  })

  it("INDEX method product", async () => {
    const result = await Store.index()

    expect(result).toEqual([{
      name: "book",
      price: 5,
      category: 'learning equipment'
    }])
  })

  it("SHOW method product", async () => {
    const result = await Store.show("1")

    expect(result).toEqual({
      name: 'book',
      price: 5,
      category: 'learning equipment'
  })


  it("DELETE method product ", async () => {
    Store.delete('1');
    const result = await Store.index()
    // @ts-ignore
    expect(result).toEqual([])
  })
})

})
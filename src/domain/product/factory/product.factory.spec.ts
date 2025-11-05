import ProductFactory from "./product.factory";

describe("Product Factory unit test", () => {
    it("should create a product type A", () => {
        const productA = ProductFactory.create("a", "Product A", 1);

        expect(productA.id).toBeDefined();
        expect(productA.name).toBe("Product A");
        expect(productA.price).toBe(1);
        expect(productA.constructor.name).toBe("Product");
    });

    it("should create a product type B", () => {
        const productB = ProductFactory.create("b", "Product B", 100);

        expect(productB.id).toBeDefined();
        expect(productB.name).toBe("Product B");
        expect(productB.price).toBe(200);
        expect(productB.constructor.name).toBe("ProductB");
    });

    it("should throw an error when product type is invalid", () => {
        expect(() => {
            ProductFactory.create("c", "Product C", 10);
        }).toThrow("Invalid product type");
    });
});
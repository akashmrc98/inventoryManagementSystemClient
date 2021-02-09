// https://docs.cypress.io/api/introduction/api.html
async function assets() {
  return await fetch.get("http://localhost:3000/view-assets");
}

describe("Assets Load Test", () => {
  it("Assets Loaded", () => {
    cy.visit("/alcpg/Assets");
    it("Testing for loading Assets", () => {
      cy.request("http://localhost:3000/view-assets").as(assets);
    });
  });
});

describe("Post Asset Test", () => {
  it("Posting Asset", () => {
    it("Loading Custom Data into fields", () => {
      var Asset = {
        product_name: "Laptops",
        category: "Electronics",
        vendor: "Dell",
        vendor_contact_no: "9494535327",
        vendor_address: "1-105-123",
        summary: "nothing",
        comments: "welcome",
        notes: "return in 10 days",
        product_quantity: 5,
        total_price: 10
      };
      cy.request("POST", "http://localhost:3000/add-asset", Asset);
    });
  });
});

describe("Post Product Test", () => {
  it("Posting Product", () => {
    var Product = {
      purchased_period: "21-12-2019",
      warranty_period: "21-12-2021",
      model_no: "555",
      serial_np: "5345",
      unit_price: "52132"
    };
    cy.request(
      "PUT",
      "http://localhost:3000/edit-asset/5e06ec1782f1de4b6801bd7c",
      Product
    );
  });
});

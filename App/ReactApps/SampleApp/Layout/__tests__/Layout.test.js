import Layout from "../Layout";

describe("A suite for App render", () => {
  const layout = shallow(<Layout />);

  it("should have be defined", () => {
    expect(layout).toBeDefined();
  });

  it("should have an element with className: sample-app", () => {
    expect(layout.find(".sample-app")).toHaveLength(1);
  });

});

import Layout from "./Layout/Layout";

describe("A suite for App render", () => {
  it("should have an element with className: sample-app", () => {
    const layout = shallow(<Layout />);
    expect(layout.find(".sample-app")).toHaveLength(1);
  });
  it("should have an element with className: sample-app", () => {
    const layout = shallow(<Layout />);
    expect(layout.find(".sample-app")).toHaveLength(1);
  });
});

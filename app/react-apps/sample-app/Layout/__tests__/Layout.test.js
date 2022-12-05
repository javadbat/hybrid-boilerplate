import React from "react";
import Enzyme from "enzyme";
import { describe, expect, it } from '@jest/globals';

import Layout from "../Layout";

describe("A suite for App render", () => {
    const layout = Enzyme.shallow(<Layout />);

    it("should be defined", () => {
        expect(layout).toBeDefined();
    });

    it("should have an element with className: sample-app", () => {
        expect(layout.find(".sample-app")).toHaveLength(1);
    });
});

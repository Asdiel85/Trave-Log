import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./Footer.jsx";

describe('testing footer component', () => {
    it('should show coorect text', () => {
       const {getByTestId} = render(<Footer/>)

       expect(getByTestId('footer')).toBeTruthy()
    })
})
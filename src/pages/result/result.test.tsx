import { describe, test, expect, beforeEach } from 'vitest'
import Result from "./result"
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const isDev = process.env.NODE_ENV === 'development'

test.skipIf(!isDev)('development only test', () => {
    //  test only runs in development
})

describe("Accordion test", () => {
    test("Should show title", () => {

    })
})

describe("Result page load", () => {
    beforeEach(() => {
        render(<Result ></Result>);
    });
    test("selected flight", () => {
        expect(screen.getByText(/Kabin Seçiminiz Tamamlandı/i)).toBeDefined()
    })
    test("total amount", () => {
        expect(screen.getByText(/Toplam Tutar/i)).toBeUndefined()
    })

})


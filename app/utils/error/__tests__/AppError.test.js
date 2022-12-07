import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { AppError } from '../app-error';

describe("app error should build correctly", () => {
    it("should have correct message",()=>{
        const error = new AppError("test error",{});
        expect(error.message).toBe("test error");
    });
    it("should have correct name",()=>{
        const error = new AppError("test error",{isValidError:true});
        expect(error.name).toBe("APP_ERROR_VALID");
        const inValidError = new AppError("test error",{isValidError:false});
        expect(inValidError.name).toBe("APP_ERROR");
    });
    it("should throw an error",()=>{
        expect(()=>{
            throw new AppError("test error",{});
        }).toThrowError();
    });
});
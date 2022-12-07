import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { AppError } from '../app-error';
import { ErrorHandler } from '../error-handler';

describe('Error handler must stack properly',()=>{
    it("could handle non AppError errors",()=>{
        const errorHandler = new ErrorHandler();
        const error = new Error("test error");
        errorHandler.onError(error);
        expect(errorHandler.stack.length).toBe(1);
    });
    it("could handle AppError errors",()=>{
        const errorHandler = new ErrorHandler();
        const error = new AppError("test error",{});
        errorHandler.onError(error);
        expect(errorHandler.stack.length).toBe(1);
    });
});
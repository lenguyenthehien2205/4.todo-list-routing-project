import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(), 
      // cung cấp router và binding input cho component
      provideRouter(routes, withComponentInputBinding(), 
      // cung cap tham so duong dan cho cac router con
      withRouterConfig({
        paramsInheritanceStrategy: 'always'
      })),

    ]
};
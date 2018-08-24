import { DynamicInputModel } from "@ng-dynamic-forms/core";

export class StringType {
  public create(element: any) {
    return new DynamicInputModel({
      id: element.name,
      label: element.label
    });
  }
}

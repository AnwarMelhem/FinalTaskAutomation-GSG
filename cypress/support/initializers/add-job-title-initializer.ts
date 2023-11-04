import GenericHelper from "../helpers/GenericHelper"
import { ICreateAddJobTitlePayload } from "../apis/payload/add-job-title-payload";
export default class AddJobTitle {
  static initAddJobTitle(): ICreateAddJobTitlePayload {
    let ICreateAddJobTitlePayload: ICreateAddJobTitlePayload = {
      title: `QA ${GenericHelper.genericRandomNumber()}`,
      description: "Description",
      specification: null,
      note: "Note",
    };
    return ICreateAddJobTitlePayload;
  }
}

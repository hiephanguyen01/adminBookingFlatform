import { BaseService } from "./baseService";

export class ExportDataService extends BaseService {
  exportData = (option, ProvinceId = "", IsDeleted = "", CreateDate = "") => {
    return this.get(
      `/api/filter?option=${option}&ProvinceId=${ProvinceId}&IsDeleted=${IsDeleted}&createDate=${CreateDate}`
    );
  };
}

export const exportDataService = new ExportDataService();

import { BaseService } from "./baseService";

export class ExportDataService extends BaseService {
  exportData = (
    option,
    ProvinceId = "",
    IsDeleted = "",
    CreateDate = "",
    isStatus = "",
    IdentifyCode = "",
    studioPostId = ""
  ) => {
    return this.get(
      `/api/filter?option=${option}&ProvinceId=${ProvinceId}&IsDeleted=${IsDeleted}&createDate=${CreateDate}&isStatus=${isStatus}&IdentifyCode=${IdentifyCode}&studioPostId=${studioPostId}`
    );
  };
}

export const exportDataService = new ExportDataService();

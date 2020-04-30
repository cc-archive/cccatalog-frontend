import ApiService from './ApiService';

const ReportService = {
  sendReport(params) {
    return ApiService.post(`/images/${params.identifier}/report`, params);
  },
};

export default ReportService;

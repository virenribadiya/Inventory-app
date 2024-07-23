import { commonApiService } from "@/shared/services/commonApiService";

export const services = {
    async getLoginUserDetails(paramObj){
        try {
            const response = await commonApiService.getResponse({
                apiName: '/user/getLoginUserDetails',
                methodType: 'get',
                parameterObject: paramObj
              });
              return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getLoginUserDetailsExample(paramObj){
        try {
            const response = await commonApiService.getResponse({
                apiName: '/user/getLoginUserDetails',
                methodType: 'get',
                parameterObject: paramObj
              });
              return response.data;
        } catch (error) {
            throw error;
        }
    },


}
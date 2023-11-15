package com.ssafy.dingdong.global.response;

import org.springframework.stereotype.Service;

@Service
public class ResponseService {

	/* 정상 응답, 데이터 X */
	public CommonResponse successResponse(ResponseStatus responseStatus){
		CommonResponse successResponse = new CommonResponse();
		successResponse.setCode(responseStatus.getCode().getCode());
		successResponse.setMessage(responseStatus.getMessage());
		return successResponse;
	}

	/* 정상 응답 - 데이터 포함 */
	public <T> DataResponse<T> successDataResponse(ResponseStatus responseStatus, T data){
		DataResponse<T> dataResponse = new DataResponse<>();
		dataResponse.setCode(responseStatus.getCode().getCode());
		dataResponse.setMessage(responseStatus.getMessage());
		dataResponse.setData(data);
		return dataResponse;
	}

	/* 비정상 응답 - 데이터 미포함 */
	public CommonResponse failureCommonResponse(ResponseStatus responseStatus) {
		CommonResponse response = new CommonResponse();
		response.setCode(responseStatus.getCode().getCode());
		response.setMessage(responseStatus.getMessage());
		return response;
	}

	/* 비정상 응답 - 데이터 포함 */
	public <T> DataResponse<?> failureDataResponse(ResponseStatus responseStatus, T data) {
		DataResponse<T> dataResponse = new DataResponse<>();
		dataResponse.setCode(responseStatus.getCode().getCode());
		dataResponse.setMessage(responseStatus.getMessage());
		dataResponse.setData(data);
		return dataResponse;
	}

}

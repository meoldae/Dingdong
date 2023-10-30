package com.ssafy.dingdong.domain.neighbor.controller;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborRequestResponseDto;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborResponse;
import com.ssafy.dingdong.domain.neighbor.service.NeighborService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/neighbor")
@RequiredArgsConstructor
public class NeighborController implements NeighborSwagger{

	private final ResponseService responseService;
	private final NeighborService neighborService;

	@Override
	@PostMapping("/{targetId}")
	public CommonResponse createNeighborRequest(@PathVariable Long targetId, Authentication authentication){
		neighborService.createNeighborRequest(targetId, authentication.getName());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	@GetMapping("/check/{targetRoomId}")
	public DataResponse<String> isNeighbor(@PathVariable Long targetRoomId, Authentication authentication) {
		String flag = neighborService.isNeigborByRoomId(targetRoomId, authentication.getName());
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, flag);
	}

	@Override
	@GetMapping("/request")
	public DataResponse<List<NeighborRequestResponseDto>> getRequestList(Authentication authentication){
		List requestList = neighborService.getRequestList(authentication.getName().toString());
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, requestList);
	}

	@Override
	@GetMapping("/list")
	public DataResponse<List<NeighborResponse>> getNeighborList(Authentication authentication){
		List neighborList = neighborService.getNeighborList(authentication.getName().toString());
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, neighborList);
	}

	@Override
	@PostMapping("/response")
	public CommonResponse setNeighborStatus(@Validated @RequestBody NeighborRequest neighborRequest){
		neighborService.setNeighborStatus(neighborRequest);
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	@PostMapping("/delete")
	public CommonResponse deleteNeighbor(@RequestBody Map<String, Object> paramMap, Authentication authentication) {
		neighborService.deleteNeighbor(paramMap, authentication.getName());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}
}
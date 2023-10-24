package com.ssafy.dingdong.domain.neighbor.controller;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

public interface NeighborSwagger {

	CommonResponse createNeighborRequest(@PathVariable String targetId, Authentication authentication);

	DataResponse getRequestList(Authentication authentication);

	DataResponse getNeighborList(Authentication authentication);

	CommonResponse setNeighborStatus(@Validated @RequestBody NeighborRequest neighborRequest);
}

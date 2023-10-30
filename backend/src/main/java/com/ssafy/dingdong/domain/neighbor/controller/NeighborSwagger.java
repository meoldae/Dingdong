package com.ssafy.dingdong.domain.neighbor.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborResponse;
import com.ssafy.dingdong.domain.neighbor.entity.Neighbor;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

public interface NeighborSwagger {

	CommonResponse createNeighborRequest(@PathVariable Long targetId, Authentication authentication);

	DataResponse<String> isNeighbor(@PathVariable Long targetRoomId, Authentication authentication);

	DataResponse<List<String>> getRequestList(Authentication authentication);

	DataResponse<List<NeighborResponse>> getNeighborList(Authentication authentication);

	CommonResponse setNeighborStatus(@Validated @RequestBody NeighborRequest neighborRequest);
}

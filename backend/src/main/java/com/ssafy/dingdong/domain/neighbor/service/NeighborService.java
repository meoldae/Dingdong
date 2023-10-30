package com.ssafy.dingdong.domain.neighbor.service;

import java.util.List;

import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;

public interface NeighborService {
	void createNeighborRequest(Long applicantRoomId, String acceptorId);

	List getRequestList(String string);

	void setNeighborStatus(NeighborRequest neighborRequest);

	List getNeighborList(String memberId);
}

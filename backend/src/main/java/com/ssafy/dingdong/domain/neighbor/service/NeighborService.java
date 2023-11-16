package com.ssafy.dingdong.domain.neighbor.service;

import java.util.List;
import java.util.Map;

import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;

public interface NeighborService {
	String createNeighborRequest(Long applicantRoomId, String acceptorId);

	List getRequestList(String string);

	void setNeighborStatus(NeighborRequest neighborRequest);

	List getNeighborList(String memberId);

	String isNeigborByRoomId(Long targetRoomId, String applicantId);

	void deleteNeighbor(Map<String, Object> paramMap, String myMemberId);
}

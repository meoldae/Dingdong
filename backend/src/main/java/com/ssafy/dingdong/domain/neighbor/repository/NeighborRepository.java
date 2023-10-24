package com.ssafy.dingdong.domain.neighbor.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.dingdong.domain.neighbor.entity.Neighbor;

@Repository
public interface NeighborRepository extends JpaRepository<Neighbor, Long> {

	Optional<Neighbor> findByApplicantIdAndAcceptorId(UUID applicantId, UUID acceptorId);

	Optional<Neighbor> findByNeighborId(Long neighborId);

	void deleteByNeighborId(Long neighborId);

	@Query("SELECT n.neighborId"
		 + "  FROM Neighbor n"
		 + " WHERE n.acceptorId = :memberId"
		+ "    AND n.connectTime = NULL")
	List findAllRequestByMemberId(@Param("memberId") UUID memberId);

	@Query(" SELECT "
		 + "   CASE WHEN n.acceptorId = :memberId THEN n.applicantId"
		 + "        WHEN n.applicantId = :memberId THEN n.acceptorId"
		 + "    END"
		 + "   FROM Neighbor n"
		 + "  WHERE n.connectTime IS NOT NULL")
	List findAllByMemberId(@Param("memberId") UUID memberId);
}

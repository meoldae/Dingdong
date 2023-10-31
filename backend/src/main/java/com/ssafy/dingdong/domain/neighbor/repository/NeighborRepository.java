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

	@Query("SELECT n"
		 + "  FROM Neighbor n"
		 + " WHERE n.acceptorId = :memberId"
		 + "   AND n.connectTime IS NULL "
		 + "   AND n.cancelTime IS NULL")
	List<Neighbor> findAllRequestByMemberId(@Param("memberId") UUID memberId);

	@Query(" SELECT "
		 + "   CASE WHEN n.acceptorId = :memberId THEN n.applicantId"
		 + "        WHEN n.applicantId = :memberId THEN n.acceptorId"
		 + "    END"
		 + "   FROM Neighbor n"
		 + "  WHERE n.connectTime IS NOT NULL "
		 + "    AND ( n.acceptorId = :memberId OR n.applicantId = :memberId ) ")
	List<UUID> findAllByMemberId(@Param("memberId") UUID memberId);

	@Query(" SELECT n"
		 + "   FROM Neighbor n "
		 + "  WHERE "
		 + "        ( n.applicantId = :applicantId AND n.acceptorId = :acceptorId)"
	 	 + "     OR "
		 + "        ( n.applicantId = :acceptorId AND n.acceptorId = :applicantId)")
	Optional<Neighbor> isConnectByApplicantIdAndAcceptorId(UUID applicantId, UUID acceptorId);

	@Query(" SELECT n"
		+ "   FROM Neighbor n "
		+ "  WHERE "
		+ "        ( n.applicantId = :myMemberUUID AND n.acceptorId = :otherMemberUUID)"
		+ "     OR "
		+ "        ( n.applicantId = :otherMemberUUID AND n.acceptorId = :myMemberUUID) "
		+ "    AND n.connectTime IS NOT NULL "
		+ "    AND n.cancelTime IS NULL")
	Optional<Neighbor> deleteByApplicantIdAndAcceptorId(UUID myMemberUUID, UUID otherMemberUUID);


}

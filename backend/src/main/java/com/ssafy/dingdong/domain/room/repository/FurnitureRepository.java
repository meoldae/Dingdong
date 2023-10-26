package com.ssafy.dingdong.domain.room.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.entity.Furniture;

@Repository
public interface FurnitureRepository extends JpaRepository<Furniture, String> {

	@Query("SELECT new com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto ( "
		 + " f.furnitureId, f.furnitureCategory.categoryId, f.thumbnail ) "
		 + "  FROM Furniture f "
		 + " WHERE f.furnitureCategory.categoryId = :category " )
	Page<FurnitureSummaryDto> findAllByCategoryId(Integer category, Pageable pageable);

	@Query("SELECT new com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto ( "
		+ " f.furnitureId, f.furnitureCategory.categoryId, f.thumbnail ) "
		+ "  FROM Furniture f " )
	Page<FurnitureSummaryDto> findAllFurnitureSummaryDto(Pageable pageable);
}

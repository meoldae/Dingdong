package com.ssafy.dingdong.domain.room.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.entity.Furniture;

@Repository
public interface FurnitureRepository extends JpaRepository<Furniture, String> {

	@Query("SELECT new com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto ( "
		 + " f.furnitureId, f.furnitureCategory.categoryId ) "
		 + "  FROM Furniture f "
		 + " WHERE f.furnitureCategory.categoryId = :category " )
	Page<FurnitureSummaryDto> findAllByCategoryId(@Param("category")Long category, Pageable pageable);

	@Query("SELECT new com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto ( "
		+ " f.furnitureId, f.furnitureCategory.categoryId ) "
		+ "  FROM Furniture f "
		+ " WHERE f.furnitureCategory.categoryId != 5 "
		+ "   AND f.furnitureCategory.categoryId != 6 ")
	Page<FurnitureSummaryDto> findAllFurnitureSummaryDto(Pageable pageable);
}

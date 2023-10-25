package com.ssafy.dingdong.domain.avatar.repository;

import com.ssafy.dingdong.domain.avatar.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
}

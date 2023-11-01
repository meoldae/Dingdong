package com.ssafy.dingdong.domain.score.controller;

import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.security.core.Authentication;


public interface ScoreSwagger {

    DataResponse getScoreBoard ();

}

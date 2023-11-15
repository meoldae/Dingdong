package com.ssafy.dingdong.domain.score.controller;

import com.ssafy.dingdong.domain.score.dto.response.ScoreBoardResponseDto;
import com.ssafy.dingdong.domain.score.service.ScoreService;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/multi/scoreboard")
@RequiredArgsConstructor
public class ScoreController implements ScoreSwagger{
    private final ResponseService responseService;
    private final ScoreService scoreService;

    @Override
    @GetMapping
    public DataResponse<ScoreBoardResponseDto> getScoreBoard() {
        ScoreBoardResponseDto result = scoreService.getLatestScores();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }
}

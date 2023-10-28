import React from 'react';  
import SharingModalList from '../Modal/Sharing/SharingModalList';

function StampTestStart(props) {
  return (
    <div> 
      <div>
        <p>우표 테스트</p>
      </div>
      <p>{`당신에게 어울리는 우표를 찾아보세요.`}</p>
      <div onClick={props.onTestModeHanlder}>
          <p>시작</p>        
      </div>
      <div>
            <hr/>
            <p>테스트 공유하기</p>
            <SharingModalList shareMode={'start'}/>
      </div>
    </div>
  );
}

export default StampTestStart;

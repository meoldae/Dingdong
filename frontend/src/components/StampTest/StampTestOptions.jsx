import React, { useEffect, useState } from 'react';
import Questions from '../../assets/json/questions.json' 

function StampTestOptions(props) {
  const [opsNum, setOpsNum] = useState(0);
  const [MBTI, setMBTI] = useState(['A',]);

  const onNextHandler = (e) => {
    const optionType = e.currentTarget.id;
    const newMBTI = [...MBTI];
    newMBTI.push(optionType);
    setMBTI(newMBTI);
    if (opsNum >= Questions.length - 1) {
      let e = 0, n = 0, f = 0, j = 0;
      for (let i = 0; i < 9; i++) {
        if (newMBTI[i] === 'E') {
          e++;
        } else if (newMBTI[i] === 'N') {
          n++;
        } else if (newMBTI[i] === 'F') {
          f++;
        } 
      }
      let result = [
        e >= 2 ? 'E' : 'I',
        n >= 2 ? 'N' : 'S',
        f >= 2 ? 'F' : 'T',
      ];
      let resultStr = result.join('');
      props.setResult(resultStr);
      props.setTestMode('result');
    }
    setOpsNum(opsNum + 1);
  }

  return (
    <div> 
      <div>
        <div>
          <div>
            <div>
              <p>{opsNum + 1}/9</p>
              <p>{Questions[opsNum].question}</p>
            </div>
            <div>
              {Questions[opsNum].answers.map((answer) => {
                return (
                  <div 
                    key={answer.id}
                    id={answer.type} 
                    onClick={onNextHandler}
                  >
                    <p>{answer.content}</p>
                  </div>
                );
              })}
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default StampTestOptions;

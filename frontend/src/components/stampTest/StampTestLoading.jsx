import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StampTestLoading(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.result === 'IST') {
      navigate('/stampresult?result=0');
    } else if (props.result === 'ISF') {
      navigate('/stampresult?result=1');
    } else if (props.result === 'INF') {
      navigate('/stampresult?result=2');
    } else if (props.result === 'INT') {
      navigate('/stampresult?result=3');
    } else if (props.result === 'EST') {
      navigate('/stampresult?result=4');
    } else if (props.result === 'ESF') {
      navigate('/stampresult?result=5');
    } else if (props.result === 'ENF') {
      navigate('/stampresult?result=6');
    } else if (props.result === 'ENT') {
      navigate('/stampresult?result=7');
    } else {
      navigate('/stampresult?result=0');
    }
  });

  return (
    <div>
      분석중...
    </div>
  );
}

export default StampTestLoading;

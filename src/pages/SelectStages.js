import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const mockStagesData = [
  { id: 1, level: 'Easy', attemptResult: '성공' },
  { id: 2, level: 'Easy', attemptResult: '성공' },
  { id: 3, level: 'Easy', attemptResult: '실패' },
  { id: 4, level: 'Easy', attemptResult: '미시도' },
];

function SelectStages() {
  const location = useLocation();
  const { languageType, categoryId } = location.state || {};
  const [stages, setStages] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    setStages(mockStagesData);
  }, [languageType, categoryId]);

  return (
    <div>
      <h1>Stages for Category {categoryId}</h1>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            {stage.level}: {stage.attemptResult}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectStages;

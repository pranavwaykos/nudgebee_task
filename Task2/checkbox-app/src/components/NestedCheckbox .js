import React, { useState } from 'react';

const NestedCheckbox = () => {
    const [parentChecked, setParentChecked] = useState(false);
    const [childChecked, setChildChecked] = useState([false, false, false]);
  
    // Handle parent checkbox change
    const handleParentChange = (e) => {
      const isChecked = e.target.checked;
      setParentChecked(isChecked);
      setChildChecked([isChecked, isChecked, isChecked]);
    };
  
    // Handle individual child checkbox change
    const handleChildChange = (index) => (e) => {
      const isChecked = e.target.checked;
      const newChildChecked = [...childChecked];
      newChildChecked[index] = isChecked;
      setChildChecked(newChildChecked);
      setParentChecked(newChildChecked.every(Boolean));
    };
  
    // Count checked child checkboxes
    const checkedCount = childChecked.filter(Boolean).length;
  
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={parentChecked}
            onChange={handleParentChange}
          />{' '}
          Parent Checkbox {checkedCount > 0 && `(${checkedCount})`}
        </label>
        <br />
        {[1, 2, 3].map((childIndex) => (
          <label key={childIndex}>
            <input
              type="checkbox"
              checked={childChecked[childIndex - 1]}
              onChange={handleChildChange(childIndex - 1)}
            />{' '}
            Child Checkbox {childIndex}
          </label>
        ))}
      </div>
    );
};

export default NestedCheckbox;
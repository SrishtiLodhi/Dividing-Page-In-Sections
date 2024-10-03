import React, { useState } from 'react';

const SplitEditor = () => {
  const [contentSections, setContentSections] = useState(['']);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which section is hovered

  const handlePageBreak = (index) => {
    const textarea = document.getElementById(`editor-${index}`);
    const cursorPosition = textarea.selectionStart;

    const beforeCursor = contentSections[index].substring(0, cursorPosition);
    const afterCursor = contentSections[index].substring(cursorPosition);

    const updatedSections = [
      ...contentSections.slice(0, index),
      beforeCursor,
      afterCursor,
      ...contentSections.slice(index + 1),
    ];

    setContentSections(updatedSections);
  };

  const handleContentChange = (index, value) => {
    const updatedSections = contentSections.map((section, i) =>
      i === index ? value : section
    );
    setContentSections(updatedSections);
  };

  const handleMergeSections = (index) => {
    const mergedContent = contentSections[index] + contentSections[index + 1];
    const updatedSections = [
      ...contentSections.slice(0, index), // Sections before the merged ones
      mergedContent,                       // Merged content
      ...contentSections.slice(index + 2), // Sections after the merged ones
    ];
    setContentSections(updatedSections);
  };

  return (
    <div className="split-editor">
      {contentSections.map((section, index) => (
        <div
          key={index}
          className="split-section"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ position: 'relative' }}
        >
          <h3>Section {index + 1}</h3>
          <textarea
            id={`editor-${index}`}
            value={section}
            onChange={(e) => handleContentChange(index, e.target.value)}
            rows={10}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button onClick={() => handlePageBreak(index)}>Insert Page Break</button>

          {hoveredIndex === index && index < contentSections.length - 1 && (
            <button
              onClick={() => handleMergeSections(index)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#ff6347', // Example color for the merge button
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              Merge
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SplitEditor;

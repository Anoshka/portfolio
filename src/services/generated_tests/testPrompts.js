export const getTestPrompt = (componentName, code) => {
  // Base prompt with detailed test requirements
  const basePrompt = `Generate a complete Jest test file for this React component.
Component name: ${componentName}
Component code:
\`\`\`jsx
${code}
\`\`\`

Required test structure:
1. Import statements:
   - React
   - @testing-library/react (render, screen, fireEvent)
   - @testing-library/jest-dom for matchers
   - TestWrapper from '../testUtils'
   - The component from correct path

2. Test cases must include:
   - Basic rendering test
   - Props testing if component accepts props
   - User interaction tests (clicks, inputs) if interactive
   - Error state testing if applicable
   - Snapshot test optional

3. Testing requirements:
   - Use TestWrapper instead of BrowserRouter
   - Use proper assertions with expect()
   - Test all major component functionality
   - Include cleanup if needed
   - Mock any external dependencies

4. Example structure:
\`\`\`jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${componentName.includes('Page') ? '../../../pages' : '../../../components'}/${componentName}/${componentName}';

describe('${componentName}', () => {
  // Your test cases here
});
\`\`\`

Generate only the complete test code, no explanations.`;

  // Special handling for Animation component
  if (componentName === 'Animation') {
    return `${basePrompt}

Additional requirements for Animation component:
1. Import mockCanvas from testUtils
2. Mock canvas context before tests:
   - Use mockCanvas() in beforeAll
3. Skip Three.js specific tests
4. Only test:
   - Component mounting
   - Component unmounting
   - Basic canvas initialization
5. Mock any Three.js related functions`;
  }

  // Special handling for Header component
  if (componentName === 'Header') {
    return `${basePrompt}

Additional requirements for Header component:
1. Test default state:
   - Render with isOpen={false}
   - Check initial navigation visibility
2. Test interactions:
   - Test menu toggle functionality
   - Test responsive behavior
3. Skip actual navigation tests
4. Test specific requirements:
   - Mobile menu functionality
   - Desktop navigation display
   - Logo visibility
   - Menu button accessibility`;
  }

  // Special handling for WebDevGrid component
  if (componentName === 'WebDevGrid') {
    return `${basePrompt}

Additional requirements for WebDevGrid component:
1. Test grid layout:
   - Check if grid container renders
   - Verify card components are rendered
2. Test interactions:
   - Card click behavior if present
   - Hover states if applicable
3. Test responsive layout:
   - Grid arrangement
   - Card sizing
4. Test loading states if any
5. Test error states if any`;
  }

  // Special handling for Card component
  if (componentName === 'Card') {
    return `${basePrompt}

Additional requirements for Card component:
1. Test required props:
   - title
   - image
   - link
2. Test interactions:
   - Click behavior
   - Hover effects
3. Test accessibility:
   - Image alt text
   - Link functionality
4. Test error cases:
   - Missing props
   - Invalid props`;
  }

  return basePrompt;
};

export const getTestPrompt = (componentName, code) => {
  return `You are a test generator. Generate a Jest unit test for this React component.
Component name: ${componentName}
Component code:
\`\`\`jsx
${code}
\`\`\`

Requirements:
1. Use @testing-library/react and @testing-library/jest-dom
2. Test must use TestWrapper from '../testUtils' instead of BrowserRouter
3. Test basic rendering
4. Test user interactions if present (clicks, inputs, etc.)
5. Test error states if applicable
6. Use proper assertions with expect()

${
  componentName === 'Animation'
    ? `
Special instructions for Animation component:
- Use mockCanvas from testUtils
- Skip Three.js specific tests
- Only test basic mounting/unmounting
`
    : ''
}

${
  componentName === 'Header'
    ? `
Special instructions for Header component:
- Test with isOpen={false} as default prop
- Test navigation menu toggle
- Skip actual navigation tests
- Test responsive design breakpoints
`
    : ''
}

Return ONLY valid Jest test code that follows this format:
\`\`\`jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper${componentName === 'Animation' ? ', mockCanvas' : ''} } from '../testUtils';
import ${componentName} from '${componentName.includes('Page') ? '../../../pages' : '../../../components'}/${componentName}/${componentName}';

// Your test code here
\`\`\`

Do not include any explanations, only return the test code.`;
};

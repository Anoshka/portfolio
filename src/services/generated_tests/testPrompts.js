export const getTestPrompt = (componentName, code) => {
  // Base prompt for all components
  const basePrompt = `
Generate a Jest test for this React component using React Testing Library.
Component name: ${componentName}
Component code:
${code}

Requirements:
1. Use @testing-library/react and @testing-library/jest-dom
2. Import from TestWrapper instead of BrowserRouter
3. Test basic rendering
4. Test user interactions where applicable
5. Include error handling cases
6. Use proper assertions with expect()

Test structure should follow this format:
- Import statements at the top
- Describe block for the component
- Individual test cases using test() or it()
- Proper cleanup in afterEach if needed

Return only the test code, no explanations.`;

  // Special handling for specific components
  if (componentName === 'Animation') {
    return `${basePrompt}

Additional requirements:
1. Mock the canvas context using mockCanvas from testUtils
2. Skip any Three.js specific tests
3. Only test basic mounting/unmounting`;
  }

  if (componentName === 'Header') {
    return `${basePrompt}

Additional requirements:
1. Test with isOpen={false} as default prop
2. Test navigation menu toggle
3. Skip actual navigation tests
4. Test responsive design breakpoints`;
  }

  return basePrompt;
};

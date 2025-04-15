import { OpenAI } from 'openai';

class TestGenerator {
  constructor(apiKey) {
    this.openai = new OpenAI(apiKey);
  }

  async generateComponentTest(componentCode, componentName) {
    const prompt = `
      Generate a test for this React component named ${componentName}:
      ${componentCode}
      
      Include tests for:
      1. Basic rendering
      2. User interactions
      3. Route testing (if applicable)
      4. Responsive design checks
      5. Animation functionality (if applicable)
      
      Return only the test code in Jest format using React Testing Library.
    `;

    try {
      const completion = await this.openai.createCompletion({
        model: 'gpt-4',
        prompt,
        max_tokens: 1000,
      });

      return completion.choices[0].text;
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      throw error;
    }
  }

  async generateRouteTest(routes) {
    const prompt = `
      Generate tests to verify these routes work correctly and handle page refresh:
      ${JSON.stringify(routes, null, 2)}
      
      Include tests for:
      1. Navigation works
      2. Page refresh maintains correct route
      3. 404 handling
      4. URL parameter handling (if any)
    `;

    try {
      const completion = await this.openai.createCompletion({
        model: 'gpt-4',
        prompt,
        max_tokens: 1000,
      });

      return completion.choices[0].text;
    } catch (error) {
      console.error('Error generating route tests:', error);
      throw error;
    }
  }
}

export default TestGenerator;

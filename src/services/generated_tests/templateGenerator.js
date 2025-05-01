import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { getTestPrompt } from './testPrompts.js';

class TemplateGenerator {
  constructor() {
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
    this.skipComponents = ['Animation'];
  }

  cleanOutputDirectory() {
    if (fs.existsSync(this.outputDir)) {
      console.log('🧹 Cleaning output directory...');
      fs.readdirSync(this.outputDir).forEach((file) => {
        const filePath = path.join(this.outputDir, file);
        fs.unlinkSync(filePath);
        console.log(`   Removed: ${file}`);
      });
    } else {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log('📁 Created output directory');
    }
  }

  generateTestForComponent(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');

    if (this.skipComponents.includes(componentName)) {
      console.log(`⏭️ Skipping test generation for ${componentName}`);
      return;
    }

    console.log(`🔄 Generating test for: ${componentPath}`);

    try {
      const code = fs.readFileSync(componentPath, 'utf-8');
      // Get test code from your prompts
      const testCode = getTestPrompt(componentName, code);

      this.saveTest(componentName, testCode);
      console.log(`✅ Generated test for: ${componentName}`);
    } catch (error) {
      console.error(`❌ Error generating test for ${componentName}:`, error);
    }
  }

  async generateAllTests() {
    // Clean up before generating new tests
    this.cleanOutputDirectory();

    const componentFiles = globSync('src/components/**/*.jsx');
    const pageFiles = globSync('src/pages/**/*.jsx');

    console.log('\n🔄 Starting test generation...');
    for (const file of [...componentFiles, ...pageFiles]) {
      this.generateTestForComponent(file);
    }
    console.log('\n✅ Test generation complete!');
  }

  saveTest(componentName, testCode) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const testPath = path.join(this.outputDir, `${componentName}.test.jsx`);
    fs.writeFileSync(testPath, testCode.trim() + '\n');
    console.log(`📝 Saved test: ${testPath}`);
  }
}

// Run the generator
const generator = new TemplateGenerator();
generator.generateAllTests().catch(console.error);

export default TemplateGenerator;

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import json
import os
import glob

def generate_test(component_name, component_code, prompt_template):
    # Use a smaller code generation model
    model_name = "bigcode/starcoderbase-1b"
    
    print(f"Loading model {model_name}...")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16,
        device_map="auto"
    )

    prompt = prompt_template.replace("${componentName}", component_name)
    prompt = prompt.replace("${componentCode}", component_code)

    print(f"Generating test for {component_name}...")
    inputs = tokenizer.encode(prompt, return_tensors="pt").to(model.device)
    
    with torch.no_grad():
        outputs = model.generate(
            inputs,
            max_length=2048,
            temperature=0.2,
            top_p=0.95,
            do_sample=True
        )
    
    generated_test = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Clean up the generated code
    if "```jsx" in generated_test:
        generated_test = generated_test.split("```jsx")[1].split("```")[0]
    elif "```" in generated_test:
        generated_test = generated_test.split("```")[1].split("```")[0]
    
    return generated_test.strip()

def main():
    # Create output directory
    output_dir = "src/services/generated_tests/output"
    os.makedirs(output_dir, exist_ok=True)

    # Find all component files
    component_files = glob.glob("src/components/**/*.jsx", recursive=True)
    page_files = glob.glob("src/pages/**/*.jsx", recursive=True)
    
    skip_components = ['AutoRiggerPage']
    
    for file_path in component_files + page_files:
        component_name = os.path.splitext(os.path.basename(file_path))[0]
        
        if component_name in skip_components:
            print(f"Skipping {component_name}")
            continue
            
        print(f"Processing {component_name}")
        
        with open(file_path, 'r') as f:
            component_code = f.read()
            
        # Get prompt template based on component type
        if component_name == 'Animation':
            prompt_template = """
            Generate a Jest test for this React component that uses Three.js.
            Skip Three.js specific tests and only test basic mounting/unmounting.
            Use mockCanvas from testUtils.
            Component code: ${componentCode}
            """
        elif component_name == 'Header':
            prompt_template = """
            Generate a Jest test for this React Header component.
            Test navigation menu toggle and responsive design.
            Skip actual navigation tests.
            Component code: ${componentCode}
            """
        else:
            prompt_template = """
            Generate a Jest test for this React component.
            Use React Testing Library.
            Test rendering and interactions.
            Component code: ${componentCode}
            """
            
        try:
            test_code = generate_test(component_name, component_code, prompt_template)
            
            # Save the generated test
            test_file_path = os.path.join(output_dir, f"{component_name}.test.jsx")
            with open(test_file_path, 'w') as f:
                f.write(test_code)
                
            print(f"✅ Generated test for {component_name}")
            
        except Exception as e:
            print(f"❌ Error generating test for {component_name}: {str(e)}")
            # Create fallback test
            fallback_test = f"""
            import React from 'react';
            import {{ render }} from '@testing-library/react';
            import '@testing-library/jest-dom';
            import {{ TestWrapper }} from '../testUtils';
            import {component_name} from '../../../components/{component_name}/{component_name}';

            describe('{component_name}', () => {{
              test('renders without crashing', () => {{
                render(
                  <TestWrapper>
                    <{component_name} />
                  </TestWrapper>
                );
              }});
            }});
            """
            test_file_path = os.path.join(output_dir, f"{component_name}.test.jsx")
            with open(test_file_path, 'w') as f:
                f.write(fallback_test)
            print(f"⚠️ Created fallback test for {component_name}")

if __name__ == "__main__":
    main()
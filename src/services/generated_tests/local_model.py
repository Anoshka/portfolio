from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import json
import sys

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

    # Construct the prompt
    prompt = prompt_template.replace("${componentName}", component_name)
    prompt = prompt.replace("${componentCode}", component_code)

    print("Generating test...")
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
    
    # Extract the test code
    if "```jsx" in generated_test:
        generated_test = generated_test.split("```jsx")[1].split("```")[0]
    elif "```" in generated_test:
        generated_test = generated_test.split("```")[1].split("```")[0]
    
    return generated_test.strip()

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    result = generate_test(
        input_data["component_name"],
        input_data["component_code"],
        input_data["prompt_template"]
    )
    print(json.dumps({"test_code": result}))

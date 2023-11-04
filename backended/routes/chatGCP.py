import os
from langchain.llms import VertexAI

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../../GACKey.json"

llm = VertexAI(model_name="text-bison@001", max_output_tokens=1000, temperature=0.3)
print(llm("What are some of the pros and cons of Python as a programming language?"))

import os

# GPC Vertex AI Stuff
from langchain.llms import VertexAI
from langchain.embeddings import VertexAIEmbeddings

from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain


import dotenv

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required


chat = Blueprint('chat', __name__)

dotenv.load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../../GACKey.json"


# The Chroma storage is not in the routes directory, it's out by 1
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
persist_directory = os.path.join(parent_dir, "storage")


embeddings = VertexAIEmbeddings()

vectordb = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
retriever = vectordb.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
global memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

qa = ConversationalRetrievalChain.from_llm(
    llm = VertexAI(model_name="text-bison@001", max_output_tokens=1000, temperature=0.3),
    retriever = retriever,
    memory = memory,
    # return_source_documents = True,
    # return_generated_question = True
)


def handle_query(user_input):
    query = f"###Prompt {user_input}"
    try:
        llm_response = qa({"question": query})
        print(llm_response)
        return llm_response["answer"]
    except Exception as err:
        return f'Exception occurred. Please try again: {str(err)}'


@chat.route('/get-response', methods=['POST'])
@jwt_required()
def get_response():
    data = request.get_json()
    query = data.get('query')

    response = handle_query(query)
        
    return jsonify({"response": response}), 200


@chat.route('/clear-memory', methods=['POST'])
@jwt_required()
def clear_chat():
    global memory  # Access the global memory variable
    memory.clear()  # Clear the memory
    return jsonify({"message": "Chat history cleared, Langchain Memory deleted"}), 200

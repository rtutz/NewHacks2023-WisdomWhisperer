import os
import redis

# GPC Vertex AI Stuff
from langchain.llms import VertexAI
from langchain.embeddings import VertexAIEmbeddings

from langchain.vectorstores import Redis
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain


import dotenv

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required


chat = Blueprint('chat', __name__)

dotenv.load_dotenv()

current_dir = os.path.dirname(os.path.abspath(__file__))
key_path = os.path.join(current_dir, "../GACKey.json")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = key_path


embeddings = VertexAIEmbeddings()


# qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
global memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

def setup_database_and_retriever(courseName):
    rds = Redis.from_existing_index(
        embeddings,
        index_name=f'course_{courseName}',
        redis_url=os.getenv("REDIS_URL"),
        schema="redis_schema.yaml",
    )
    retriever = rds.as_retriever(search_type="similarity", search_kwargs={"k": 3})
    return retriever

default_course_name = 'topic1'
retriever = setup_database_and_retriever(default_course_name)


def handle_query(qa, user_input):
    query = f"###Prompt {user_input}"
    try:
        llm_response = qa({"question": query})
        print(llm_response)
        return llm_response["answer"]
    except Exception as err:
        return f'Exception occurred. Please try again: {str(err)}'


@chat.route('/get-response', methods=['POST'])
def get_response():
    data = request.get_json()
    query = data.get('query')
    courseName = data.get('courseName')

    retriever = setup_database_and_retriever(courseName)

    qa = ConversationalRetrievalChain.from_llm(
        llm=VertexAI(model_name="text-bison@001", max_output_tokens=1000, temperature=0.3),
        retriever=retriever,
        memory=memory,
    )

    response = handle_query(qa, query)
    return jsonify({"response": response}), 200


@chat.route('/clear-memory', methods=['POST'])
# @jwt_required()
def clear_chat():
    global memory  # Access the global memory variable
    memory.clear()  # Clear the memory
    return jsonify({"message": "Chat history cleared, Langchain Memory deleted"}), 200

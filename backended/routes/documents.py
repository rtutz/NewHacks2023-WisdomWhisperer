import os
import redis
import dotenv

# GPC Vertex AI Stuff
from langchain.llms import VertexAI
from langchain.embeddings import VertexAIEmbeddings
from langchain.vectorstores import Redis

from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

dotenv.load_dotenv()

current_dir = os.path.dirname(os.path.abspath(__file__))
key_path = os.path.join(current_dir, "GACKey.json")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = key_path


def save_transcript_to_file(transcript):
    temp_file_path = os.path.join(os.getcwd(), "./TempTranscript.txt")

    with open(temp_file_path, 'w') as file:
        file.write(transcript)
    return temp_file_path


def insert_embeddings(rds, texts):
    rds.add_texts(texts)


def upload(transcript, courseName):
    
    temp_file_path = save_transcript_to_file(transcript)
    # temp_file_path = "./TempTranscript.txt"

    loader = TextLoader(temp_file_path)
    documents = loader.load()

    # Split the document text into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=10)
    texts_splits = text_splitter.split_documents(documents)
    texts = [doc.page_content for doc in texts_splits]

    embeddings = VertexAIEmbeddings()

    index_name = f'course_{courseName}'
    index_created = False
    try:
        rds = Redis.from_existing_index(
            embeddings,
            index_name=index_name,
            redis_url=os.getenv("REDIS_URL"),  
            schema="../redis_schema.yaml",
        )
    except Exception as e:
        print(f"Exception: {e}")
        rds = Redis.from_texts(
            texts,
            embeddings,
            redis_url=os.getenv("REDIS_URL"),
            index_name=index_name,
        )
        index_created = True
    
    insert_embeddings(rds, texts)
    
    response_message = "Embeddings uploaded successfully"
    if index_created:
        response_message += " (New index created)"
    
    return response_message


TRANSCRIPT = "I'm Mr. White Christmas. I'm Mr. Snow. I'm Mr. Icicle. I'm Mr. Ten Below. Friends call me Snow Miser. Whatever I touch turns to snow in my clutch. I'm too much. I'm Mr. Green Christmas. I'm Mr. Sun. I'm Mr. Heat Blister. I'm Mr. Hundred and One. They call me Heat Miser. Whatever I touch starts to melt in my clutch. I'm too much. He's Mr. White Christmas. He's Mr. Snow. He's Mr. Icicle. He's Mr. Ten Below. Friends call me Snow Miser. Whatever I touch turns to snow in my clutch. He's too much. Oh, thank you. I never want to know a day that's over 40 degrees. I'd rather have a 30-20-10-5 than let them free. He's Mr. Green Christmas. He's Mr. Sun. He's Mr. Heat Blister. He's Mr. Hundred and One. They call me Heat Miser. Whatever I touch starts to melt in my clutch. He's too much. I never want to know a day that's under 60 degrees. I'd rather have it 80-90-100 degrees. He's Mr. White Christmas. He's Mr. Sun. He's Mr. Icicle. He's Mr. Hundred and One. Friends call me Snow Miser. Whatever I touch starts to melt in my clutch. He's too much. Too much. Green Christmas. White Christmas. Oh, my. I'm afraid we're going to have to do something drastic. Christmas is depending on it."

print(upload(TRANSCRIPT, "topic3"))

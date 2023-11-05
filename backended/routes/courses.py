import os
import dotenv
import redis
dotenv.load_dotenv()

PROCESSED_DB_HOST = os.getenv('PROCESSED_DB_HOST')
PROCESSED_DB_PORT = os.getenv('PROCESSED_DB_PORT')
PROCESSED_DB_PASSWORD = os.getenv('PROCESSED_DB_PASSWORD')

def getCourses():
    redis_client = redis.Redis(
        host=PROCESSED_DB_HOST,
        port=PROCESSED_DB_PORT,
        password=PROCESSED_DB_PASSWORD)
    course_array = []
    courses = redis_client.keys("*")
    redis_client.close()
    for course in courses:
        course_array.append(str(course, encoding='utf-8'))
    return course_array

def addCourse(course):
    redis_client = redis.Redis(
        host=PROCESSED_DB_HOST,
        port=PROCESSED_DB_PORT,
        password=PROCESSED_DB_PASSWORD)
    if redis_client.exists(course) > 0:
        redis_client.close()
        return False
    elif redis_client.sadd(course, ""):
        redis_client.close()
        return True
    else:
        redis_client.close()
        return False

if __name__ == "__main__":
    print(getCourses())
    print(addCourse("CS50"))
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
import os
import tensorflow as tf
import matplotlib.image as img
import cv2
import numpy as np

app = Flask(__name__)
cors = CORS(app, resources={r'/*': {"origins": '*'}})
app.config['UPLOAD_FOLDER'] = 'uploaded_x_rays'

def get_prediction(file):
        model = tf.keras.models.load_model(os.path.join('..','saved_model','my_model'))
        image = img.imread(file)
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        imageResized = cv2.resize(image, (410, 332))
        imageResized = imageResized[np.newaxis,:,np.newaxis]
        imageResized = np.reshape(imageResized,(1,332,410,1))
        prediction = model.predict(imageResized)
        prediction = int(prediction[0][0])
        print('prediction ',prediction)

        response = make_response(str(prediction))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

@app.route("/api/uploadFile",methods = ['GET','POST'])
def upload_file():
    if request.method == 'POST':
        print(request)
        file = request.files['file']
        return get_prediction(file)

@app.route("/api/samplePrediction",methods = ['POST'])
def sample_prediction():
    file_path = request.get_json(force=True)['filePath']
    print(request.get_json(force=True))
    full_path = ''
    if 'bacteria' in file_path:
        full_path = os.path.join('..','chest_xray','train','PNEUMONIA',file_path)
    else:
        full_path = os.path.join('..','chest_xray','train','NORMAL',file_path)
    return get_prediction(full_path)

@app.route("/",methods = ['GET'])
def test():
    return 'merge'
if __name__ == '__main__':
    app.run(debug = True)
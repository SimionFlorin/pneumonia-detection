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

@app.route("/api/uploadFile",methods = ['GET','POST'])
def upload_file():
    if request.method == 'POST':
        print(request)
        f = request.files['file']
        model = tf.keras.models.load_model(os.path.join('..','saved_model','my_model'))
        print(model)
        print(f.filename)
        image = img.imread(f)
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        imageResized = cv2.resize(image, (410, 332))
        print('image ',image.shape)
        print('imageResized ',imageResized.shape)
        imageResized = imageResized[np.newaxis,:,np.newaxis]
        imageResized = np.reshape(imageResized,(1,332,410,1))
        print('imageResized ',imageResized.shape)
        prediction = model.predict(imageResized)
        prediction = int(prediction[0][0])
        print('prediction ',prediction)

        response = make_response(str(prediction))
        response.headers['Access-Control-Allow-Origin'] = '*'
        del model,image,imageResized,prediction, f
        return response

@app.route("/",methods = ['GET'])
def test():
    return 'merge'
if __name__ == '__main__':
    app.run(debug = True)
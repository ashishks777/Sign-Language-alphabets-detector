# Sign-Language-alphabets-detector

<h3>Demo:<a href="https://ashishks777.github.io/Sign-Language-alphabets-detector/">click here</a></h3>
<h2>Introduction</h2>
Building a neural network that can identify which letter of the Indian Sign Language (ISL) alphabet is being signed, given an input feed of a signing hand, is the purpose of this project. The project attempts to create a potential sign language translator that could translate sign language communications into written language. Such a translator would greatly lower the barrier for many deaf and mute individuals to be able to better communicate with others in day to day interactions.

Large barriers like  information deprivation, limitation of social connections, and difficulty integrating in society  stem from the communication disconnect between the deaf and the hearing, profoundly affecting the life quality of physically challenged citizens. Thus, our project aims to close the gap between those with physical impairments and normal citizens.

Most research implementations used till date for this task involve resource intensive implementations that have used depth maps generated by depth camera and high resolution images. The goal of this project was to test if neural networks are able to classify signed ISL letters using simple images of hands taken with a personal device such as a laptop webcam. This is consistent with the motivation since it would make a real-time ISL to written language translator implementation realistic in real-world settings.

<img src="https://user-images.githubusercontent.com/88076346/235151382-2b896082-0f8c-4673-8bef-5467e56a6cb0.jpg" width="530" height="750">

<img src="https://user-images.githubusercontent.com/88076346/235202520-dbfb6777-fdef-4a9b-a39f-5abfba40b21e.jpg" width="710" height="392">

<h2>Web Model</h2>
To ensure that our machine learning model was easily accessible to users with smartphones, we created a web version of it using mediapipeJS and tensorflow.js. The first step in this process was converting the model into a format that could be read by the javascript version of tensorflow.

To achieve this, we utilized the conversion tools provided by tensorflow.js, which produced a json file that we subsequently inserted into our javascript file. Once the model was integrated into the javascript code, we used javascript to capture live video feed from the user's smartphone camera.

The live video feed was then passed to the mediapipeJS library for processing. After processing, we preprocessed the results from mediapipeJS to ensure that they were compatible with the machine learning model. Once we had preprocessed the data, we passed it to the machine learning model for analysis and prediction.

The predictions made by the model were then displayed on the user's screen in real-time. By creating a web-based version of our machine learning model, we have made it easily accessible to a wider range of users, thereby promoting the use of machine learning technology in various applications.


<img src="https://github.com/ashishks777/Sign-Language-alphabets-detector/assets/88076346/3791869a-a55d-45f9-9259-b73c0ca1d1a2" width="710" height="399">

<img src="https://github.com/ashishks777/Sign-Language-alphabets-detector/assets/88076346/340b6728-9279-4fbe-a50e-f42a4d7d64a2" width="710" height="390">


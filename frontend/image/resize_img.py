import cv2
import numpy as np

WIDTH=600

img_ori = cv2.imread("searchBtn.png")
print(img_ori.shape)
img_out = cv2.resize(img_ori, (WIDTH, int(img_ori.shape[0]*(WIDTH/img_ori.shape[1]))), interpolation=cv2.INTER_CUBIC)
print(img_out.shape)
cv2.imwrite("searchBtn-edit.jpg", img_out)
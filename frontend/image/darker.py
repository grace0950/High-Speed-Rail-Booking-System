import cv2
import numpy as np

img_ori = cv2.imread("ticket.jpg", cv2.IMREAD_GRAYSCALE)
# print(img_ori.shape)
img_ori = img_ori.astype(int)
h, w = img_ori.shape
img_out = np.zeros((h, w), dtype=int)
# img_out = cv2.cvtColor(img_ori, cv2.COLOR_BGR2YCrCb)
img_out = img_ori - 75
img_out = np.clip(img_out, 0, 255)
# img_out = cv2.cvtColor(img_ori, cv2.COLOR_YCrCb2BGR)
# img_out[:, :, 0] = 128 - img_ori[:, :, 0]
# img_out[:, :, 1] = 128 - img_ori[:, :, 1]
# img_out[:, :, 2] = 128 - img_ori[:, :, 2]
# img_out = 255 - img_ori
# cv2.GaussianBlur(img_ori, (27, 27), 1, img_out)


print(img_out.shape)
cv2.imwrite("ticket_dark.jpg", img_out)
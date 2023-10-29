

################################################################

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time
import re
import undetected_chromedriver as uc
from webdriver_manager.chrome import ChromeDriverManager
import os
from seleniumbase import Driver
import time

driver = Driver(uc=True)
# driver.get("https://nowsecure.nl/#relax")
# time.sleep(6)
# driver.quit()

print("-----------Automation Scraping is successfully started------------")
# driver = uc.Chrome(driver_executable_path=ChromeDriverManager().install())
driver.maximize_window()

tags = []
matchTitles = []
contentTitles = []
contentValues = []

basicurl = "https://betx365.win/exchange/UserHome"
driver.get(basicurl)

menu = driver.find_element(By.ID, 'menu_user_d_cr_inplay')
menu.click()
time.sleep(2)
firstSideBar = driver.find_element(By.XPATH, '//*[@id="data_list"]/li[2]/a')
firstSideBar.click()
time.sleep(2)
secondSideBar = driver.find_element(By.XPATH, '//*[@id="data_list"]/li[1]/a')
secondSideBar.click()
time.sleep(1)
thirdSideBar = driver.find_element(By.ID, 'name')
thirdSideBar.click()
premiumButton = driver.find_element(By.ID, 'showSportsBookBtn')
premiumButton.click()

time.sleep(2)

matchTotalBox = driver.find_element(By.ID, 'premiumFancyList')
matchBoxs = matchTotalBox.find_elements(By.TAG_NAME, 'table')
for i in range(len(matchBoxs)):
    matchTitle = matchBoxs[i].find_element(By.ID, 'marketName').text
    print(i, "match Name >>> ", matchTitle)
    matchContents = matchBoxs[i].find_elements(By.CLASS_NAME, 'sportbooktr')
    for j in range(len(matchContents)):
        contentName = matchContents[j].find_elements(By.TAG_NAME, 'p')[0].text
        print(i, "contect Name >>> ", contentName)
        contentValue = matchContents[j].find_elements(By.TAG_NAME, 'a')[0].text
        print(i, "content Value >>> ", contentValue)

        tags.append("Premium Criket")
        matchTitles.append(matchTitle)
        contentTitles.append(contentName)
        contentValues.append(contentValue)

dict = {'TagName': tags, 'Match Title': matchTitles, 'Content Title': contentTitles, 'Content Value': contentValues,}
df = pd.DataFrame(dict)

df.to_csv('Result.csv', index = False)


# secondSideBar = driver.find_element(By.XPATH, '')
print("page load okay!!!")

# for i in range(1, 35):
#     pageURL = basicurl + str(i)
#     print("-------------------------------", pageURL)
#     driver.get(pageURL)
#     time.sleep(4)

#     Element_Name_box = driver.find_elements(By.CLASS_NAME, "h2-list")
#     for j in range(len(Element_Name_box)):
#         Element_Name = Element_Name_box[j].find_element(By.TAG_NAME, "span").text
#         Element_Names = Element_Name.split(" ")
#         FirstName = Element_Names[0]
#         FirstNames.append(FirstName)
#         print("FirstName--> ", FirstName)
#         LastName = Element_Names[1]
#         LastNames.append(LastName)
#         print("LastName--> ", LastName)
#     # print(len(Element_Names))

#     Element_Phone_box = driver.find_elements(By.CLASS_NAME, "ci-pb")
#     for j in range(len(Element_Phone_box)):
#         if (j % 2 == 1):
#             Element_Phone = Element_Phone_box[j].find_element(By.TAG_NAME, "a").text
#             Element_Phones.append(Element_Phone)
#     # print(len(Element_Phones))

#     Cayman_Brac_box = driver.find_elements(By.CLASS_NAME, "ladd")    
#     for j in range(len(Cayman_Brac_box)):
#         sentense = Cayman_Brac_box[j].find_element(By.TAG_NAME, "p").text

#         sentense_elements = sentense.split(" ")
#         if ("Box" in sentense):
#             Box = "Box " + sentense_elements[1]
            
#             print("Box--> ", Box)
#             sentense = sentense.replace(Box, "")
#         else :
#             Box = " "

#         sub_elements = sentense.split("Cayman Brac")
#         if (len(sub_elements) == 2):
#             Address_line = sub_elements[0]
#             print("Address_line--> ", Address_line)
#             KY_Number = sub_elements[1]
#             print("KY_Number--> ", KY_Number)
#         else :
#             Address_line = sub_elements[0]
#             print("Address_line--> ", Address_line)
#             KY_Number = " "

#         if ("Cayman Brac" in sentense):
#             Island = "Cayman Brac"
#         else :
#             Island = " "


#         Boxs.append(Box)
#         Address_lines.append(Address_line)
#         KY_Numbers.append(KY_Number)
#         Islands.append(Island)




#         # Cayman_Bracs.append(Cayman_Brac)
#     # print(len(Cayman_Bracs))

#     dict = {'First Name': FirstNames, 'Last Name': LastNames, 'BOX #': Boxs, 'Address line 1': Address_lines, 'KY Number': KY_Numbers, 'Island': Islands, 'Phone +1': Element_Phones}
#     df = pd.DataFrame(dict)

#     df.to_csv('Result.csv', index = False)

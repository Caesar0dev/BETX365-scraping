import csv
import threading

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import undetected_chromedriver as uc
import pandas as pd
import time
import re
import csv
from datetime import datetime
from datetime import date
from seleniumbase import Driver

driver = Driver(uc=True)

driver.get('https://www.skyexch.art/exchange/member/index.jsp?eventType=4')

time.sleep(2)

menuGroup = driver.find_elements(By.CLASS_NAME, 'menu-list')[0]
menuList = menuGroup.find_elements(By.TAG_NAME, 'ul')
print("menu list --> ", len(menuList))
for i in range(0, len(menuList)):
    time.sleep(1)
    menuGroup = driver.find_elements(By.CLASS_NAME, 'menu-list')[0]
    menuList = menuGroup.find_elements(By.TAG_NAME, 'ul')
    menus = menuList[i].find_elements(By.CLASS_NAME, 'listBoard')
    print("menus --> ", len(menus))
    for j in range(0, len(menus)):
        time.sleep(1)
        menuGroup = driver.find_elements(By.CLASS_NAME, 'menu-list')[0]
        menuList = menuGroup.find_elements(By.TAG_NAME, 'ul')
        menus = menuList[i].find_elements(By.CLASS_NAME, 'listBoard')
        menu = menus[j]
        competitionname_value = menu.get_attribute('competitionname')
        print("title --> ", competitionname_value)
        menu.click()
        time.sleep(2)
        matchBox = driver.find_element(By.XPATH, '/html/body/div[6]/div[1]/div/ul[2]/div[3]')
        matchList = matchBox.find_elements(By.CLASS_NAME, 'listBoard')
        for k in range(0, len(matchList)):
            
            try:
                eventID = matchList[k].get_attribute('eventid')
                print("eventID --> ", eventID)
                marketID = matchList[k].get_attribute('marketid')
                print("marketID --> ", marketID)
                print("--------------------------")

                with open('urlList.csv', mode='a', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerow([eventID, marketID])
            except:
                print("is not exist sub matches...")
            try:
                matchList[k].click()
                time.sleep(2)
                submatchBox = driver.find_element(By.XPATH, '/html/body/div[6]/div[1]/div/ul[2]/div[3]')
                submatchList = submatchBox.find_element(By.CLASS_NAME, 'listBoard')
                for submatch in submatchList:
                    eventID = submatch.get_attribute('eventid')
                    print("eventID --> ", eventID)
                    marketID = submatch.get_attribute('marketid')
                    print("marketID --> ", marketID)
                    print("-------------------------")

                    with open('urlList.csv', mode='a', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow([eventID, marketID])
            except:
                print("exist sub matches...")
            
            subreturnButton = driver.find_element(By.XPATH, '/html/body/div[6]/div[1]/div/ul[2]/div[2]/li[2]/a[2]')
            subreturnButton.click()
            time.sleep(2)

        returnButton = driver.find_element(By.XPATH, '/html/body/div[6]/div[1]/div/ul[2]/div[2]/li[1]/a[2]')
        returnButton.click()
        time.sleep(2)

# while True:
#     pass
# # driver.close()   
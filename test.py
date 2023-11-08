from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize WebDriver with options (e.g., User-Agent)
options = webdriver.ChromeOptions()
options.add_argument("--user-agent=YOUR_USER_AGENT_STRING")
driver = webdriver.Chrome(options=options)

# Navigate to the website
driver.get('https://www.skyexch.art/exchange/member/index.jsp?eventType=4')

# Wait for the menu to load
menuGroup = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'menu-list')))
menuList = menuGroup.find_elements(By.TAG_NAME, 'ul')
print("Number of menu lists: ", len(menuList))

for menu in menuList:
    menus = menu.find_elements(By.CLASS_NAME, 'listBoard')
    print("Number of menus: ", len(menus))

    for menu in menus:
        print("menu --> ", menu.text)
        menu.click()

        # Wait for the matchBox to load
        matchBox = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'ocerGroup')))
        matchList = matchBox.find_elements(By.CLASS_NAME, 'listBoard')
        print("Number of matches: ", len(matchList))

        for match in matchList:
            eventID = match.get_attribute('eventid')
            marketID = match.get_attribute('marketid')
            print("Event ID: ", eventID)
            print("Market ID: ", marketID)
            print("--------------------------")

# Close the WebDriver
driver.quit()

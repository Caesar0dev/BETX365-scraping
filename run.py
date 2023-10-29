from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from undetected_chromedriver import Chrome, ChromeOptions
import time
# import mysql.connector

# mydb = mysql.connector.connect(
#   host = "localhost",
#   user = "root",
#   password = "",
#   database = "scrap"
# )
 
# mycursor = mydb.cursor()


options = ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
options.add_argument('--headless')
options.add_argument('--disable-gpu')

driver = Chrome(options=options, executable_path=ChromeDriverManager().install())
driver.maximize_window()

driver.get("https://www.pinksale.finance/launchpad/0x148c295B7EE3A854d0dCD37dD10B7994c920f55B?chain=ETH")
time.sleep(5)

Project_Name = driver.find_element(By.XPATH, '//*[@id="root"]/section/section/main/div[2]/div[1]/div[1]/div[1]/div/article/div[2]/div[1]/div[1]/div/h1').text
print(">>>>>1>>>>>", Project_Name)

Presale_Address = driver.find_element(By.XPATH, '//*[@id="root"]/section/section/main/div[2]/div[1]/div[1]/div[1]/div/div[1]/table/tbody/tr[2]/td[2]/a/span').text
print(">>>>>2>>>>>", Presale_Address)

Token_Symbol = driver.find_element(By.XPATH, '//*[@id="root"]/section/section/main/div[2]/div[1]/div[1]/div[1]/div/div[1]/table/tbody/tr[4]/td[2]').text
print(">>>>>3>>>>>", Token_Symbol)

Token_Address = driver.find_element(By.XPATH, '//*[@id="root"]/section/section/main/div[2]/div[1]/div[1]/div[1]/div/div[1]/table/tbody/tr[6]/td[2]/a/span').text
print(">>>>>4>>>>>", Token_Address)

Presale_Rate = driver.find_element(By.XPATH, '//*[@id="root"]/section/section/main/div[2]/div[1]/div[1]/div[1]/div/div[1]/table/tbody/tr[9]/td[2]').text
print(">>>>>5>>>>>", Presale_Rate)

# mycursor = mydb.cursor()

## mycursor.execute("CREATE TABLE IF NOT EXISTS data3(my_name VARCHAR(200), pass_word VARCHAR(20))")

# val = (Project_Name, Presale_Address , Token_Symbol,Token_Address , Presale_Rate)
# sql = "INSERT INTO data3(name, presale_address, token_symbol, token_address, presale_rate) VALUES (%s,%s,%s,%s, %s)"
# mycursor.execute(sql, val)
# print("successfully!")
# mydb.commit()

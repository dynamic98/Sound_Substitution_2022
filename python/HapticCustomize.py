from sys import platform
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import webbrowser
import time
import os


def VirtualBrowser(UserName, FileName):
    if platform == 'win32':
        print("Haptic Customization is operated")

        ID = 'dynamic98@gist.ac.kr'
        PW = 'niphid-zufFep-5tychi'

        InputIDXpath = '//*[@id="root"]/div/div/div[2]/div/div[3]/div/input'
        InputPWXpath = '//*[@id="root"]/div/div/div[2]/div/div[6]/div/input'
        LogInXpath = '//*[@id="root"]/div/div/div[2]/div/div[8]/button'
        StudioXpath = '//*[@id="root"]/div/div/div/div[2]/div/div/div/div[1]'
        EditXpath = '//*[@id="root"]/div/div[1]/div/div[2]/div/div[2]/div[1]/span'
        DeleteXpath = '//*[@id="root"]/div/div/div[1]/div[2]/div/div[6]/div/label'
        ImportXpath = '//*[@id="root"]/div/div/div[1]/div[2]/div/div[1]/div/label/input'

        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument('headless')
        driver = webdriver.Chrome(os.path.join(os.getcwd(), 'python', 'chromedriver.exe'), options=options)
        URL = 'https://login.bhaptics.com/login'
        driver.implicitly_wait(3)
        driver.get(url=URL)
        driver.find_element(by=By.XPATH, value=InputIDXpath).send_keys(ID)
        driver.find_element(by=By.XPATH, value=InputPWXpath).send_keys(PW)
        driver.find_element(by=By.XPATH, value=LogInXpath).click()
        time.sleep(4)
        # wait = WebDriverWait(driver, 3)
        # wait.until(EC.element_to_be_clickable(driver.find_element(by=By.XPATH, value=StudioXpath)))
        driver.find_element(by=By.XPATH, value=StudioXpath).click()
        driver.find_element(by=By.XPATH, value=EditXpath).click()
        # print(EC.element_to_be_clickable(driver.find_element(by=By.XPATH, value=DeleteXpath)))
        # driver.find_element(by=By.XPATH, value=DeleteXpath).click()
        # driver.find_element(by=By.XPATH, value=ImportXpath).send_keys(r"C:\Users\sci2019\HearingImpaired\vibviz\Sound_Substitution_2022\static\user\{0}\{1}.bhc".format(UserName, FileName))
        driver.find_element(by=By.XPATH, value=ImportXpath).send_keys(os.path.join(os.getcwd(),"static/user/{0}/{1}.bhc".format(UserName, FileName)))
        driver.quit()
    else:
        print("well, you can't change your Haptic Customization. You are not a Windows user")




# if platform == 'win32':
#     VirtualBrowser(platform)
#     print("Haptic Customization is operated")
# else:
#     print("well, you can't change your Haptic Customization. You are not a Windows user")


if __name__=="__main__":
    print("Haptic Customization Code is Activated")

    if platform == 'win32':
        a = time.time()
        VirtualBrowser(platform)
        print("Haptic Customization is operated")
        print(time.time() - a)
    else:
        print("well, you can't change your Haptic Customization. You are not a Windows user")
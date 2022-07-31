from sys import platform
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import webbrowser
import time
import os

class VirtualBrowser:
    def __init__(self):
        if platform == 'win32':
            ID = 'dynamic98@gist.ac.kr'
            PW = 'niphid-zufFep-5tychi'

            InputIDXpath = '//*[@id="root"]/div/div/div[2]/div/div[3]/div/input'
            InputPWXpath = '//*[@id="root"]/div/div/div[2]/div/div[6]/div/input'
            LogInXpath = '//*[@id="root"]/div/div/div[2]/div/div[8]/button'
            StudioXpath = '//*[@id="root"]/div/div/div/div[2]/div/div/div/div[1]'
            EditXpath = '//*[@id="root"]/div/div[1]/div/div[2]/div/div[2]/div[1]/span'
          
            self.options = webdriver.ChromeOptions()
            self.options.add_experimental_option("excludeSwitches", ["enable-logging"])
            # self.options.add_argument('headless')
            self.driver = webdriver.Chrome(os.path.join(os.getcwd(), 'python', 'chromedriver.exe'), options=self.options)
            print('this should not be open twice')
            URL = 'https://login.bhaptics.com/login'
            self.driver.implicitly_wait(3)
            self.driver.get(url=URL)
            self.driver.find_element(by=By.XPATH, value=InputIDXpath).send_keys(ID)
            self.driver.find_element(by=By.XPATH, value=InputPWXpath).send_keys(PW)
            self.driver.find_element(by=By.XPATH, value=LogInXpath).click()
            time.sleep(4)
            self.driver.find_element(by=By.XPATH, value=StudioXpath).click()
            self.driver.find_element(by=By.XPATH, value=EditXpath).click()
        else:
            print("well, I think you are not a Windows user")

    def SendHapticCustom(self, UserName, FileName):
        DeleteXpath = '//*[@id="root"]/div/div/div[1]/div[2]/div/div[6]/div'
        ImportXpath = '//*[@id="root"]/div/div/div[1]/div[2]/div/div[1]/div/label/input'
        if EC.element_to_be_clickable((By.XPATH, DeleteXpath)):
            self.driver.find_element(by=By.XPATH, value=DeleteXpath).click()
        self.driver.find_element(by=By.XPATH, value=ImportXpath).send_keys(os.path.join(os.getcwd(),"static/user/{0}/{1}.bhc".format(UserName, FileName)))
    def QuitBrowser(self):
        self.driver.quit()


if __name__=="__main__":
    print("Haptic Customization Code is Activated")

    if platform == 'win32':
        a = time.time()
        VirtualBrowser(platform)
        print("Haptic Customization is operated")
        print(time.time() - a)
    else:
        print("well, you can't change your Haptic Customization. You are not a Windows user")
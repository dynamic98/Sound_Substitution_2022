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
            self.UserName = 'default_user'

            self.InputIDXpath = '//*[@id="root"]/div/div/div[2]/div/div[3]/div/input'
            self.InputPWXpath = '//*[@id="root"]/div/div/div[2]/div/div[6]/div/input'
            self.LogInXpath = '//*[@id="root"]/div/div/div[2]/div/div[8]/button'
            self.StudioXpath = '//*[@id="root"]/div/div/div/div[2]/div/div/div/div[1]'
            self.EditXpath = '//*[@id="root"]/div/div[1]/div/div[2]/div/div[2]/div[1]/span'
            self.DeleteXpath = '//*[@id="root"]/div/div/div[1]/div[2]/div/div[6]/div/label'
            self.ImportXpath = '//*[@id="root"]/div/div/div[1]/div[2]/div/div[1]/div/label/input'
            self.ApplyXpath = '/html/body/div/div/div/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div/div/div[4]'
            # self.ApplyXpath = '//*[@id="root"]/div/div/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div/div/div[4]/span'
            self.PlayXpath = '//*[@id="root"]/div/div/div[2]/div[2]/div[1]/div[2]/div[1]/div[4]/div/div/button'
            self.PlayStateXpath = '//*[@id="root"]/div/div/div[2]/div[2]/div[1]/div[2]/div[1]/div[4]/span'

            self.options = webdriver.ChromeOptions()
            self.options.add_experimental_option("excludeSwitches", ["enable-logging"])
            # self.options.add_argument('headless')
            self.driver = webdriver.Chrome(os.path.join(os.getcwd(), 'python', 'chromedriver.exe'), options=self.options)
            print('this should not be open twice')
            URL = 'https://login.bhaptics.com/login'
            self.driver.implicitly_wait(3)
            self.driver.get(url=URL)
            self.driver.find_element(by=By.XPATH, value=self.InputIDXpath).send_keys(ID)
            self.driver.find_element(by=By.XPATH, value=self.InputPWXpath).send_keys(PW)
            self.driver.find_element(by=By.XPATH, value=self.LogInXpath).click()
            time.sleep(4)
            self.driver.find_element(by=By.XPATH, value=self.StudioXpath).click()
            self.driver.find_element(by=By.XPATH, value=self.EditXpath).click()

            self.driver.find_element(by=By.XPATH, value=self.DeleteXpath).click()
            time.sleep(0.5)
            self.driver.find_element(by=By.XPATH, value=self.ImportXpath).send_keys(os.path.join(os.getcwd(),"static/user/default_user/default_haptic.bhc"))
            self.driver.find_element(by=By.XPATH, value=self.ApplyXpath).click()

            if self.driver.find_element(by=By.XPATH, value=self.PlayStateXpath).get_attribute("innerText")=='Paused':
                self.driver.find_element(by=By.XPATH, value=self.PlayXpath).click()


        else:
            print("well, I think you are not a Windows user")

    def SendHapticCustom(self, UserName, FileName):
        # if EC.element_to_be_clickable((By.XPATH, DeleteXpath)):
        if platform == 'win32':
            self.driver.find_element(by=By.XPATH, value=self.DeleteXpath).click()
            time.sleep(0.5)
            self.driver.find_element(by=By.XPATH, value=self.ImportXpath).send_keys(os.path.join(os.getcwd(),"static/user/{0}/{1}.bhc".format(UserName, FileName)))
            self.driver.find_element(by=By.XPATH, value=self.ApplyXpath).click()

            if self.driver.find_element(by=By.XPATH, value=self.PlayStateXpath).get_attribute("innerText")=='Paused':
                self.driver.find_element(by=By.XPATH, value=self.PlayXpath).click()

    def SetUserName(self, UserName):
        if platform == 'win32':
            self.UserName = UserName
            UserPath = os.path.join(os.getcwd(), 'static', 'user', self.UserName)
            filelist = os.listdir(os.path.join(UserPath))
            customlist = []
            for i in filelist:
                if i.endswith('.bhc'):
                    customlist.append(i)
            if len(customlist) != 0:
                customlist.sort(key=lambda x: os.path.getmtime(os.path.join(UserPath, x)), reverse=True)
                RecentUserHaptic = customlist[0]
                self.driver.find_element(by=By.XPATH, value=self.DeleteXpath).click()
                time.sleep(0.5)
                self.driver.find_element(by=By.XPATH, value=self.ImportXpath).send_keys(os.path.join(UserPath, RecentUserHaptic))
                self.driver.find_element(by=By.XPATH, value=self.ApplyXpath).click()

                if self.driver.find_element(by=By.XPATH, value=self.PlayStateXpath).get_attribute("innerText")=='Paused':
                    self.driver.find_element(by=By.XPATH, value=self.PlayXpath).click()

            else:
                self.driver.find_element(by=By.XPATH, value=self.DeleteXpath).click()
                time.sleep(0.5)
                self.driver.find_element(by=By.XPATH, value=self.ImportXpath).send_keys(os.path.join(os.getcwd(),"static/user/default_user/default_haptic.bhc"))
                self.driver.find_element(by=By.XPATH, value=self.ApplyXpath).click()

                if self.driver.find_element(by=By.XPATH, value=self.PlayStateXpath).get_attribute("innerText")=='Paused':
                    self.driver.find_element(by=By.XPATH, value=self.PlayXpath).click()


    
    def ToggleHaptic(self, ObjectState):
        NowState = self.driver.find_element(by=By.XPATH, value=self.PlayStateXpath).get_attribute("innerText")
        if ObjectState!=NowState:
            self.driver.find_element(by=By.XPATH, value=self.PlayXpath).click()
        else:
            pass
        NowState = self.driver.find_element(by=By.XPATH, value=self.PlayStateXpath).get_attribute("innerText")
        print(NowState)

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
from selenium import webdriver
import unittest

class LoginPageTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()  # veya başka bir tarayıcı
        self.driver.get("http://localhost:3000/login")  # test edilen sayfa

    def test_successful_login(self):
        username_input = self.driver.find_element("name", "username")
        password_input = self.driver.find_element("name", "password")
        login_button = self.driver.find_element("tag name", "button")

        username_input.send_keys("zaza12")
        password_input.send_keys("")
        login_button.click()
        
        self.assertIn("login", self.driver.current_url)

    def test_failed_login(self):
        username_input = self.driver.find_element("name", "username")
        password_input = self.driver.find_element("name", "password")
        login_button = self.driver.find_element("tag name", "button")

        username_input.send_keys("invaliduser")
        password_input.send_keys("invalidpassword")
        login_button.click()

        self.assertIn("login", self.driver.current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
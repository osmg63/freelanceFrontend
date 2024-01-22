from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

class RegistrationPageTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/register")  # Formun bulunduğu URL'yi buraya ekleyin

    def test_registration(self):
        # Formdaki elemanları belirle
        first_name_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.NAME, "firstName"))
        )
        last_name_input = self.driver.find_element("name", "lastName")
        identity_number_input = self.driver.find_element("name", "identityNumber")
        username_input = self.driver.find_element("name", "username")
        password_input = self.driver.find_element("name", "password")
        email_input = self.driver.find_element("name", "email")
        age_input = self.driver.find_element("name", "age")
        submit_button = self.driver.find_element("tag name", "button")

        # Formu doldur
        first_name_input.send_keys("John")
        last_name_input.send_keys("Doe")
        identity_number_input.send_keys("12345678901")
        username_input.send_keys("johndoe")
        password_input.send_keys("password123")
        email_input.send_keys("john.doe@example.com")
        age_input.send_keys("1990")

        # Burada test işlemlerini ekleyebilirsiniz
        # (Örneğin, bir sonraki sayfanın URL'sini kontrol etmek)

        # Örneğin:
        self.assertIn("register", self.driver.current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()

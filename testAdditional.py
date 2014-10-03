"""
Each file that starts with test... in this directory is scanned for subclasses of unittest.TestCase or testLib.RestTestCase
"""

import unittest
import os
import testLib

class TestAddUser(testLib.RestTestCase):
    """Test adding users"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAddSameUserTwice(self):
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData)
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, None, errCode = testLib.RestTestCase.ERR_USER_EXISTS)

    def testAddMultipleUsers(self):
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user2', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user3', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)
        
class TestLogin(testLib.RestTestCase):
    """Tests user login"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testUserDoesNotExist(self):
        respData = self.makeRequest("/users/login", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, None, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS)

    def testLoginCount(self):
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData)
        respData = self.makeRequest("/users/login", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 2, errCode = testLib.RestTestCase.SUCCESS)
        respData = self.makeRequest("/users/login", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 3, errCode = testLib.RestTestCase.SUCCESS)

    def testIncorrectPassword(self):
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData)
        respData = self.makeRequest("/users/login", method = "POST", data = { 'user' : 'user1', 'password' : 'passw0rd'} )
        self.assertResponse(respData, None, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS)

class TestReset(testLib.RestTestCase):
    """Tests fixture reset"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testReset(self):
        respData = self.makeRequest("/users/add", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData)
        respData = self.makeRequest("/TESTAPI/resetFixture", method = "POST", data = {} )
        self.assertResponse(respData, None, errCode = testLib.RestTestCase.SUCCESS)
        respData = self.makeRequest("/users/login", method = "POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, None, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS)
    

'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('./user.model');
var assert = require('assert');

  describe('User Model', function () {

    describe('.isValidUserName', function () {
      it('should return false for an empty string', function (done) {
        assert.equal(User.isValidUserName(''), false);
        done();
      });
    });

    describe('.isValidUserName', function () {
      it('should return false for a 129-byte string', function (done) {
        assert.equal(User.isValidUserName('12345678901234567890123456789012' + 
                                          '12345678901234567890123456789012' +
                                          '12345678901234567890123456789012' +
                                          '123456789012345678901234567890123'), false);
        done();
      });
    });

    describe('.isValidUserName', function () {
      it('should return true for some falsy-looking string arguments', function (done) {
        assert.equal(User.isValidUserName('0'), true);
        assert.equal(User.isValidUserName(' '), true);
        assert.equal(User.isValidUserName('false'), true);
        assert.equal(User.isValidUserName('{}'), true);
        assert.equal(User.isValidUserName('[]'), true);
        done();
      });
    });

    describe('.isValidUserName', function () {
      it('should return true for a 128-byte string', function (done) {
        assert.equal(User.isValidUserName('12345678901234567890123456789012' + 
                                          '12345678901234567890123456789012' +
                                          '12345678901234567890123456789012' +
                                          '12345678901234567890123456789012'), true);
        done();
      });
    });

    describe('.isValidUserName', function () {
      it('miscellaneous tests for valid passwords', function (done) {
        assert.equal(User.isValidUserName('DAOIZ_(XUHJKN@EPOI(UH))'), true);
        assert.equal(User.isValidUserName('00000'), true);
        assert.equal(User.isValidUserName('\'\\\"'), true);
        done();
      });
    });

    describe('.isValidPassword', function () {
      it('should return true for an empty string', function (done) {
        assert.equal(User.isValidPassword(''), true);
        done();
      });
    });

    describe('.isValidPassword', function () {
      it('should return false for a 129-byte string', function (done) {
        assert.equal(User.isValidPassword('12345678901234567890123456789012' + 
                                          '12345678901234567890123456789012' +
                                          '12345678901234567890123456789012' +
                                          '123456789012345678901234567890123'), false);
        done();
      });
    });

    describe('.isValidPassword', function () {
      it('should return true for some falsy-looking string arguments', function (done) {
        assert.equal(User.isValidPassword('0'), true);
        assert.equal(User.isValidPassword(' '), true);
        assert.equal(User.isValidPassword('false'), true);
        assert.equal(User.isValidPassword('{}'), true);
        assert.equal(User.isValidPassword('[]'), true);
        done();
      });
    });

    describe('.isValidPassword', function () {
      it('should return true for a 128-byte string', function (done) {
        assert.equal(User.isValidPassword('12345678901234567890123456789012' + 
                                          '12345678901234567890123456789012' +
                                          '12345678901234567890123456789012' +
                                          '12345678901234567890123456789012'), true);
        done();
      });
    });  

    describe('.isValidPassword', function () {
      it('miscellaneous tests for valid passwords', function (done) {
        assert.equal(User.isValidPassword('DAOIZ_(XUHJKN@EPOI(UH))'), true);
        assert.equal(User.isValidPassword('00000'), true);
        assert.equal(User.isValidPassword('\'\\\"'), true);
        done();
      });
    });


  });

/*
describe('POST /users/add', function () {
  it('should return a JSON object', function (done) {
    request(app)
      .post('/api/pokemons')
      .type('json')
      .send({ name: 'Pikachu',
              picture: 'http://awesomeSite.com/pika.png',
              description: 'This pokemon is yellow' })
      .expect(200)
      .end(function (err, res) {
        res.body.should.be.instanceOf(Object);
        done();
      });
  });
});*/
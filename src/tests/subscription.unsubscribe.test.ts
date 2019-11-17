import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

const expect = chai.expect

chai.use(chaiHttp)

describe('Subscription Unsubscribe Test', function() {
  const tags = ['dana', 'food']

  it('success unsubscribe', function(done) {
    chai
      .request(app)
      .put('/subscription/unsubscribe')
      .send({ tags })
      .set({ device_token: '98765' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('subscription')
        const { subscription } = body
        expect(subscription).to.be.an('array')
        tags.forEach((el) => {
          expect(subscription).to.not.contain(el)
        })
        done()
      })
  })
  it('success unsubscribe even when among tags sent is not available in user subscription', function(done) {
    chai
      .request(app)
      .put('/subscription/unsubscribe')
      .send(['dana', 'asdkjfalksdjf'])
      .set({ device_token: '98765' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('subscription')
        const { subscription } = body
        expect(subscription).to.be.an('array')
        tags.forEach((el) => {
          expect(subscription).to.not.contain(el)
        })
        done()
      })
  })
  it('Fails unsubscribe - Token not set', function(done) {
    chai
      .request(app)
      .put('/subscription/unsubscribe')
      .send(['dana', 'asdkjfalksdjf'])
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.include('token')
        done()
      })
  })
  it('Fails unsubscribe - Wrong token', function(done) {
    chai
      .request(app)
      .put('/subscription/unsubscribe')
      .send(['dana', 'asdkjfalksdjf'])
      .set({ device_token: '98765' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.match(/device/i)
        done()
      })
  })
})

const express = require('express')
const app = express()
const axios = require('axios')

const api = 'https://ecfme.famiport.com.tw/FMEDCFPwebV2/Inquiry.aspx/GetOrderDetail'
const getOrderDetail = (orderId, cb) => {
    const data = {
        EC_ORDER_NO: orderId,
        ORDER_NO: orderId,
        RCV_USER_NAME: null,
    }
    axios.post(api, data)
        .then(function (response) {
            const data = JSON.parse(response.data.d)
            // data.ErrorCode
            // data.ErrorMessage
            // data.List
            cb(data.List[0])
        })
        .catch(function (error) {
            console.log(error);
        });
}

app.get('/', (req, res) => {
    res.send('用 /:orderId 查詢全家店到店物流進度')
})

app.get('/:orderId', (req, res) => {
    getOrderDetail(req.params.orderId, (data) => {
        res.send(`${data.ORDERMESSAGE}`)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
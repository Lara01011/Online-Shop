const uuid = require("uuid");
const path = require("path");
const {BasketDevice, Device} = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController{
    async create(req, res, next) {
        try {
            let {userId,deviceId} = req.body
            const device = await BasketDevice.create({basketId:userId,deviceId})
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

        let {Id} = req.query

        let devices;

        devices = await BasketDevice.findAndCountAll({basketId:Id})
        await Device.findByPk(53)
        devices.rows.map(async (item) => {
            basketDevice.push()
        })


        return res.json(basketDevice)

    }
}

module.exports = new BasketController()
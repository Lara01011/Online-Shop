const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name,price,brendId,typeId,info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name,price,typeId,brendId,img:fileName})

            if (info){
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })

                )
            }



            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))

        }
    }

        async getAll(req, res) {

            let {brendId, typeId, limit, page} = req.query
            page = page || 1
            limit = limit || 12

            let offset = page * limit - limit
            let devices;

            if (!brendId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})

            }
            if (brendId && !typeId) {
                devices = await Device.findAndCountAll({where: {brendId}, limit, offset})

            }

            if (!brendId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})

            }
            if (brendId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId, brendId}, limit, offset})
            }

            return res.json(devices)

        }


    async getOne(req, res) {

        const {id} = req.params
        const device = await Device.findOne(
            {
                where:{id},
                include:[{model: DeviceInfo, as: 'info'}]
            },
        )
       return res.json(device)

    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            // Find the device by ID
            const device = await Device.findOne({ where: { id } });
            
            // Check if the device exists
            if (!device) {
                throw new ApiError('Device not found', 404);
            }
            
            // Delete the device
            await device.destroy();
            
            // Return a success message
            return res.json({ message: 'Device deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    }


module.exports = new DeviceController()
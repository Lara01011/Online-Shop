const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {

    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true,},
    password:{type: DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {

    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    
})

const BasketDevice = sequelize.define('basket_device', {

    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    basketId:{type:DataTypes.INTEGER},
    deviceId:{type:DataTypes.INTEGER},
})

const Device = sequelize.define('device', {

    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true,allowNull: false},
    price:{type: DataTypes.INTEGER, unique:true,allowNull: false},
    rating:{type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
} )

const Brend = sequelize.define('brend', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
} )

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull:false},
} )

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false},
} )

const TypeBrend = sequelize.define('type_brend',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},

})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brend.hasMany(Device)
Device.belongsTo(Brend)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)


Type.belongsToMany(Brend, {through: TypeBrend })
Brend.belongsToMany(Type, {through: TypeBrend })

module.exports = {
     User,
     Basket,
     BasketDevice,
     Device,
     Type,
     Brend,
     Rating,
     TypeBrend,
     DeviceInfo,
}
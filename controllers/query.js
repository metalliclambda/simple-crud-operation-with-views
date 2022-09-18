const City = require('../models/city');
const Country = require('../models/country');
const Region = require('../models/region');

module.exports.postQuery = async (req,res,next) => {
    let {queryOption , name , sortOption} = req.body;
    sortOption = sortOption === "popularity" ? `-${sortOption}` : `${sortOption}`;

    if(queryOption === "country") {
        let countryId = await Country.findOne({name}).distinct('_id').exec();
        let regionIds = await Region.find({countryId : countryId } ).distinct('_id').exec();
        let cities = await City.find({regionId : regionIds} , 'name popularity -_id').sort(sortOption).exec();
        
        res.json(cities)
    } else if(queryOption === "region"){
        let regionId = await Region.findOne({name } ).distinct('_id').exec();
        let cities = await City.find({regionId} , 'name popularity -_id').sort(sortOption).exec();

        res.json(cities)
    } else {
        res.json({message : "Not correct input"})
    }
    
}

module.exports.postCity = async (req,res,next)=>{

    try {
        let {name , regionId , popularity} = req.body;
        popularity = Number.parseInt(popularity);
        const newCity = new City({
            name,
            regionId,
            popularity
        });
        await newCity.save();
        res.json(newCity);
        
    } catch (error) {
        res.json(error)
    }
     
}

module.exports.postRegion = async (req,res,next)=>{
    try {
        const {name , country_id} = req.body;
        const newRegion = new Region({
            name , 
            countryId : country_id
        });
        await newRegion.save();
        res.json(newRegion)
        
    } catch (error) {
        res.json(error)
    }
}

module.exports.postCountry = async (req,res,next)=>{

    try {
        const {name} = req.body;
        const newCountry = new Country({
            name
        });
        await newCountry.save();
        res.json(newCountry);
        
    } catch (error) {
        res.json(error)
    }


}
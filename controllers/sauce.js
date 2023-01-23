const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getSauce = (request, response, next) => {
    Sauce.find()
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error }))
};

exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error }))
};

exports.updateSauce = (request, response, next) => {
    if (request.file) {
        Sauce.findOne({ _id: request.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = {
                        ...JSON.parse(request.body.sauce),
                        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
                    }
                    Sauce.updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
                        .then(() => response.status(200).json({ message: 'Sauce modifiée' }))
                        .catch(error => response.status(400).json({ error }))
                })
            })
            .catch(error => res.status(500).json({ error }));
    }
    else {
        const sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deleteSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: request.params.id })
                    .then(() => response.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => response.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.postSauce = (request, response, next) => {
    const sauceObject = JSON.parse(request.body.sauce);
    delete request.body._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
        likes: 0,
        disliked: 0, 
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => response.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => response.status(400).json({ error }));
};

exports.likeSauce = (request, response, next) => {

};
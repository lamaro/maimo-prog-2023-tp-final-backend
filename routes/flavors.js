import express from "express";
import Flavor from "../models/flavors.js";

const router = express.Router();

const findAllFlavors = async (req, res) => {
    try {
        const flavors = await Flavor.find().select("_id name image description apto");
        return res.status(200).send({ message: "All flavors", flavors });
    } catch (error) {
        return res.status(501).send({ message: "Error", error });
    }
};
const findOneFlavor = async (req, res) => {
    const { id } = req.params;
    try {
        const flavor = await Flavor.findOne({ _id: id }).select("_id name image description apto");
        res.status(200).send({ message: "Flavor info", flavor });
    } catch (error) {
        return res.status(501).send({ message: "Error", error });
    }
};
const addFlavor = async (req, res) => {
    try {
        const { name, image, description, apto } = req.body;
        const flavor = new Flavor({ name, image, description, apto });
        await flavor.save();
        return res
            .status(200)
            .send({ message: `Flavor Created ${name}`, flavor });
    } catch (error) {
        return res.status(501).send({ message: "Error", error });
    }
    //Agregar magia para crear el producto en la base de datos!!
};
const updateFlavor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, description, apto } = req.body;

        const flavorToUpdate = await Flavor.findOne({ _id: id })

        if (!flavorToUpdate) {
            return res.status(501).send({ message: "Error Flavor Not Found", error });
        }

        flavorToUpdate.name = name;
        flavorToUpdate.image = image;
        flavorToUpdate.description = description;
        flavorToUpdate.apto = apto;
        await flavorToUpdate.save();

        res.status(200).send({ message: "Flavor Updated", flavor: flavorToUpdate });
    } catch (error) {
        return res.status(501).send({ message: "Error", error });
    }
};

const deleteFlavor = async (req, res) => {
    try {
        const { id } = req.params;
        const flavorToDelete = await Flavor.findOne({ _id: id });
        if (!flavorToDelete) {
            res.status(501).send({ message: "Error Flavor Not Found" });
        }
        await Flavor.deleteOne({ _id: id });
        return res.status(200).send({ message: "Flavor deleted", flavor: flavorToDelete });
    } catch (error) {
        return res.status(501).send({ message: "Error", error });
    }
};

//CRUD (Create, Read, Update, Delete)
router.get("/", findAllFlavors);
router.get("/:id", findOneFlavor);
router.post("/", addFlavor);
router.put("/:id", updateFlavor);
router.delete("/:id", deleteFlavor);

export default router;

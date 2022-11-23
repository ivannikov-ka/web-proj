const clothesServices = require('../services/clothes.service');

class ClothesController {
  async createClothes(req, res) {
    try {
      const { name, isMale, cost, colorId, sizes, categoryId, images } =
        req.body;
      const newClothes = await clothesServices.createClothes(
        name,
        isMale,
        cost,
        colorId,
        sizes,
        categoryId,
        images,
      );
      res.json(newClothes, 201);
    } catch (error) {
      console.log(error);
      res.status(422).json('Validation Error!');
    }
  }
  async getlAllClothes(req, res) {
    try {
      const allclothes = await clothesServices.getAllClothes();
      res.json(allclothes);
    } catch (error) {
      console.log(error);
    }
  }
  async getClothes(req, res) {
    try {
      const { id } = req.params;
      const clothes = await clothesServices.getClothes(id);
      res.json(clothes);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteClothes(req, res) {
    console.log(req.body);

    try {
      const { id } = req.params;
      const response = await clothesServices.deleteClothes(id);
      console.log(response);
      res.json(response, 200);
    } catch (error) {
      console.log(error);
    }
  }
  async editСlothes(req, res) {
    try {
      const { id } = req.params;
      const { clothes } = req.body;
      const updatedСlothes = await clothesServices.editСlothes(id, req.body);
      res.json(updatedСlothes, 200);
    } catch (error) {
      console.log(error);
      res.status(422).json('Validation Error!');
    }
  }
}

module.exports = new ClothesController();

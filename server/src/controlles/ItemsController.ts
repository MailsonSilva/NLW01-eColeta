import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex("items").select("*");

    const serialized = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.100.6:3333/uploads/${item.image}`,
      };
    });
    return response.json(serialized);
  }
}

export default ItemsController;

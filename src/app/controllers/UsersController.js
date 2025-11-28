import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import User from "../models/User.js";
class UsersController {
  async index(req, res) {
    const {
      name,
      email,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }
    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }
    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdBefore),
        },
      };
    }
    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdAfter),
        },
      };
    }
    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedBefore),
        },
      };
    }
    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedAfter),
        },
      };
    }

    console.log(where);

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await User.findAll({
      attributes: { exclude: ["password", "password_hash"] },
      where,
      order,
      limit,
      offset: limit * page - limit,
    });
    return res.status(200).json(data);
  }
  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { id, name, email, createdAt, updatedAt } = user;

    return res.status(200).json({ id, name, email, createdAt, updatedAt });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      passwordConfirmation: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      console.log(err.errors);
      return res.status(400).json({ error: err.errors });
    }

    const { id, name, email, updatedAt, createdAt } = await User.create(
      req.body
    );
    return res.status(201).json({ id, name, email, updatedAt, createdAt });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8).notRequired(),

      password: Yup.string()
        .min(8)
        .notRequired()
        .when("oldPassword", {
          is: (value) => !!value, // só exige se oldPassword tiver valor
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.notRequired(),
        }),

      passwordConfirmation: Yup.string()
        .notRequired()
        .when("password", {
          is: (value) => !!value,
          then: (schema) => schema.required().oneOf([Yup.ref("password")]),
          otherwise: (schema) => schema.notRequired(),
        }),
    });

    console.log(req.body);
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      console.log(err.errors);
      return res.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "User password not match." });
    }

    const { id, name, email, updatedAt, createdAt } = await user.update(
      req.body
    );

    return res.status(200).json({ id, name, email, updatedAt, createdAt });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    await user.destroy();

    return res.status(200).json({ status: "User destroyed" });
  }
}

export default new UsersController();
